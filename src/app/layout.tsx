"use client"; // Ensure the client-side behavior is clear.

import MasterLayout from "@/app/layouts/MasterLayout";
import "@/app/globals.css";
import "../../public/assets/vendors/keenicons/styles.bundle.css";
import { SessionProvider } from "next-auth/react"; // Use 'next-auth/react' to properly access session.
import { usePathname } from "next/navigation"; // To get the current path

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current path

  return (
    <html lang='en'>

      <body className='relative min-h-screen'>
        <SessionProvider>
          {/* Conditionally render MasterLayout if path is NOT /auth/signin */}
          {pathname === "/auth/signin" ? (
            <>{children}</> // No layout for /auth/signin
          ) : (
            <MasterLayout>{children}</MasterLayout> // Layout for other routes
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
