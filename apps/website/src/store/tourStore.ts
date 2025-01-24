import { TourSchema } from "@/schemas/tour";
import { z } from "zod";
import { create } from "zustand";

type Tour = z.infer<typeof TourSchema>;

interface TourStore {
  tourData: Tour | null;
  currentStepIndex: number;

  setTourData: (tour: Tour) => void;
  setCurrentStepIndex: (index: number) => void;
}

export const useTourStore = create<TourStore>((set) => ({
  tourData: null,
  currentStepIndex: 0,

  setTourData: (tour) => set({ tourData: tour }),
  setCurrentStepIndex: (index) => set({ currentStepIndex: index }),
}));
