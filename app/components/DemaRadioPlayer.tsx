"use client";

import { Pause, Play, SkipForward, Volume2 } from "lucide-react";
import { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { useDemaRadioStore } from "@/src/store/demaRadioStore";

const TRACK_DURATION_SECONDS = 12;
const TRACK_FREQUENCIES = [174, 220, 261.63];

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function DemaRadioPlayer() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const currentTimeRef = useRef(0);

  const {
    tracks,
    currentTrackIndex,
    isPlaying,
    volume,
    currentTime,
    duration,
    togglePlay,
    playNext,
    setVolume,
    setCurrentTime,
    setDuration,
  } = useDemaRadioStore();

  const currentTrack = tracks[currentTrackIndex];
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    currentTimeRef.current = currentTime;
  }, [currentTime]);

  const stopSignal = useCallback(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }

    if (gainRef.current) {
      gainRef.current.disconnect();
      gainRef.current = null;
    }
  }, []);

  const stopProgressTimer = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    const AudioContextCtor = window.AudioContext;
    if (!AudioContextCtor) return null;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextCtor();
    }

    return audioContextRef.current;
  }, []);

  const startSignal = useCallback(async () => {
    const audioContext = getAudioContext();
    if (!audioContext) return;

    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    stopSignal();

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const frequency = TRACK_FREQUENCIES[currentTrackIndex % TRACK_FREQUENCIES.length];

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    gain.gain.setValueAtTime(Math.max(0, Math.min(volume, 1)) * 0.18, audioContext.currentTime);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();

    oscillatorRef.current = oscillator;
    gainRef.current = gain;
  }, [currentTrackIndex, getAudioContext, stopSignal, volume]);

  useEffect(() => {
    if (gainRef.current && audioContextRef.current) {
      gainRef.current.gain.setValueAtTime(
        Math.max(0, Math.min(volume, 1)) * 0.18,
        audioContextRef.current.currentTime,
      );
    }
  }, [volume]);

  useEffect(() => {
    setDuration(TRACK_DURATION_SECONDS);

    if (!isPlaying) {
      if (startedAtRef.current !== null) {
        offsetRef.current = Math.min(currentTimeRef.current, TRACK_DURATION_SECONDS);
      }
      startedAtRef.current = null;
      stopProgressTimer();
      stopSignal();
      return;
    }

    startedAtRef.current = performance.now();
    void startSignal();

    stopProgressTimer();
    intervalRef.current = window.setInterval(() => {
      if (startedAtRef.current === null) return;

      const elapsed = offsetRef.current + (performance.now() - startedAtRef.current) / 1000;
      const nextTime = Math.min(elapsed, TRACK_DURATION_SECONDS);

      setCurrentTime(nextTime);

      if (nextTime >= TRACK_DURATION_SECONDS) {
        offsetRef.current = 0;
        startedAtRef.current = null;
        stopProgressTimer();
        stopSignal();
        playNext();
      }
    }, 250);

    return () => {
      stopProgressTimer();
      stopSignal();
    };
  }, [
    currentTrackIndex,
    isPlaying,
    playNext,
    setCurrentTime,
    setDuration,
    startSignal,
    stopProgressTimer,
    stopSignal,
  ]);

  const handleVolume = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    if (duration <= 0) return;

    const nextProgress = Number(event.target.value);
    const nextTime = (nextProgress / 100) * duration;
    offsetRef.current = nextTime;
    startedAtRef.current = isPlaying ? performance.now() : null;
    setCurrentTime(nextTime);
  };

  const handleNext = () => {
    offsetRef.current = 0;
    startedAtRef.current = null;
    stopProgressTimer();
    stopSignal();
    playNext();
  };

  return (
    <div className="fixed bottom-0 left-0 z-[70] w-full border-t border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate font-mono text-sm text-white">
              {currentTrack.title}
            </p>
            <p className="truncate text-xs text-gray-300">
              {currentTrack.artist}
            </p>
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
              onClick={handleNext}
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
