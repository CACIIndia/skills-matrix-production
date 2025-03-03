"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

import "@/app/globals.css";
import "../../public/assets/vendors/keenicons/styles.bundle.css";
import { AppProvider } from "@/app/context/AppContext";
import MasterLayout from "@/layouts/Master";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const client = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
  });

  return (
    <html lang='en'>
      <body className='relative min-h-screen'>
        <SessionProvider>
          {pathname === "/auth/signin" ? (
            <>{children}</>
          ) : (
            <QueryClientProvider client={client}>
              <AppProvider>
                <MasterLayout>{children}</MasterLayout>
              </AppProvider>
            </QueryClientProvider>
          )}
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
