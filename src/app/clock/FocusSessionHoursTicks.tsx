
import { useEffect, useRef } from "react";
import { setupHiDPICanvas } from "./utils";
import { valueToAngle } from "./math.utils";
import { drawTick } from "./drawing.utils";

type Props = {
    size: number;
    time: Date;
    hours: number;
    startTime: Date;
};

const ACTIVE_COLOR = "#111";
const FADED_COLOR = "rgba(0,0,0,0.4)";
const TRANSPARENT_COLOR = "rgba(0,0,0,0.1)";

export default function FocusSessionHoursTicks({
    size,
    time,
    hours,
    startTime
}: Props) {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current!;
        const ctx = setupHiDPICanvas(canvas, size, size);

        ctx.clearRect(0, 0, size, size);

        const center = size / 2;
        const radius = size * 0.45;

        const startHour = startTime.getHours();
        const endHour = (startHour + hours) % 24; // hours-hour window

        for (let h = 0; h < 24; h++) {
            const angle = valueToAngle(h, 24);

            let color = TRANSPARENT_COLOR;

            if (h >= startHour && h <= endHour) {
                color = h > startHour ? ACTIVE_COLOR : FADED_COLOR;
            }

            if (h < startHour || h > endHour) {
                color = TRANSPARENT_COLOR;
            }

            drawTick(
                ctx,
                angle,
                radius,
                5,
                2,
                center,
                color
            );
        }
    }, [size, time, hours, startTime]);

    return <canvas  ref={ref} style={{ position: "absolute", inset: 0 }} />;
}
