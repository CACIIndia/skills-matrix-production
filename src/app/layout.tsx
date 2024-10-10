"use client"; // Ensure the client-side behavior is clear.

import Head from "next/head";
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
      <Head>
        <link
          href='/assets/media/app/apple-touch-icon.png'
          rel='apple-touch-icon'
          sizes='180x180'
        />
        <link
          href='/assets/media/app/favicon-32x32.png'
          rel='icon'
          sizes='32x32'
          type='image/png'
        />
        <link
          href='/assets/media/app/favicon-16x16.png'
          rel='icon'
          sizes='16x16'
          type='image/png'
        />
        <link href='/assets/media/app/favicon.ico' rel='shortcut icon' />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        />
        <link
          href='/assets/vendors/apexcharts/apexcharts.css'
          rel='stylesheet'
        />
        <link
          href='/assets/vendors/keenicons/styles.bundle.css'
          rel='stylesheet'
        />
      </Head>
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
