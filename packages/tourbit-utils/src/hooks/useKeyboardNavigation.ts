/* eslint-disable no-undef */
import { useEffect } from "react";

export const useKeyboardNavigation = (
  handleNext: () => void,
  handlePrev: () => void,
  handleClose: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") handleNext();
      else if (event.key === "ArrowLeft") handlePrev();
      else if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, handleClose]);
};
