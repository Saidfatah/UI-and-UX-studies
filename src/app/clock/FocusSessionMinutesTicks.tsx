// import { useEffect, useRef } from "react";
// import { setupHiDPICanvas } from "./utils";
// import { valueToAngle } from "./math.utils";
// import { drawTick } from "./drawing.utils";

// type Props = {
//     size: number;
//     time: Date;
//     minutes: number;
//     startTime: Date;
// };

// const ACTIVE_COLOR = "#111";
// const FADED_COLOR = "rgba(0,0,0,0.15)";
// const TRANSPARENT_COLOR = "rgba(0,0,0,0)";

// export default function FocusSessionMinutesTicks({
//     size,
//     time,
//     minutes,
//     startTime
// }: Props) {
//     const ref = useRef<HTMLCanvasElement>(null);

//     useEffect(() => {
//         const canvas = ref.current!;
//         const ctx = setupHiDPICanvas(canvas, size, size);

//         ctx.clearRect(0, 0, size, size);

//         const center = size / 2;
//         const radius = size * 0.48;

//         const startMinute = startTime.getMinutes();
//         const endMinute = (startMinute + 5) % 60; // 5-minute window

//         for (let m = 0; m < 60; m++) {
//             const angle = valueToAngle(m, 60);

//             let color = TRANSPARENT_COLOR;

//             if (m >= startMinute && m <= endMinute) {
//                 color = m > startMinute ? ACTIVE_COLOR : FADED_COLOR;
//             }

//             if (m < startMinute || m > endMinute) {
//                 color = TRANSPARENT_COLOR;
//             }

//             drawTick(
//                 ctx,
//                 angle,
//                 radius,
//                 10,
//                 2,
//                 center,
//                 color
//             );
//         }
//     }, [size, time, minutes]);

//     return <canvas  ref={ref} style={{ position: "absolute", inset: 0 }} />;
// }

import { useEffect, useRef } from "react";
import { setupHiDPICanvas } from "./utils";
import { valueToAngle } from "./math.utils";
import { drawTick } from "./drawing.utils";

type Props = {
    size: number;
    time: Date;
    minutes: number;
    startTime: Date;
};

const ACTIVE_COLOR = "#111";
const FADED_COLOR = "rgba(0,0,0,0.4)";
const TRANSPARENT_COLOR = "rgba(0,0,0,0.1)";

export default function FocusSessionMinutesTicks({
    size,
    time,
    minutes,
    startTime
}: Props) {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current!;
        const ctx = setupHiDPICanvas(canvas, size, size);

        ctx.clearRect(0, 0, size, size);

        const center = size / 2;
        const radius = size * 0.25;

        const currentMinute = time.getMinutes();
        const startMinute = startTime.getMinutes();
        const endMinute = (startMinute + 5) % 60; // 5-minute window
        console.log({currentMinute, startMinute, endMinute});
        for (let m = 0; m < 60; m++) {
            const angle = valueToAngle(m, 60);

            let color = TRANSPARENT_COLOR;

            if (m >= startMinute && m <= endMinute) {
                color = currentMinute < m ? ACTIVE_COLOR : FADED_COLOR;
            }

            if (m < startMinute || m > endMinute) {
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
    }, [size, time, minutes]);

    return <canvas ref={ref} style={{ position: "absolute", inset: 0 }} />;
}
