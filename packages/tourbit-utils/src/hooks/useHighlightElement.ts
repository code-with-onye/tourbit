/* eslint-disable no-undef */
import { TourStep } from "../types";
import { useEffect } from "react";

export const useHighlightElement = (steps: TourStep[], currentStep: number) => {
  useEffect(() => {
    if (
      !steps ||
      steps.length === 0 ||
      currentStep >= steps.length ||
      currentStep < 0
    ) {
      return;
    }

    const step = steps[currentStep];
    if (!step || !step.selector) {
      return;
    }

    const element = document.querySelector(step.selector);
    if (element) {
      element.classList.add("feature-tour-highlight");
    }

    return () => {
      if (element) {
        element.classList.remove("feature-tour-highlight");
      }
    };
  }, [steps, currentStep]);
};
