"use client";

import { useEffect } from "react";
import { getFocusableElements, trapFocusInContainer } from "@/src/lib/accessibility";

type UseOverlayFocusTrapOptions = {
  isOpen: boolean;
  container: HTMLElement | null;
  initialFocus: HTMLElement | null;
  returnFocus: HTMLElement | null;
  onClose: () => void;
};

export function useOverlayFocusTrap({
  isOpen,
  container,
  initialFocus,
  returnFocus,
  onClose,
}: UseOverlayFocusTrapOptions) {
  useEffect(() => {
    if (!isOpen) {
      returnFocus?.focus();
      return;
    }

    const focusableElements = getFocusableElements(container);
    const firstTarget = initialFocus ?? focusableElements[0];
    firstTarget?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      trapFocusInContainer(event, container);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [container, initialFocus, isOpen, onClose, returnFocus]);
}
