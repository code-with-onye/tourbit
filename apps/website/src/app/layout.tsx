import type { Metadata } from "next";
import { TourbitProvider } from "@tourbit/cli";
import localFont from "next/font/local";
import "./globals.css";
import { TanstackProvider } from "@/providers/tanstack-provider";
import { Toaster } from "@/components/ui/sonner";
import { getCurrentUser } from "@/lib/currentUser";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanstackProvider>
          <TourbitProvider
            apiKey={process.env.NEXT_PUBLIC_TOURBIT_API_KEY as string}
            userId={user.userId as string}
            user={{
              name: user.name,
              email: user.email,
            }}
          >
            {children}
            <Toaster richColors closeButton position="top-left" />
          </TourbitProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
