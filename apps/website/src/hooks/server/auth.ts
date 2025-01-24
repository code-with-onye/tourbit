import {
  SignInSchema,
  SignUpSchema,
} from "@/components/shared/forms/formSchemas";
import { authService } from "@/endpoints/auth";
import { useUserStore } from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const useSignUp = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: async (data: z.infer<typeof SignUpSchema>) =>
      await authService.signnup(data),
  });

  return { mutate, isPending };
};

export const useSignIn = () => {
  const { login } = useUserStore();

  const { mutate, isPending } = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async (data: z.infer<typeof SignInSchema>) =>
      await authService.signin(data),
    onSuccess(data) {
      login({
        ...data.data,
      });
    },
  });

  return { mutate, isPending };
};
