export const FRAME_COUNT = 240;

// Frames live in public/jojo_video3_frames/ and are served at /jojo_video3_frames/
export function getFramePath(index: number): string {
  const paddedIndex = String(index + 1).padStart(4, "0");
  return `/jojo_video3_frames/frame_${paddedIndex}.png`;
}
