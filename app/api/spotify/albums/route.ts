import { NextRequest, NextResponse } from "next/server";

type SpotifyAlbum = {
  id: string;
  name: string;
  artists: { name: string }[];
  release_date: string;
  total_tracks: number;
  images: { url: string; width: number | null; height: number | null }[];
  external_urls?: { spotify?: string };
};

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_ALBUMS_URL = "https://api.spotify.com/v1/albums";

let cachedToken: { value: string; expiresAt: number } | null = null;

function isLikelySpotifyAlbumId(value: string) {
  return /^[A-Za-z0-9]{22}$/.test(value);
}

async function getSpotifyAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Spotify credentials are not configured.");
  }

  if (cachedToken && cachedToken.expiresAt > Date.now() + 10_000) {
    return cachedToken.value;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Spotify token request failed with ${response.status}.`);
  }

  const data = (await response.json()) as {
    access_token: string;
    expires_in: number;
  };

  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return data.access_token;
}

export async function GET(request: NextRequest) {
  const idsParam = request.nextUrl.searchParams.get("ids") ?? "";
  const ids = [...new Set(idsParam.split(",").map((id) => id.trim()).filter(Boolean))];
  const validIds = ids.filter(isLikelySpotifyAlbumId);

  if (validIds.length === 0) {
    return NextResponse.json({ albums: {} });
  }

  try {
    const token = await getSpotifyAccessToken();
    const response = await fetch(
      `${SPOTIFY_ALBUMS_URL}?ids=${encodeURIComponent(validIds.join(","))}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      throw new Error(`Spotify albums request failed with ${response.status}.`);
    }

    const data = (await response.json()) as { albums: (SpotifyAlbum | null)[] };
    const albums = Object.fromEntries(
      data.albums
        .filter((album): album is SpotifyAlbum => Boolean(album))
        .map((album) => [
          album.id,
          {
            id: album.id,
            name: album.name,
            artists: album.artists.map((artist) => artist.name),
            releaseDate: album.release_date,
            totalTracks: album.total_tracks,
            imageUrl: album.images[0]?.url ?? null,
            spotifyUrl: album.external_urls?.spotify ?? null,
          },
        ]),
    );

    return NextResponse.json({ albums }, { headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" } });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown Spotify integration error.";

    return NextResponse.json(
      { error: message, albums: {} },
      { status: 500 },
    );
  }
}
