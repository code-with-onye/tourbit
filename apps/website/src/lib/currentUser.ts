import { UserSchema } from "@/schemas/user";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const headersList = await headers();
  const userHeader = headersList.get("x-user");

  if (!userHeader) {
    return null;
  }

  try {
    const user = JSON.parse(userHeader);
    const validatedUserData = UserSchema.parse(user);
    return validatedUserData;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
}

export async function signOut(redirectLink?: string) {
  // cookies().delete("user-storage");
  const headersList = await headers();
  headersList.delete("x-user");

  redirect(redirectLink ?? "/login");
}
