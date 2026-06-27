import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DOMI.N.ARTE — Identidade Visual, Sites e SaaS",
  description:
    "Estúdio de design premium. Criamos sistemas de design que unem identidade visual, sites de alta performance e produtos SaaS.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body className={`${inter.className} bg-bg text-fg antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
