"use client";

import React, { useEffect, useState } from "react";
import { frameLoader } from "../../lib/FrameLoader";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete = () => {} }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const isReducedMotion = useReducedMotion();

  useEffect(() => {
    // Respect prefers-reduced-motion: skip the loader sequence entirely.
    if (isReducedMotion) {
      setProgress(100);
      setIsLoaded(true);
      onComplete();
      return;
    }

    let isCancelled = false;

    const load = async () => {
      try {
        await frameLoader.preloadInitial((_loaded, _total, percent) => {
          if (!isCancelled) {
            setProgress(percent);
          }
        });

        // Simulate reaching 100% after initial frames ready
        let current = 0;
        const interval = setInterval(() => {
          current += 5;
          if (current >= 100) {
            current = 100;
            clearInterval(interval);
            if (!isCancelled) {
              setProgress(100);
              setTimeout(() => {
                setIsLoaded(true);
                onComplete();
              }, 400);
            }
          } else {
            if (!isCancelled) {
              setProgress(current);
            }
          }
        }, 30);
      } catch {
        if (!isCancelled) {
          setProgress(100);
          setIsLoaded(true);
          onComplete();
        }
      }
    };

    load();

    return () => {
      isCancelled = true;
    };
  }, [isReducedMotion, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08090d] text-white transition-opacity duration-700 motion-reduce:transition-none ${
        isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="w-80 max-w-[80vw] flex flex-col items-center">
        <span className="text-2xl font-bold tracking-[0.3em] font-mono mb-2 text-white">
          JOJO
        </span>
        <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-mono mb-8">
          Preparing Cinematic Experience
        </span>

        {/* Progress Bar */}
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-[#c5a059] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between w-full text-xs font-mono text-zinc-400 tracking-[0.2em]">
          <span>LOADING SEQUENCE</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};
