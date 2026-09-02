export const remToPixel = (rem: number) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
