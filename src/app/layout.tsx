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
  title: "DOMI.N.ARTE — Direção criativa para marcas que lideram",
  description:
    "Estúdio de design independente. Identidade visual, sites e produtos SaaS desenhados como sistema único para marcas que se posicionam como referência.",
  openGraph: {
    title: "DOMI.N.ARTE — Direção criativa para marcas que lideram",
    description:
      "Identidade visual, sites e produtos SaaS desenhados como sistema único.",
    type: "website",
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
