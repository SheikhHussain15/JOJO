"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { CinematicFrameCanvas } from "./CinematicFrameCanvas";
import { CinematicOverlay } from "./CinematicOverlay";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { ArrowDown } from "lucide-react";

export const CinematicHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { frameIndex, scrollProgress } = useScrollProgress(containerRef);
  const isReducedMotion = useReducedMotion();

  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.innerWidth < 768 || isReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      setMouseParallax({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isReducedMotion]);

  // Text opacity and transform calculated from scroll progress
  const textOpacity = isReducedMotion ? 1 : Math.max(0, 1 - scrollProgress * 2.5);
  const textTranslateY = isReducedMotion ? 0 : scrollProgress * -50;

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#08090d]">
      {/* Sticky Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        {/* Canvas Background */}
        <CinematicFrameCanvas
          frameIndex={frameIndex}
          mouseParallax={mouseParallax}
          isReducedMotion={isReducedMotion}
        />

        {/* Atmospheric Overlays */}
        <CinematicOverlay />

        {/* Hero Content */}
        <div
          className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 pt-36 md:pt-44 flex flex-col items-start justify-between h-full pb-16 pointer-events-none"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
            transition: "opacity 0.1s ease-out, transform 0.1s ease-out",
          }}
        >
          {/* Top Tagline */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-zinc-300">
                International Engineering
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-[1.08] font-sans">
              MOVING INDUSTRY <br />
              <span className="font-semibold text-white">FORWARD.</span>
            </h1>
          </div>

          {/* Bottom Subtitle & Scroll Indicator */}
          <div className="w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pointer-events-auto">
            <div className="max-w-md space-y-4">
              <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed">
                Pioneering elite automotive excellence and heavy agricultural machinery solutions engineered for global performance.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="/automotive"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono px-6 py-3 rounded-full bg-white text-[#08090d] hover:bg-[#c5a059] hover:text-white transition-all font-medium"
                >
                  <span>Explore Portfolio</span>
                </Link>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex flex-col items-start sm:items-end gap-2 text-zinc-400 font-mono text-xs tracking-[0.25em]">
              <span>01 / 240</span>
              <div className="w-12 h-[1px] bg-white/30 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-[#c5a059] transition-all duration-100"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400 pt-1">
                <span>SCROLL</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#c5a059]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};