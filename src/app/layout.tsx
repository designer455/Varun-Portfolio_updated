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
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lohitha | Full Stack Developer & Designer Portfolio",
  description: "Explore the portfolio of Lohitha. Architecting scalable full stack applications and fluid interactive digital products.",
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
      <body className="min-h-full bg-background text-foreground flex flex-col">
        {children}
      </body>
    </html>
  );
}
