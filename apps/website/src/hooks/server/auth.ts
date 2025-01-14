import {
  SignInSchema,
  SignUpSchema,
} from "@/components/shared/forms/formSchemas";
import { authService } from "@/endpoints/auth";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const useSignUp = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: async(data: z.infer<typeof SignUpSchema>) =>
      await authService.signnup(data),
  });

  return { mutate, isPending };
};

export const useSignIn = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async (data: z.infer<typeof SignInSchema>) =>
      await authService.signin(data),
  });

  return { mutate, isPending };
};
