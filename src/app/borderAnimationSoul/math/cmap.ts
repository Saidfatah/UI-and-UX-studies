import clamp from './clamp';
import map from './map';

export default function cmap(value: number, start1: number, stop1: number, start2: number, stop2: number): number {
  return clamp(map(value, start1, stop1, start2, stop2), Math.min(start2, stop2), Math.max(start2, stop2));
}
