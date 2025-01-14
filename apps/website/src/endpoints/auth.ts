import {
  SignInSchema,
  SignUpSchema,
} from "@/components/shared/forms/formSchemas";
import axios from "@/lib/axios";
import { z } from "zod";

class AuthService {
  private baseEndpoint = "/auth";
  async signnup(values: z.infer<typeof SignUpSchema>) {
    return await axios.post(`${this.baseEndpoint}`, {
      ...values,
      firstname: values.name.split(" ")[0],
      lastname: values.name.split(" ")[1],
    });
  }

  async signin(values: z.infer<typeof SignInSchema>) {
    return await axios.post(`${this.baseEndpoint}/signin`, values);
  }
}

export const authService = new AuthService();
