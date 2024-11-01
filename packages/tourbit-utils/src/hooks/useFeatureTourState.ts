import { TourStep } from "../types";
import { useState, useEffect, useCallback } from "react";
import {useLocalStorage} from "./useLocalstorage";

export const useFeatureTourState = (
  steps: TourStep[],
  onComplete: () => void,
  persistKey: string
) => {
  const [key, setKey] = useLocalStorage<string>(persistKey, "");
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = key;
    return savedStep ? parseInt(savedStep, 10) : 0;
  });

  useEffect(() => {
    setKey(currentStep.toString());
  }, [currentStep, setKey]);

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  }, [currentStep, steps.length, onComplete]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleClose = useCallback(() => {
    onComplete();
  }, [onComplete]);

  return { currentStep, handleNext, handlePrev, handleClose };
};
