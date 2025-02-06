import type { Metadata } from "next";
// import { TourbitProvider } from "@tourbit/cli";
import "./globals.css";
import { TanstackProvider } from "@/providers/tanstack-provider";
import { Toaster } from "@/components/ui/sonner";
import { getCurrentUser } from "@/lib/currentUser";
import { poppins } from "@/fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  // console.log(user)

  if (!user) {
    return null;
  }

  return (
    <html lang="en">
      <body className={poppins.className}>
        <TanstackProvider>
          {/* <TourbitProvider
            apiKey={process.env.NEXT_PUBLIC_TOURBIT_API_KEY as string}
            userId={user.userId as string}
            user={{
              name: user.name,
              email: user.email,
            }}
          > */}
            {children}
            <Toaster richColors closeButton position="top-left" />
          {/* </TourbitProvider> */}
        </TanstackProvider>
      </body>
    </html>
  );
}
