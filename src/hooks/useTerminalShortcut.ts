"use client";

import { useEffect } from "react";

type UseTerminalShortcutOptions = {
  onOpen: () => void;
  onCaptureTrigger: (element: HTMLElement | null) => void;
};

export function useTerminalShortcut({
  onOpen,
  onCaptureTrigger,
}: UseTerminalShortcutOptions) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "t") {
        event.preventDefault();
        onCaptureTrigger(document.activeElement as HTMLElement | null);
        onOpen();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCaptureTrigger, onOpen]);
}
