import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface UseScrollRevealOptions {
  direction?: RevealDirection;
  delay?: number;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  direction = "up",
  delay = 0,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const offset =
    direction === "up"
      ? 24
      : direction === "down"
      ? -24
      : direction === "left"
      ? 24
      : direction === "right"
      ? -24
      : 0;

  const axis = direction === "left" || direction === "right" ? "X" : "Y";

  const hiddenTransform = direction === "none" ? "none" : `translate${axis}(${offset}px)`;

  const style: React.CSSProperties = prefersReducedMotion || isVisible
    ? { opacity: 1, transform: "none", transitionDelay: `${delay}ms` }
    : { opacity: 0, transform: hiddenTransform, transitionDelay: `${delay}ms` };

  return { ref, isVisible, style };
}