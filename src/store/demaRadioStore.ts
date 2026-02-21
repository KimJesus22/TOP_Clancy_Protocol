import { create } from "zustand";

export type DemaTrack = {
  id: string;
  title: string;
  artist: string;
  src: string;
};

export const resistanceBroadcasts: DemaTrack[] = [
  {
    id: "broadcast-1",
    title: "Static Relay 01",
    artist: "Transmisiones de la Resistencia",
    src: "https://cdn.pixabay.com/audio/2022/03/15/audio_c8f4f0f7f2.mp3",
  },
  {
    id: "broadcast-2",
    title: "Lore Fragment Echo",
    artist: "Transmisiones de la Resistencia",
    src: "https://cdn.pixabay.com/audio/2022/02/10/audio_222f4f53ce.mp3",
  },
  {
    id: "broadcast-3",
    title: "Encrypted Signal 19",
    artist: "Transmisiones de la Resistencia",
    src: "https://cdn.pixabay.com/audio/2021/08/04/audio_cfb81f7fe5.mp3",
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
