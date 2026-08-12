export const FRAME_COUNT = 240;

const frameModules = import.meta.glob<{ default: string }>(
  '/jojo_video3_frames/*.png',
  { eager: true }
);

export function getFramePath(index: number): string {
  const paddedIndex = String(index + 1).padStart(4, "0");
  const key = `/jojo_video3_frames/frame_${paddedIndex}.png`;
  const module = frameModules[key];
  if (module && module.default) {
    return module.default;
  }
  // Fallback
  return `/jojo_video3_frames/frame_${paddedIndex}.png`;
}
