import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TourSchema } from "./formSchemas";
import { Form } from "@/components/ui/form";
import { FormInput } from "./FormInput";
import { useGetTourById, useUpdateTour } from "@/hooks/server/tour";
import { useFormReset } from "@/hooks/form-reset";
import { FormSwitch } from "./FormSwitch";

export const TourForm = ({ tourId }: { tourId: string | null }) => {
  const form = useForm<z.infer<typeof TourSchema>>({
    resolver: zodResolver(TourSchema),
    defaultValues: {
      title: "",
      status: false,
    },
  });

  const { data: tourData } = useGetTourById(tourId as string);
  const { mutate: updateTour } = useUpdateTour();

  useFormReset({
    form,
    data: tourData,
    mapDataToFormValues: (data) => ({
      title: data.title,
      status: data.status === "active" ? true : false,
    }),
  });

  const handleBlur = async (name: keyof z.infer<typeof TourSchema>) => {
    // Validate the field that was blurred
    const isValid = await form.trigger(name);
    if (isValid && tourId) {
      const { title, status } = form.getValues();
      updateTour({
        tourId,
        title: title as string,
        status: status ? "active" : "inactive",
      });
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-3">
        <FormInput
          control={form.control}
          inputType="text"
          name="title"
          label="Title"
          placeholder="Enter tour title"
          onBlur={() => handleBlur("title")}
        />
        <FormSwitch
          name="status"
          label="Status"
          description="Toggle the status of the tour"
          control={form.control}
          onBlur={() => handleBlur("status")}
        />
      </form>
    </Form>
  );
};
