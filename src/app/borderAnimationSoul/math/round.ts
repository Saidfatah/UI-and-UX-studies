export default function round(value: number, precision = 4): number {
  return Number(value.toFixed(precision));
}
