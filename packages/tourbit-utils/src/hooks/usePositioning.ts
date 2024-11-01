/* eslint-disable no-undef */
import { TourStep } from "../types";
import { useState, useEffect, useCallback } from "react";

export const usePositioning = (steps: TourStep[], currentStep: number) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const updatePosition = useCallback(() => {
    if (steps && currentStep < steps.length) {
      const element = document.querySelector(steps[currentStep].selector);
      if (element) {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        let top = rect.bottom + window.scrollY + 10;
        let left = rect.left + window.scrollX;

        if (top + 200 > viewportHeight) {
          top = rect.top + window.scrollY - 210;
        }
        if (left + 300 > viewportWidth) {
          left = viewportWidth - 310;
        }

        setPosition({ top, left });
      }
    }
  }, [currentStep, steps]);

  useEffect(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [updatePosition]);

  return position;
};
