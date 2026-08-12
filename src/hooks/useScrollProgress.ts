import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import { FRAME_COUNT } from "../lib/constants";

export function useScrollProgress(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [frameIndex, setFrameIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollHeight = container.offsetHeight - windowHeight;

      if (totalScrollHeight <= 0) return;

      // Calculate how far we've scrolled into the container
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollHeight));

      targetProgressRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let animationFrameId: number;

    // Smooth interpolation (lerp) loop for cinematic inertia
    const updateAnimation = () => {
      const smoothing = 0.1; // adjust for inertia feel
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * smoothing;

      const progress = currentProgressRef.current;
      setScrollProgress(progress);

      const calculatedFrame = Math.round(progress * (FRAME_COUNT - 1));
      const clampedFrame = Math.max(0, Math.min(FRAME_COUNT - 1, calculatedFrame));
      setFrameIndex(clampedFrame);

      animationFrameId = requestAnimationFrame(updateAnimation);
    };

    animationFrameId = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [containerRef]);

  return { frameIndex, scrollProgress };
}
