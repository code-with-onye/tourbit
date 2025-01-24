import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long" }),
});

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name should be at least 3 characters long" }),
    confirmPassword: z.string(),
  })
  .merge(SignInSchema);

export const TourSchema = z.object({
  title: z.string().optional(),
  status: z.boolean().optional(),
});

export const StepSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Descriptioon is required" }),
  selector: z.string().min(3, { message: "Selector is required" }),
});
