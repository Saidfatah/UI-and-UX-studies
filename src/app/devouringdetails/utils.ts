
export const gapBetweenBars = 8

export const nearThreshold = gapBetweenBars * 2

export const isNearScrollBar = (scrollY: number, barY: number) => {
    const diff = Math.abs(Math.abs(scrollY - barY));

    return { shouldExpand: diff < nearThreshold, diff };
}
 

export function createScrollSpeedTracker(threshold = 50, decayMs = 500) {
    let lastScrollY = window.scrollY;
    let scrolling = false;
    let timer: ReturnType<typeof setTimeout> | undefined = undefined;
  
    return function checkScroll(): boolean {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollY);
  
      lastScrollY = currentY;
  
      if (delta > threshold) {
        scrolling = true;
  
        // reset decay timer
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          scrolling = false;
          timer = undefined;
        }, decayMs);
      } else if (!timer) {
        scrolling = false;
      }
  
      return scrolling; // true if “fast scroll” is active
    };
  }
  