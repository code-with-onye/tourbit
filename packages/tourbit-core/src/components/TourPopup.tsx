import { useEffect } from "react";
import { motion } from "framer-motion";

interface TourStep {
  title: string;
  content: string;
  targetElement?: string;
}

interface TourPopupProps {
  step: TourStep;
  position?: { top: number; left: number };
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  onSkip?: () => void;
  customStyles?: React.CSSProperties;
  theme?: "light" | "dark";
  animation?: "bounce" | "fade" | "slide";
  showSpotlight?: boolean;
  showProgress?: boolean;
  mode: "preview" | "live";
}

export const TourPopup: React.FC<TourPopupProps> = ({
  step,
  position,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onClose,
  onSkip,
  customStyles,
  theme = "light",
  animation = "bounce",
  showSpotlight = true,
  showProgress = false,
  mode,
}) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          if (currentStep < totalSteps - 1) onNext();
          break;
        case "ArrowLeft":
          if (currentStep > 0) onPrev();
          break;
        case "Escape":
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentStep, totalSteps, onNext, onPrev, onClose]);

  const themeClasses =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-700";

  const animationVariants = {
    bounce: {
      y: [0, -10, 0],
      transition: { repeat: Infinity, duration: 3 },
    },
    fade: {
      opacity: [0, 1],
      transition: { duration: 0.3 },
    },
    slide: {
      x: [-20, 0],
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      {showSpotlight && (
        <div
          className={
            mode === "preview"
              ? "feature-tour-highlight"
              : "fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300"
          }
          onClick={onClose}
        />
      )}

      <motion.div
        className={`fixed z-50 shadow-lg rounded-lg p-4 max-w-sm transform transition-all duration-300 ease-in-out ${themeClasses}`}
        style={{
          ...customStyles,
          ...(mode !== "preview" && position && {
            top: position.top,
            left: position.left,
          }),
        }}
        variants={animationVariants}
        animate={animation}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 border p-0.5 rounded-lg hover:shadow"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Progress indicators */}
        {showProgress && (
          <div className="mb-4 w-full bg-gray-200 h-1 rounded-full overflow-hidden mt-6">
            <div
              className="h-full bg-indigo-500 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        )}

        {/* Content */}
        <h3 className="text-lg font-medium mb-2">{step.title}</h3>
        <p className="text-sm mb-4">{step.content}</p>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-x-8">
          <button
            onClick={onPrev}
            disabled={currentStep === 0}
            className="flex items-center space-x-1 text-sm disabled:opacity-50"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Previous</span>
          </button>

          {/* Step indicators */}
          <div className="flex space-x-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === currentStep
                    ? "bg-indigo-500"
                    : i < currentStep
                      ? "bg-indigo-300"
                      : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={onNext}
            className="flex items-center space-x-1 text-sm text-indigo-500"
          >
            <span>{currentStep === totalSteps - 1 ? "Finish" : "Next"}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Skip button */}
        {onSkip && (
          <button
            onClick={onSkip}
            className="mt-4 text-xs text-gray-500 hover:text-gray-700"
          >
            Skip tutorial
          </button>
        )}
      </motion.div>
    </>
  );
};
