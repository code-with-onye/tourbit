import { StepSchema } from "@/components/shared/forms/formSchemas";
import { tourService } from "@/endpoints/tours";
import { TourSchema } from "@/schemas/tour";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

export const useCreateTour = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-tour"],
    mutationFn: async ({ title }: { title: string }) =>
      await tourService.createTour(title),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-tours"] });
    },
  });

  return { mutate, isPending };
};

export const useGetTours = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["get-tours"],
    queryFn: async () => tourService.getTours(),
  });

  return { data: data?.data as z.infer<typeof TourSchema>[], isPending, error };
};

export const useGetTourById = (tourId: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["get-tour-by-id", tourId],
    enabled: !!tourId,
    queryFn: async () => tourService.getTourById(tourId),
  });

  return { data: data?.data as z.infer<typeof TourSchema>, isPending };
};

export const useUpdateTour = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-tour"],
    mutationFn: async ({
      tourId,
      title,
      status,
    }: {
      tourId: string;
      title: string;
      status: string;
    }) => await tourService.updateTour(tourId, title, status),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-tours"] });
    },
  });

  return { mutate, isPending };
};

export const useAddStep = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-step"],
    mutationFn: async ({
      data,
      tourId,
    }: {
      data: z.infer<typeof StepSchema>;
      tourId: string;
    }) => await tourService.addStep({ data, tourId }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-tour-by-id"] });
    },
  });

  return { mutate, isPending };
};

export const useUpdateStep = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-step"],
    mutationFn: async ({
      data,
      tourId,
      stepId,
    }: {
      data: z.infer<typeof StepSchema>;
      tourId: string;
      stepId: string;
    }) => await tourService.updateStep({ data, tourId, stepId }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-tour-by-id"] });
    },
  });

  return { mutate, isPending };
};

export const useDeleteTour = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-tour"],
    mutationFn: async ({ tourId }: { tourId: string }) =>
      await tourService.deleteTour(tourId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-tours"] });
      queryClient.invalidateQueries({ queryKey: ["get-tour-by-id"] });
    },
  });

  return { mutate, isPending };
};

export const useDeleteStep = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-step"],
    mutationFn: async ({
      tourId,
      stepId,
    }: {
      tourId: string;
      stepId: string;
    }) => await tourService.deleteStep(tourId, stepId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["get-tour-by-id"] });
    },
  });

  return { mutate, isPending };
};
