import { FRAME_COUNT, getFramePath } from "./constants";
import { globalFrameCache } from "./FrameCache";

export type LoadProgressCallback = (loadedCount: number, totalCount: number, percent: number) => void;

class FrameLoaderManager {
  private loadingPromises = new Map<number, Promise<HTMLImageElement>>();
  private loadedCount = 0;
  private isInitialLoaded = false;

  public async preloadInitial(onProgress?: LoadProgressCallback): Promise<void> {
    if (this.isInitialLoaded) return;

    // Stage 1: Load first 5 frames urgently
    const initialIndices = [0, 1, 2, 3, 4];
    await Promise.all(
      initialIndices.map((i) => this.loadFrame(i))
    );

    this.isInitialLoaded = true;
    if (onProgress) {
      onProgress(this.loadedCount, FRAME_COUNT, Math.round((this.loadedCount / FRAME_COUNT) * 100));
    }

    // Stage 2 & 3: Load remaining frames in background
    this.loadRemainingBackground();
  }

  public loadFrame(index: number): Promise<HTMLImageElement> {
    const clampedIndex = Math.max(0, Math.min(FRAME_COUNT - 1, index));

    if (globalFrameCache.has(clampedIndex)) {
      return Promise.resolve(globalFrameCache.get(clampedIndex)!);
    }

    if (this.loadingPromises.has(clampedIndex)) {
      return this.loadingPromises.get(clampedIndex)!;
    }

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.src = getFramePath(clampedIndex);
      img.decoding = "async";

      img.onload = async () => {
        try {
          if (img.decode) {
            await img.decode();
          }
          globalFrameCache.set(clampedIndex, img);
          this.loadedCount = Math.max(this.loadedCount, globalFrameCache.size());
          this.loadingPromises.delete(clampedIndex);
          resolve(img);
        } catch {
          globalFrameCache.set(clampedIndex, img);
          this.loadingPromises.delete(clampedIndex);
          resolve(img);
        }
      };

      img.onerror = () => {
        this.loadingPromises.delete(clampedIndex);
        // Fallback to frame 0 or previous if error
        if (clampedIndex !== 0 && globalFrameCache.has(0)) {
          resolve(globalFrameCache.get(0)!);
        } else {
          reject(new Error(`Failed to load frame ${clampedIndex}`));
        }
      };
    });

    this.loadingPromises.set(clampedIndex, promise);
    return promise;
  }

  public preloadNearby(currentIndex: number, range = 15): void {
    const start = Math.max(0, currentIndex - range);
    const end = Math.min(FRAME_COUNT - 1, currentIndex + range);

    for (let i = start; i <= end; i++) {
      if (!globalFrameCache.has(i) && !this.loadingPromises.has(i)) {
        this.loadFrame(i).catch(() => {});
      }
    }
  }

  private loadRemainingBackground(): void {
    let currentIndex = 5;
    const loadNextBatch = () => {
      if (currentIndex >= FRAME_COUNT) return;
      const batchEnd = Math.min(FRAME_COUNT, currentIndex + 10);
      for (let i = currentIndex; i < batchEnd; i++) {
        if (!globalFrameCache.has(i) && !this.loadingPromises.has(i)) {
          this.loadFrame(i).catch(() => {});
        }
      }
      currentIndex = batchEnd;
      if (currentIndex < FRAME_COUNT) {
        if (typeof window !== "undefined" && "requestIdleCallback" in window) {
          requestIdleCallback(() => loadNextBatch(), { timeout: 100 });
        } else {
          setTimeout(loadNextBatch, 50);
        }
      }
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      requestIdleCallback(() => loadNextBatch(), { timeout: 200 });
    } else {
      setTimeout(loadNextBatch, 100);
    }
  }
}

export const frameLoader = new FrameLoaderManager();
