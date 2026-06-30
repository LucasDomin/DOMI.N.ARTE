import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://dominarte.vercel.app"),
  title: {
    default: "DOMI.N.ARTE — Direção criativa para marcas que lideram",
    template: "%s — DOMI.N.ARTE",
  },
  description:
    "Plataforma editorial de direção criativa. Identidade visual, motion, storytelling cinematográfico. Estúdio independente.",
  keywords: [
    "direção criativa",
    "branding",
    "identidade visual",
    "motion design",
    "storytelling visual",
    "design editorial",
    "arte digital",
  ],
  authors: [{ name: "DOMI.N.ARTE" }],
  creator: "DOMI.N.ARTE",
  openGraph: {
    title: "DOMI.N.ARTE — Direção criativa para marcas que lideram",
    description:
      "Interseção autoral entre branding, arte digital, motion e storytelling cinematográfico.",
    type: "website",
    locale: "pt_BR",
    siteName: "DOMI.N.ARTE",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOMI.N.ARTE",
    description: "Plataforma editorial de direção criativa.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg text-fg antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
