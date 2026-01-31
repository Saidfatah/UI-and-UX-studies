"use client"
import { useEffect, useState } from "react";
import ClockHands from "./ClockHands";
import ClockTicks from "./ClockTicks";
import FocusSessionSecondsTicks from "./FocusSessionSecondsTicks";
import FocusSessionMinutesTicks from "./FocusSessionMinutesTicks";
import FocusSessionHoursTicks from "./FocusSessionHoursTicks";
import FibonacciClockTicks from "./SpiralClockTicks";

type TheClockProps = {
  size?: number;
};

const focusSession = {
  createdAt: new Date(),
  minutes: 10, // 10 minutes focus session
  hours: 1,
  seconds: 0,
};

export default function TheClock({ size = 100 }: TheClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    let raf: number;

    const tick = () => {
      setTime(new Date());
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const sizeWithPadding = size + 10;

  return (
    <div
      style={{
        width: sizeWithPadding,
        height: sizeWithPadding,
      }}
      className="relative "
    // className="absolute top-[50px] left-[50px]"

    >

      {/* <div className="absolute top-[-10px] left-[-10px] border-[10px] border-black rounded-full w-[calc(100%_+_20px)] h-[calc(100%_+_20px)] "></div> */}

      {/* <FocusSessionMinutesTicks
          size={sizeWithPadding}
          time={time}
          minutes={focusSession.minutes}
          startTime={focusSession.createdAt}
        /> */}

      {/* <FocusSessionSecondsTicks
        size={sizeWithPadding}
        time={time}
      /> */}
      {/* <FocusSessionHoursTicks
          size={sizeWithPadding}
          time={time}
          hours={focusSession.hours}
          startTime={focusSession.createdAt}
        /> */}

      <FibonacciClockTicks size={sizeWithPadding} totalMinutes={120} />

      {/* <ClockTicks size={sizeWithPadding} /> */}
      <ClockHands size={sizeWithPadding} time={time} />
    </div>
  );
}
