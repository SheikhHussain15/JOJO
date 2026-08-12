import React, { useEffect, useRef } from "react";
import { globalFrameCache } from "../../lib/FrameCache";
import { frameLoader } from "../../lib/FrameLoader";

interface CinematicFrameCanvasProps {
  frameIndex: number;
  mouseParallax?: { x: number; y: number };
  isReducedMotion?: boolean;
}

export const CinematicFrameCanvas: React.FC<CinematicFrameCanvasProps> = ({
  frameIndex,
  mouseParallax = { x: 0, y: 0 },
  isReducedMotion = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastRenderedIndex = useRef<number>(-1);
  const currentRenderIndex = useRef<number>(frameIndex);

  currentRenderIndex.current = frameIndex;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let isCancelled = false;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1 : 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      lastRenderedIndex.current = -1; // Force redraw on resize
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const render = () => {
      if (isCancelled) return;

      const targetIdx = isReducedMotion ? 0 : Math.round(currentRenderIndex.current);

      if (targetIdx !== lastRenderedIndex.current || mouseParallax.x !== 0 || mouseParallax.y !== 0) {
        let img = globalFrameCache.get(targetIdx);

        if (!img) {
          // Trigger load for this frame and nearby
          frameLoader.loadFrame(targetIdx).catch(() => {});
          frameLoader.preloadNearby(targetIdx);

          // Fallback to nearest available frame or frame 0
          for (let offset = 1; offset < 10; offset++) {
            if (globalFrameCache.has(targetIdx - offset)) {
              img = globalFrameCache.get(targetIdx - offset);
              break;
            }
            if (globalFrameCache.has(targetIdx + offset)) {
              img = globalFrameCache.get(targetIdx + offset);
              break;
            }
          }
          if (!img) {
            img = globalFrameCache.get(0);
          }
        } else {
          frameLoader.preloadNearby(targetIdx);
        }

        if (img && img.complete && canvas) {
          const width = window.innerWidth;
          const height = window.innerHeight;

          ctx.fillStyle = "#08090d";
          ctx.fillRect(0, 0, width, height);

          // object-fit: cover calculation in Canvas
          const imgAspect = img.naturalWidth / img.naturalHeight || 720 / 1280;
          const canvasAspect = width / height;

          let renderWidth = width;
          let renderHeight = height;
          let offsetX = 0;
          let offsetY = 0;

          if (canvasAspect > imgAspect) {
            renderWidth = width;
            renderHeight = width / imgAspect;
            offsetY = (height - renderHeight) / 2;
          } else {
            renderHeight = height;
            renderWidth = height * imgAspect;
            offsetX = (width - renderWidth) / 2;
          }

          // Apply subtle mouse parallax offset
          const parallaxX = mouseParallax.x * 10;
          const parallaxY = mouseParallax.y * 10;

          ctx.drawImage(
            img,
            offsetX + parallaxX,
            offsetY + parallaxY,
            renderWidth,
            renderHeight
          );

          lastRenderedIndex.current = targetIdx;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isReducedMotion]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
