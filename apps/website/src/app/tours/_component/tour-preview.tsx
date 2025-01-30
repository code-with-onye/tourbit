import { useState } from "react";
import { TourPopup } from "@tourbit/cli";
import { useGetTourById } from "@/hooks/server/tour";
import { useSearchParams } from "next/navigation";
import { Route, Loader2, Workflow } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";

export const TourPreview = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const searchParams = useSearchParams();
  const tourId = searchParams.get("tourId");

  // Call the hook unconditionally, but handle the case where tourId is null/undefined in the hook itself.
  const { data, isPending } = useGetTourById(tourId || ""); // Pass an empty string if tourId is null/undefined.

  const steps = data?.steps || [];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleClose = () => {
    console.log("Tour closed");
    setCurrentStep(0);
  };

  if (!tourId) {
    return (
      // <div className="flex flex-col w-full h-full items-center justify-center p-6 bg-slate-50/30">
      //   <div className="text-center space-y-4">
      //     <div className="relative">
      //       <Route className="w-32 h-32 text-red-400/80 animate-pulse" />
      //       <div className="absolute inset-0 bg-gradient-to-t from-slate-50/30 to-transparent" />
      //     </div>
      //     <div className="space-y-2 max-w-[300px]">
      //       <h3 className="text-xl font-semibold text-slate-700">
      //         No Tour Selected
      //       </h3>
      //       <p className="text-sm text-slate-500">
      //         Please select a tour from the list to preview its interactive
      //         walkthrough
      //       </p>
      //     </div>
      //   </div>
      // </div>
      <EmptyState
        icon={Workflow}
        title="No Tour Selected"
        description=" Please select a tour from the list to preview its interactive walkthrough"
      />
    );
  }

  if (isPending) {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center p-6 bg-slate-50/30">
        <div className="text-center space-y-3">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-sm font-medium text-slate-600">
            Loading tour preview...
          </p>
        </div>
      </div>
    );
  }

  if (!steps.length) {
    return (
      <EmptyState
        icon={Route}
        title="No Steps Created"
        description=" Start creating steps for your tour to preview the walkthrough"
      />
    );
  }

  return (
    <div className="w-full h-full relative">
      <style>
        {`
          .feature-tour-highlight {
            position: relative;
            z-index: 50;
            box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7);
            transition: all 0.3s ease-in-out;
          }
        `}
      </style>
      <div className="absolute inset-0 flex items-center justify-center">
        <TourPopup
          step={steps[currentStep]}
          currentStep={currentStep}
          totalSteps={steps.length}
          onNext={handleNext}
          onPrev={handlePrev}
          onClose={handleClose}
          animation="bounce"
          onSkip={handleClose}
          mode="preview"
        />
      </div>
    </div>
  );
};
