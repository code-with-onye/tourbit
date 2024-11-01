import TourPopup from "./TourPopup";
import {
  FeatureTourProps,
  useFeatureTourState,
  useHighlightElement,
  useKeyboardNavigation,
  usePositioning,
} from "@tourbit/utils";

const Tourbit: React.FC<FeatureTourProps> = ({
  steps,
  onComplete,
  customStyles = {},
  persistKey = "feature-tour-progress",
}) => {
  const { currentStep, handleNext, handlePrev, handleClose } =
    useFeatureTourState(steps, onComplete, persistKey);
  const position = usePositioning(steps, currentStep);
  useKeyboardNavigation(handleNext, handlePrev, handleClose);
  useHighlightElement(steps, currentStep);

  if (!steps || steps.length === 0 || currentStep >= steps.length) return null;

  return (
    <>
      <style>
        {`
          .feature-tour-highlight {
            position: relative;
            z-index: 50;
            box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
          }
        `}
      </style>
      <TourPopup
        step={steps[currentStep]}
        position={position}
        currentStep={currentStep}
        totalSteps={steps.length}
        onNext={handleNext}
        onPrev={handlePrev}
        onClose={handleClose}
        customStyles={customStyles}
        animation="bounce"
        onSkip={handleClose}
        showSpotlight
      />
    </>
  );
};

export { Tourbit };
