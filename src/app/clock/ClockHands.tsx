import { useEffect, useRef } from "react";
import { setupHiDPICanvas } from "./utils";
import { drawHand, secondsHand } from "./drawing.utils";
import { timeToAngle } from "./math.utils";

type Props = {
  size: number;
  time: Date;
};

export default function ClockHands({ size, time }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = setupHiDPICanvas(canvas, size, size);
    const r = size / 2;

    ctx.clearRect(0, 0, size, size);
    ctx.translate(r, r);

    drawHand(ctx, timeToAngle(time, "hours"), r * 0.5, 3);
    drawHand(ctx, timeToAngle(time, "minutes"), r * 0.7, 2);
    drawHand(ctx, timeToAngle(time, "seconds"), r * 0.85, 1, "#d33");

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }, [time, size]);

  return <canvas ref={ref} style={{ position: "absolute", inset: 0 }} />;
}


