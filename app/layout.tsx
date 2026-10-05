import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CookieBanner } from "@/components/ui/cookie-banner";

const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trace-search.vercel.app"),
  title: "TraceSearch | AI Research Engine",
  description: "Open-source AI web research and evidence-tracing engine. Investigate complex questions across markets, public interest, science, and open innovation with verified source grounding.",
  openGraph: {
    title: "TraceSearch | AI Research Engine",
    description: "Open-source AI web research and evidence-tracing engine. Investigate complex questions across markets, public interest, science, and open innovation with verified source grounding.",
    url: "https://trace-search.vercel.app",
    siteName: "TraceSearch",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className={`${inter.className} min-h-full flex flex-col bg-background text-text-primary`}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
