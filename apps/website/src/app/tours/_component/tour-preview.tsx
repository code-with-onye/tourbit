// import { useState } from "react";
// import { TourPopup } from "@tourbit/cli";
import { useGetTourById } from "@/hooks/server/tour";
import { useSearchParams } from "next/navigation";
import { Route, Workflow } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import Loader from "@/components/ui/loader";

export const TourPreview = () => {
  // const [currentStep, setCurrentStep] = useState(0);

  const searchParams = useSearchParams();
  const tourId = searchParams.get("tourId");

  const { data, isPending } = useGetTourById(tourId || "");

  const steps = data?.steps || [];

  // const handleNext = () => {
  //   if (currentStep < steps.length - 1) {
  //     setCurrentStep((prev) => prev + 1);
  //   }
  // };

  // const handlePrev = () => {
  //   if (currentStep > 0) {
  //     setCurrentStep((prev) => prev - 1);
  //   }
  // };

  // const handleClose = () => {
  //   console.log("Tour closed");
  //   setCurrentStep(0);
  // };

  if (!tourId) {
    return (
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
        <div className="text-center space-y-3 flex flex-col w-full justify-center items-center">
          <Loader />
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
      <div className="absolute inset-0 flex items-center justify-center">
        {/* <TourPopup
          step={steps[currentStep]}
          currentStep={currentStep}
          totalSteps={steps.length}
          onNext={handleNext}
          onPrev={handlePrev}
          onClose={handleClose}
          animation="bounce"
          onSkip={handleClose}
          mode="preview"
        /> */}
      </div>
    </div>
  );
};
