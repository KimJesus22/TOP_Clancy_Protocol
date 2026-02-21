"use client";

import { Pause, Play, SkipForward, Volume2 } from "lucide-react";
import { ChangeEvent, useEffect, useRef } from "react";
import { useDemaRadioStore } from "@/src/store/demaRadioStore";

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function DemaRadioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    tracks,
    currentTrackIndex,
    isPlaying,
    volume,
    currentTime,
    duration,
    togglePlay,
    playNext,
    setPlaying,
    setVolume,
    setCurrentTime,
    setDuration,
  } = useDemaRadioStore();

  const currentTrack = tracks[currentTrackIndex];
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.load();

    if (!isPlaying) return;

    void audio.play().catch(() => {
      setPlaying(false);
    });
  }, [currentTrackIndex, isPlaying, setPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      void audio.play().catch(() => {
        setPlaying(false);
      });
      return;
    }

    audio.pause();
  }, [isPlaying, setPlaying]);

  const handleVolume = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || duration <= 0) return;

    const nextProgress = Number(event.target.value);
    const nextTime = (nextProgress / 100) * duration;
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  return (
    <div className="fixed bottom-0 left-0 z-[70] w-full border-t border-white/10 bg-black/40 backdrop-blur-md">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onEnded={playNext}
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate font-mono text-sm text-white">
              {currentTrack.title}
            </p>
            <p className="truncate text-xs text-gray-300">{currentTrack.artist}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="rounded-full border border-white/10 bg-black/30 p-2 text-white transition-all duration-300 hover:border-clancy-fire hover:text-clancy-fire hover:shadow-[0_0_14px_rgba(255,46,46,0.24)]"
              aria-label={isPlaying ? "Pausar reproduccion" : "Reproducir"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={playNext}
              className="rounded-full border border-white/10 bg-black/30 p-2 text-white transition-all duration-300 hover:border-clancy-trench hover:text-clancy-trench hover:shadow-[0_0_14px_rgba(252,227,0,0.24)]"
              aria-label="Siguiente pista"
            >
              <SkipForward className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-gray-300">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={progress}
            onChange={handleSeek}
            className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-zinc-700 accent-clancy-fire"
            aria-label="Barra de progreso"
          />
          <span className="font-mono text-xs text-gray-300">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-gray-300" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
            className="h-1 w-32 cursor-pointer appearance-none rounded-lg bg-zinc-700 accent-clancy-trench"
            aria-label="Control de volumen"
          />
        </div>
      </div>
    </div>
  );
}
