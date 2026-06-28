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

export default function HomePageMomento() {
  const [loading, setLoading] = useState(true);

  const onLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={onLoaderComplete} />}
      </AnimatePresence>

      {!loading && (
        <main className="relative bg-bg min-h-screen selection:bg-accent selection:text-bg">
          <div className="grain" />
          <div className="vignette" />
          <NavMomento />
          <ParallaxHero />
          <ManifestoMomento2 />
          <WorkShowcaseMomento3 />
          <ProcessMomento4 />
          <ConviteMomento5 />
          <FooterMomento />
        </main>
      )}
    </>
  );
}
