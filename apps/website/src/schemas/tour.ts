import { z } from "zod";

export const StepSchema = z.object({
  _id: z.string().optional(),
  selector: z.string(),
  title: z.string(),
  content: z.string(),
});

export const TourSchema = z.object({
  _id: z.string(),
  userId: z.string(),
  alias: z.string(),
  title: z.string(),
  status: z.string(),
  steps: z.array(StepSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  __v: z.number(),
});
