import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { CookieBanner } from "@/components/ui/cookie-banner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TraceSearch | AI Research Engine",
  description: "Search the web, analyze multiple sources, and trace important findings back to their evidence.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className={`${inter.className} min-h-full flex flex-col bg-background text-text-primary`}>
        <ThemeProvider>
          {children}
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
