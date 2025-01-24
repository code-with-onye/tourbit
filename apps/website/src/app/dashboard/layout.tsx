import { DashboardLayout } from "@/components/shared/layouts";
import { getCurrentUser } from "@/lib/currentUser";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/signin");
  }
  return <DashboardLayout user={user}>{children}</DashboardLayout>;
}
