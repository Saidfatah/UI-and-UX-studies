import lerp from './lerp';

export default function damp(value: number, target: number, damping: number, delta: number): number {
  return lerp(1 - Math.exp(-damping * delta), value, target);
}
