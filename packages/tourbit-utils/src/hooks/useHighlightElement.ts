/* eslint-disable no-undef */
import { TourStep } from "../types";
import { useEffect } from "react";

export const useHighlightElement = (steps: TourStep[], currentStep: number) => {
  useEffect(() => {
    const element = document.querySelector(steps[currentStep].selector);
    if (element) {
      element.classList.add("feature-tour-highlight");
    }
    return () => {
      if (element) {
        element.classList.remove("feature-tour-highlight");
      }
    };
  }, [currentStep, steps]);
};
