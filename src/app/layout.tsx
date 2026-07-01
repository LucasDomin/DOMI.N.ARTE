import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://domi-n-arte.vercel.app"),
  title: {
    default: "DOMI.N.ARTE — Direção criativa para marcas que lideram",
    template: "%s — DOMI.N.ARTE",
  },
  description: "Plataforma editorial de direção criativa. Identidade visual, motion, storytelling cinematográfico.",
  openGraph: {
    title: "DOMI.N.ARTE — Direção criativa para marcas que lideram",
    description: "Interseção autoral entre branding, arte digital, motion e storytelling cinematográfico.",
    type: "website",
    locale: "pt_BR",
    siteName: "DOMI.N.ARTE",
  },
  twitter: { card: "summary_large_image", title: "DOMI.N.ARTE" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Instrument+Serif:ital,wght@0,400;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-fg antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
