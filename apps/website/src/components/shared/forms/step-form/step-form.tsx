import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { StepSchema } from "../formSchemas";
import { useAddStep, useDeleteStep, useGetTourById, useUpdateStep } from "@/hooks/server/tour";
import { StepFormInputs } from "./form-input";
import { useEffect } from "react";
import { useTourStore } from "@/store/tourStore";
import { handleError, handleSuccess } from "@/lib/form-handler";

export const StepForm = ({ tourId }: { tourId: string | null }) => {
  const {
    tourData,
    currentStepIndex,
    setTourData,
    setCurrentStepIndex,
  } = useTourStore();

  const { data: fetchedTourData, isPending } = useGetTourById(tourId as string);
  const { mutate: createStep, isPending: creatingStep } = useAddStep();
  const { mutate: updateStep, isPending: updatingStep } = useUpdateStep();
  const {mutate: deleteStep, isPending: deletingStep} = useDeleteStep();

  useEffect(() => {
    if (fetchedTourData) {
      setTourData(fetchedTourData);
    }
  }, [fetchedTourData, setTourData]);

  const form = useForm({
    resolver: zodResolver(StepSchema),
    defaultValues: {
      title: "",
      content: "",
      selector: "",
    },
  });

  // Sync form with current step or reset for new step
  useEffect(() => {
    if (tourData?.steps?.[currentStepIndex]) {
      const currentStep = tourData.steps[currentStepIndex];
      form.reset({
        title: currentStep.title,
        content: currentStep.content,
        selector: currentStep.selector,
      });
    } else {
      form.reset({
        title: "",
        content: "",
        selector: "",
      });
    }
  }, [currentStepIndex, tourData, form]);

  function onSubmit(values: z.infer<typeof StepSchema>) {
    if (currentStepIndex < (tourData?.steps?.length || 0)) {
      updateStep(
        {
          data: values,
          tourId: tourId as string,
          stepId: tourData?.steps[currentStepIndex]._id as string,
        },
        {
          onSuccess: () => {
            handleSuccess("Step updated successfully");
          },
          onError: (error) => {
            handleError(error);
          },
        }
      );
    } else {
      createStep(
        {
          data: values,
          tourId: tourId as string,
        },
        {
          onSuccess: () => {
            handleSuccess("Step created successfully");
            setCurrentStepIndex(currentStepIndex + 1);
          },
          onError: (error) => {
            handleError(error);
          },
        }
      );
    }
  }

  const handleAddNewStep = () => {
    setCurrentStepIndex(tourData?.steps?.length || 0);
    form.reset();
  };

  const handleDeleteStep = () => {
    if (tourData?.steps?.length) {
      deleteStep({
        tourId: tourId as string,
        stepId: tourData?.steps[currentStepIndex]._id as string,
      }, {
        onSuccess: () => {
          handleSuccess("Step deleted successfully");
          setCurrentStepIndex(0);
        },
        onError: (error) => {
          handleError(error);
        },
      });
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < (tourData?.steps?.length || 0) - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <StepFormInputs
      form={form}
      tourData={tourData || { steps: [] }}
      currentStepIndex={currentStepIndex}
      onSubmit={onSubmit}
      handleAddNewStep={handleAddNewStep}
      handleDeleteStep={handleDeleteStep}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
      isLoading={creatingStep || updatingStep || deletingStep}
    />
  );
};

export default StepForm;
