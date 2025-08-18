// https://stackoverflow.com/a/466256
export default function nearestPowerOfTwo(value: number): number {
  return Math.pow(2, Math.ceil(Math.log(value) / Math.log(2)));
}
