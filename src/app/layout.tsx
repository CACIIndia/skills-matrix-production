import Head from "next/head";
import MasterLayout from "./components/MasterLayout";  // Import the Client Component
import "./globals.css";
import "../../public/assets/vendors/keenicons/styles.bundle.css"
import { ThemeProvider } from "./context/themeContext";

export const metadata = {
  title: "Skills Matrix",
  description: "A Next.js app with a dynamic sidebar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
          <link href="/assets/media/app/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
          <link href="/assets/media/app/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
          <link href="/assets/media/app/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
          <link href="/assets/media/app/favicon.ico" rel="shortcut icon" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
          <link href="/assets/vendors/apexcharts/apexcharts.css" rel="stylesheet" />
          <link href="/assets/vendors/keenicons/styles.bundle.css" rel="stylesheet" />
        </Head>
      <body className="relative min-h-screen"  >
      
        <MasterLayout>{children}</MasterLayout>
        
      </body>
    </html>
  );
}
