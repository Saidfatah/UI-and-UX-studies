import { useEffect, useRef } from "react";
import { setupHiDPICanvas } from "./utils";
import { valueToAngle } from "./math.utils";
import { drawTick } from "./drawing.utils";

type Props = {
  size: number;
};


export default function ClockTicks({ size }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = setupHiDPICanvas(canvas, size, size);

    ctx.clearRect(0, 0, size, size);
    ctx.strokeStyle = "#111";

    const center = size / 2;
    const radius = size * 0.48;

    for (let minute = 0; minute < 60; minute++) {
      const isHourTick = minute % 5 === 0;

      const angle = valueToAngle(minute, 60);

      drawTick(
        ctx,
        angle,
        radius,
        10,   // height
        isHourTick ? 1.5 : 0.75,   // width
        center,
        "rgba(0,0,0,0.2)"
      );
    }
  }, [size]);

  return <canvas ref={ref} style={{ position: "absolute", inset: 0 }} />;
}
