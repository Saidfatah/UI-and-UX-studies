export default function modAbs(value: number, length: number): number {
  if (value < 0) {
    return length + (value % length);
  }
  return value % length;
}
