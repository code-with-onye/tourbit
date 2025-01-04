import { TourStep } from "../types";
import { useState, useCallback, useEffect } from "react";

export const useFeatureTourState = (
  steps: TourStep[],
  initialStep: number,
  onStepChange: (step: number) => void,
  onComplete: () => void
) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const updateStep = useCallback(
    (newStep: number) => {
      setCurrentStep(newStep);
      onStepChange(newStep); 
    },
    [onStepChange]
  );

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      updateStep(currentStep + 1);
    } else {
      onComplete();
    }
  }, [currentStep, steps.length, updateStep, onComplete]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      updateStep(currentStep - 1);
    }
  }, [currentStep, updateStep]);

  const handleClose = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    setCurrentStep(initialStep);
  }, [initialStep]);

  return { currentStep, handleNext, handlePrev, handleClose };
};
