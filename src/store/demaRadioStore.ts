import { create } from "zustand";

export type DemaTrack = {
  id: string;
  title: string;
  artist: string;
  src: string;
};

const localSignal =
  "data:audio/wav;base64,UklGRuQDAABXQVZFZm10IBAAAAABAAEAoA8AAEAfAAACABAAZGF0YcADAAAAANcKZhSLG28fmx8KHCkVyAsBAR32Y+z75MbgQeB94xjqS/P+/e0IzxJ3Gv4e2x/0HKAWoA0DAwv4BO4d5kbhEOCi4qzoefH9+/sGJRFJGW8e/B/AHQEYag8BBQH6tu9Y5+XhAODl4Vjntu8B+gEFag8BGMAd/B9vHkkZJRH7Bv37efGs6KLiEOBG4R3mBO4L+AMDoA2gFvQc2x/+HncazxLtCP79S/MY6n3jQeDG4PvkY+wd9gEByAspFQocmx9vH4sbZhTXCgAAKfWa63XkkeBl4Pbj1+o49P/+4wmdEwUbOh+/H4Mc6BW1DAICE/cx7YnlAuEl4AzjYOlg8v389Qf8EeMZuh7wH14dVBeHDgMEBfnb7rfmkeEE4EDi/+eW8P/6/wVKEKgYGx4AIBseqBhKEP8F//qW8P/nQOIE4JHht+bb7gX5AwSHDlQXXh3wH7oe4xn8EfUH/fxg8mDpDOMl4ALhieUx7RP3AgK1DOgVgxy/HzofBRudE+MJ//449Nfq9uNl4JHgdeSa6yn1AADXCmYUixtvH5sfChwpFcgLAQEd9mPs++TG4EHgfeMY6kvz/v3tCM8Sdxr+Htsf9BygFqANAwML+ATuHeZG4RDgouKs6Hnx/fv7BiURSRlvHvwfwB0BGGoPAQUB+rbvWOfl4QDg5eFY57bvAfoBBWoPARjAHfwfbx5JGSUR+wb9+3nxrOii4hDgRuEd5gTuC/gDA6ANoBb0HNsf/h53Gs8S7Qj+/UvzGOp940HgxuD75GPsHfYBAcgLKRUKHJsfbx+LG2YU1woAACn1mut15JHgZeD249fqOPT//uMJnRMFGzofvx+DHOgVtQwCAhP3Me2J5QLhJeAM42DpYPL9/PUH/BHjGboe8B9eHVQXhw4DBAX52+635pHhBOBA4v/nlvD/+v8FShCoGBseACAbHqgYShD/Bf/6lvD/50DiBOCR4bfm2+4F+QMEhw5UF14d8B+6HuMZ/BH1B/38YPJg6QzjJeAC4YnlMe0T9wICtQzoFYMcvx86HwUbnRPjCf/+OPTX6vbjZeCR4HXkmusp9QAA1wpmFIsbbx+bHwocKRXICwEBHfZj7PvkxuBB4H3jGOpL8/797QjPEnca/h7bH/QcoBagDQMDC/gE7h3mRuEQ4KLirOh58f37+wYlEUkZbx78H8AdARhqDwEFAfq271jn5eEA4OXhWOe27wH6AQVqDwEYwB38H28eSRklEfsG/ft58azoouIQ4EbhHeYE7gv4AwOgDaAW9BzbH/4edxo=";

export const resistanceBroadcasts: DemaTrack[] = [
  {
    id: "broadcast-1",
    title: "Static Relay 01",
    artist: "Transmisiones de la Resistencia",
    src: localSignal,
  },
  {
    id: "broadcast-2",
    title: "Lore Fragment Echo",
    artist: "Transmisiones de la Resistencia",
    src: localSignal,
  },
  {
    id: "broadcast-3",
    title: "Encrypted Signal 19",
    artist: "Transmisiones de la Resistencia",
    src: localSignal,
  },
];

type DemaRadioState = {
  tracks: DemaTrack[];
  currentTrackIndex: number;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  setPlaying: (isPlaying: boolean) => void;
  togglePlay: () => void;
  playNext: () => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setTrackIndex: (index: number) => void;
};

export const useDemaRadioStore = create<DemaRadioState>((set, get) => ({
  tracks: resistanceBroadcasts,
  currentTrackIndex: 0,
  isPlaying: false,
  volume: 0.7,
  currentTime: 0,
  duration: 0,
  setPlaying: (isPlaying) => set({ isPlaying }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  playNext: () => {
    const { tracks, currentTrackIndex } = get();
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    set({
      currentTrackIndex: nextIndex,
      currentTime: 0,
      duration: 0,
      isPlaying: true,
    });
  },
  setVolume: (volume) => set({ volume }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  setTrackIndex: (index) =>
    set({
      currentTrackIndex: index,
      currentTime: 0,
      duration: 0,
      isPlaying: true,
    }),
}));
