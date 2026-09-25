import type { Metadata } from "next";
import { Inter, Outfit, Dancing_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-cursive",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Varun Chauhan | AI × Design × Development | Creative Technologist",
  description: "Varun Chauhan — AI-Powered Creative Technologist blending high-impact visual design, full-stack web engineering, and autonomous AI/MCP workflows.",
  metadataBase: new URL("https://varunchauhan.design"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${dancingScript.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background text-foreground flex flex-col relative selection:bg-[#ccff00] selection:text-[#030712]">
        <div className="cinematic-noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
