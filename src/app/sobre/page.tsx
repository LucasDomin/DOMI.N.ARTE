import type { Metadata } from "next";
import SobreClient from "./sobre-client";

export const metadata: Metadata = {
  title: "Sobre — DOMI.N.ARTE",
  description: "A história por trás do estúdio. Direção criativa com raízes em type design e design editorial.",
};

export default function SobrePage() {
  return <SobreClient />;
}
