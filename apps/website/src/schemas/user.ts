import { z } from "zod";

export const UserSchema = z.object({
  token: z.string(),
  email: z.string(),
  name: z.string(),
  userId: z.string(),
});
