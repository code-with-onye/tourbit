import { TourbitProvider } from "@tourbit/cli";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TourbitProvider apiKey="test_dKj8mP2x-nR5vL9qY-hB4wC7tF-gN3sA6uE">
          {children}
        </TourbitProvider>
      </body>
    </html>
  );
}
