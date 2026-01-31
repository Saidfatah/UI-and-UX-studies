import { useEffect, useRef } from "react";
import { setupHiDPICanvas } from "./utils";
import { polarToCartesian, valueToAngle } from "./math.utils";

type Props = { size: number };

const HOURS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function ClockFace({ size }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = setupHiDPICanvas(canvas, size, size);

    ctx.clearRect(0, 0, size, size);

    const center = size / 2;
    const radius = size * 0.38;

    ctx.font = "12px serif";
    ctx.fillStyle = "#111";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    HOURS.forEach(hour => {
      const angle = valueToAngle(hour % 12, 12);
      const { x, y } = polarToCartesian(angle, radius, center);

      ctx.fillText(String(hour), x, y);
    });
  }, [size]);

  return <canvas ref={ref} style={{ position: "absolute", inset: 0 }} />;
}
 

 