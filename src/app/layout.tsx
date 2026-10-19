import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const basePath = "/Edaret_Amlak";

export const metadata: Metadata = {
  title: "إدارة أملاك - ابراج",
  description: "المنظومة المتكاملة لإدارة الأصول والوحدات الفندقية والسكنية بالمملكة",
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: "any" },
      { url: `${basePath}/favicon-32x32.png`, type: "image/png", sizes: "32x32" },
      { url: `${basePath}/favicon-16x16.png`, type: "image/png", sizes: "16x16" },
      { url: `${basePath}/icon.png`, type: "image/png", sizes: "512x512" },
      { url: `${basePath}/logo-app-icon.png`, type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: `${basePath}/apple-icon.png`, sizes: "180x180", type: "image/png" },
    ],
    shortcut: `${basePath}/favicon.ico`,
  },
};

import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${inter.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans bg-[#F4F6F0] text-[#182016]"
      >
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster />
      </body>
    </html>
  );
}
