import { useCallback, useEffect, useRef } from "react";
import Bar, { BarForwardedHandle } from "./TimelineBar";
import { createScrollSpeedTracker, gapBetweenBars } from "./utils";

const pattern = [
    "long",
    "short",
    "short",
    "short",
    "short",
    "short",
    "long",
    "short",
    "short",
    "short",
    "short",
    "short",
    "short",
    "long",
    "short",
    "short",
    "short",
    "short",
    "short",
    "short",
    "long",
    "short",
    "short",
    "short",
    "short",
    "short",
    "short",
    "long",
] as const;

var updateArrowBasedOnScrollSpeed = function (settings: any) {
    settings = settings || {};

    var lastPos: any, newPos: any, timer: any, delta: any,
        delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

    function clear() {
        lastPos = null;
        delta = 0;
    }

    clear();

    return function () {
        newPos = window.scrollY;
        if (lastPos != null) { // && newPos < maxScroll 
            delta = newPos - lastPos;
        }
        lastPos = newPos;
        clearTimeout(timer);
        timer = setTimeout(clear, delay);
        return delta;
    };
}

function TimelineWithScrollBar() {
    const timelineParentRef = useRef<HTMLDivElement>(null);
    const barsForwardedRefs = useRef<BarForwardedHandle[]>([]);
    const scrollLineRef = useRef<HTMLDivElement>(null);
    const triangleRef = useRef<HTMLDivElement>(null);
    const ticking = useRef(false);
    
    const prevScrollY = useRef<number>(0);
    const canCheckSpeed = useRef(true);
    const currentVelocity = useRef<number>(0);

    const calcVelocityOfScroll = useCallback((currentScroll: number, scrollableHeight: number) => {
        if (!canCheckSpeed.current) return currentVelocity.current;

        canCheckSpeed.current = false;

        const scrollSpeed = currentScroll - prevScrollY.current;
        const normalizedScrollSpeed = parseFloat((scrollSpeed / scrollableHeight).toFixed(2));

        
        setTimeout(() => {
            canCheckSpeed.current = true;
            prevScrollY.current = currentScroll;
        }, 250);

        
        currentVelocity.current = Math.max(0.2,normalizedScrollSpeed);

        return normalizedScrollSpeed;

    }, [prevScrollY, canCheckSpeed])

    useEffect(() => {
        if (!triangleRef.current) return;

        let lastTime = performance.now();

        const handleScroll = () => {
            if (ticking.current) return;
            ticking.current = true;

            requestAnimationFrame(() => {
                if (!timelineParentRef.current || !scrollLineRef.current || !triangleRef.current) {
                    ticking.current = false;
                    return;
                }

                const scrollY = window.scrollY;

                const scrollableHeight =
                    document.documentElement.scrollHeight - window.innerHeight;

                const percentageScrolled =
                    scrollableHeight > 0 ? scrollY / scrollableHeight : 0;

                const scrollMappedToTimeline = parseFloat(
                    (percentageScrolled * timelineParentRef.current.offsetHeight).toFixed(2)
                );

                // Move scroll line
                scrollLineRef.current.style.transform = `translateY(${scrollMappedToTimeline}px)`;

                // updateArrowBasedOnScrollSpeed(window.scrollY, scrollableHeight);                // Determine scroll direction (only update if changed)

                // Update bars
                const velocity = calcVelocityOfScroll(scrollY, scrollableHeight);
                console.log(velocity);
                barsForwardedRefs.current.forEach((bar) =>
                    bar?.onScroll(scrollMappedToTimeline,velocity > 0.15)
                );

                ticking.current = false;
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [updateArrowBasedOnScrollSpeed]);

    const setBarRef = (index: number) => (el: BarForwardedHandle | null) => {
        if (el) barsForwardedRefs.current[index] = el;
    };

    return (
        <div className="fixed top-1/2 -translate-y-1/2 translate-x-0 flex z-[3]">
            <div
                ref={timelineParentRef}
                aria-hidden="true"
                style={{ gap: gapBetweenBars }}
                className="flex flex-col mx-8"
            >
                {pattern.map((size, i) => (
                    <Bar
                        top={i * 8 + i * 1}
                        index={i}
                        key={i}
                        ref={setBarRef(i)}
                        size={size}
                    />
                ))}
            </div>

            <div
                ref={scrollLineRef}
                className="flex h-[1px] w-[100vw] bg-[#ff5800] absolute max-[960px]:left-0 left-8 pointer-events-none"
                style={{ transform: "translateY(0px)" }}
            >
                <div
                    ref={triangleRef}
                    className=" origin-center rotate-0 "
                    style={{
                        transition: "all 1.5s cubic-bezier(0.65, 0, 0.35, 1)",
                    }}
                >
                    <svg
                        width="10"
                        height="8"
                        viewBox="0 0 7 6"
                        fill="none"
                        className="translate-y-[-3px] -ml-4 -rotate-90 max-[960px]:hidden"
                    >
                        <path
                            d="M3.54688 6L0.515786 0.75L6.57796 0.75L3.54688 6Z"
                            fill="#ff5800"
                        />
                    </svg>
                </div>

                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-32 max-[640px]:right-10 font-mono uppercase h-6 w-fit px-2 text-[13px] flex items-center bg-[#ff5800] text-white whitespace-nowrap cursor-pointer pointer-events-auto"
                    href="https://buy.polar.sh/polar_cl_2KVi8scGfKIMCWktnFIv6NZtxcLvKkHVxjYSn0uS7pV"
                >
                    Register Now
                </a>
            </div>
        </div>
    );
}

export default TimelineWithScrollBar;
