export class FrameCache {
  private cache = new Map<number, HTMLImageElement>();
  private maxCacheSize: number;

  constructor(maxCacheSize = 240) {
    this.maxCacheSize = maxCacheSize;
  }

  public get(index: number): HTMLImageElement | undefined {
    return this.cache.get(index);
  }

  public set(index: number, img: HTMLImageElement): void {
    if (this.cache.has(index)) {
      return;
    }
    if (this.cache.size >= this.maxCacheSize) {
      // Evict the first entry (FIFO or simple eviction)
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(index, img);
  }

  public has(index: number): boolean {
    return this.cache.has(index);
  }

  public clear(): void {
    this.cache.clear();
  }

  public size(): number {
    return this.cache.size;
  }
}

export const globalFrameCache = new FrameCache();
