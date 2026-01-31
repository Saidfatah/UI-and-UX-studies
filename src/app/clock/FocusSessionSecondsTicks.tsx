import { useEffect, useRef } from "react";
import { setupHiDPICanvas } from "./utils";
import { valueToAngle } from "./math.utils";
import { drawTick } from "./drawing.utils";

type Props = {
  size: number;
  time: Date;
};

const ACTIVE_COLOR = "#111";
const FADED_COLOR = "rgba(0,0,0,0.15)";

export default function FocusSessionSecondsTicks({ size, time }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = setupHiDPICanvas(canvas, size, size);

    ctx.clearRect(0, 0, size, size);

    const center = size / 2;
    const radius = size * 0.32; // inner circle

    const seconds =
      time.getSeconds() + time.getMilliseconds() / 1000;

    for (let s = 0; s < 60; s++) {
      const angle = valueToAngle(s, 60);

      const hasPassed = s < seconds;

      drawTick(
        ctx,
        angle,
        radius,
        1,           // tick height
        1,           // tick width
        center,
        hasPassed ? FADED_COLOR : ACTIVE_COLOR
      );
    }
  }, [size, time]);

  return <canvas ref={ref} style={{ position: "absolute", inset: 0 }} />;
}
