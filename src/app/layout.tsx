"use client"; // Marking this component as a Client Component

import { usePathname } from 'next/navigation';
import Head from 'next/head';

import MasterLayout from '@/app/layouts/MasterLayout';

// Import the Client Component
import '@/app/globals.css';
import '../../public/assets/vendors/keenicons/styles.bundle.css';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current path

  // List of auth-related paths that should not use MasterLayout
  const isAuthPage = pathname.startsWith('/auth');

  return (
    <html lang="en">
      <Head>
        <link
          href="/assets/media/app/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/assets/media/app/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/assets/media/app/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href="/assets/media/app/favicon.ico" rel="shortcut icon" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link href="/assets/vendors/apexcharts/apexcharts.css" rel="stylesheet" />
        <link href="/assets/vendors/keenicons/styles.bundle.css" rel="stylesheet" />
      </Head>
      <body className="relative min-h-screen">
        {isAuthPage ? (
          // No MasterLayout for auth pages
          children
        ) : (
          // MasterLayout wraps non-auth pages
          <MasterLayout>{children}</MasterLayout>
        )}
      </body>
    </html>
  );
}
