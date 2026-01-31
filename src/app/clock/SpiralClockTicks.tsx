import { useEffect, useRef } from "react";
import { setupHiDPICanvas } from "./utils";
import { spiralRadius, valueToAngle } from "./math.utils";
import { drawTick } from "./drawing.utils";

type Props = {
    size: number;
    totalMinutes?: number;
};

const TICK_LENGTH = 8;
const PADDING = 4;

export default function FibonacciClockTicks({
    size,
    totalMinutes = 70,
}: Props) {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const baseRadius = size * 0.18;
        const radiusStep = 0.1;

        const maxRadius = spiralRadius(
            totalMinutes - 1,
            baseRadius,
            radiusStep
        );

        const requiredRadius = maxRadius + TICK_LENGTH + PADDING;
        const canvasSize = Math.ceil(requiredRadius * 2);

        const canvas = ref.current!;
        const ctx = setupHiDPICanvas(canvas, canvasSize, canvasSize);

        ctx.clearRect(0, 0, canvasSize, canvasSize);

        const center = canvasSize / 2;

        for (let minute = 0; minute < totalMinutes; minute++) {
            const angle = valueToAngle(minute % 60, 60);
            const radius = spiralRadius(minute, baseRadius, radiusStep);

            drawTick(
                ctx,
                angle,
                radius,
                TICK_LENGTH,
                0.75,
                center,
                "rgba(0,0,0,0.25)"
            );
        }
    }, [size, totalMinutes]);

    return (
        <canvas
            ref={ref}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
                width: "100%",
                height: "100%",
            }}
        />
    );
}
