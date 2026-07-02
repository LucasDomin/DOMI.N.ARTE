"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/loader";
import NavMomento from "@/components/nav";
import ParallaxHero from "@/components/parallax-hero";
import ManifestoMomento2 from "@/components/manifesto";
import WorkShowcaseMomento3 from "@/components/work-showcase";
import ProcessMomento4 from "@/components/process";
import ConviteMomento5 from "@/components/cta-final";
import FooterMomento from "@/components/footer";
import CustomCursor from "@/components/cursor";
import SectionTransition from "@/components/section-transition";
import type { Project } from "@/db/schema";

export default function HomePageClient({ initialProjects }: { initialProjects: Project[] }) {
  const [loading, setLoading] = useState(true);
  const onLoaderComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={onLoaderComplete} />}
      </AnimatePresence>

      {!loading && (
        <main className="relative bg-bg min-h-screen selection:bg-accent selection:text-bg">
          <div className="grain" />
          <div className="vignette" />
          <NavMomento />

          {/* 01 — Parallax hero */}
          <ParallaxHero />

          {/* Divider */}
          <SectionTransition number="02" label="Manifesto" />

          {/* 02 — Manifesto */}
          <ManifestoMomento2 />

          {/* Divider */}
          <SectionTransition number="03" label="Galeria de Obras" />

          {/* 03 — Works */}
          <WorkShowcaseMomento3 initialProjects={initialProjects} />

          {/* Divider */}
          <SectionTransition number="04" label="Método" />

          {/* 04 — Process */}
          <ProcessMomento4 />

          {/* Divider */}
          <SectionTransition number="05" label="Convite" />

          {/* 05 — CTA */}
          <ConviteMomento5 />

          <FooterMomento />
        </main>
      )}
    </>
  );
}
