type TimeUnit = "hours" | "minutes" | "seconds";

export function timeToAngle(time: Date, unit: TimeUnit) {
  const seconds = time.getSeconds() + time.getMilliseconds() / 1000;
  const minutes = time.getMinutes() + seconds / 60;
  const hours = (time.getHours() % 12) + minutes / 60;

  const value =
    unit === "hours" ? hours :
    unit === "minutes" ? minutes :
    seconds;

  const max =
    unit === "hours" ? 12 : 60;

  return valueToAngle(value, max);
}

export function valueToAngle(value: number, max: number) {
  return (value / max) * Math.PI * 2;
}

// converts angle in radians to cartesian coordinates (x, y) relative to center
// angle is expected in radians, 0 at 12 o'clock position (positive y going down)
export function polarToCartesian(
  angle: number,
  radius: number,
  center: number
) {
  return {
    x: center + Math.sin(angle) * radius,
    y: center - Math.cos(angle) * radius,
  };
}


export const GOLDEN_RATIO = 1.618;

export function spiralRadius(
  index: number,
  baseRadius: number,
  step: number
) {
  return baseRadius + index * step * GOLDEN_RATIO;
}