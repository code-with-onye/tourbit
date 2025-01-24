import { Form } from "@/components/ui/form";
import { FormInput } from "../FormInput";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { StepSchema } from "../formSchemas";

interface StepFormInputsProps {
  form: UseFormReturn<z.infer<typeof StepSchema>>;
  tourData: {
    steps: Array<z.infer<typeof StepSchema>>;
  };
  currentStepIndex: number;
  onSubmit: (values: z.infer<typeof StepSchema>) => void;
  handleAddNewStep: () => void;
  handleDeleteStep: () => void;
  handlePrevious: () => void;
  handleNext: () => void;
  isLoading?: boolean;
}

export const StepFormInputs = ({
  form,
  tourData,
  currentStepIndex,
  onSubmit,
  handleAddNewStep,
  handleDeleteStep,
  handlePrevious,
  handleNext,
  isLoading,
}: StepFormInputsProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">
          Step {currentStepIndex + 1} of {tourData.steps.length}
        </h3>
        <div className="flex items-center gap-x-2">
          <button
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
            className={`p-2 rounded ${
              currentStepIndex === 0 ? "bg-gray-200" : "bg-slate-100"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentStepIndex === tourData.steps.length - 1}
            className={`p-2 rounded ${
              currentStepIndex === tourData.steps.length - 1
                ? "bg-gray-200"
                : "bg-slate-100"
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput
            control={form.control}
            inputType="text"
            name="title"
            label="Title"
            placeholder="Enter step title"
          />
          <FormInput
            control={form.control}
            inputType="text"
            name="content"
            label="Content"
            placeholder="Enter step content"
          />
          <FormInput
            control={form.control}
            inputType="text"
            name="selector"
            label="Selector"
            placeholder="Enter step selector"
          />
          <div className="flex items-end justify-between w-full">
            <div className="flex items-center gap-x-4 mt-6">
              <Button type="submit" isLoading={isLoading}>
                {currentStepIndex < tourData.steps.length ? "Update" : "Save"}
              </Button>
              {currentStepIndex < tourData.steps.length && (
                <Button
                  type="button"
                  onClick={handleDeleteStep}
                  icon={Trash2}
                  variant="outline"
                  iconClassName="w-4 h-4"
                  disabled={isLoading}
                />
              )}
            </div>
            <Button
              type="button"
              onClick={handleAddNewStep}
              disabled={isLoading}
              className="flex items-center text-[0.65rem] gap-x-1 border p-1 rounded hover:bg-primary hover:text-white font-semibold"
            >
              <Plus className="w-4 h-4" /> <span>Add new Step</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
