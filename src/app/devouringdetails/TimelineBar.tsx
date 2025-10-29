
import {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
} from "react";
import { isNearScrollBar, nearThreshold } from "./utils";

export type BarForwardedHandle = {
    onScroll: (scrollY: number, isSlow: boolean) => void;
};

type BarProps = {
    size: "long" | "short";
    index: number;
    top: number;
};


const Bar = forwardRef<BarForwardedHandle, BarProps>(({ size, index, top }, ref) => {
    const barRef = useRef<HTMLDivElement>(null);
    const resetTimeOutRef = useRef<any>(null);

    const handleScroll = useCallback((scrollY: number, isSlow: boolean) => {
        if (!barRef.current) return;
    
        const { shouldExpand, diff } = isNearScrollBar(scrollY, top);
    
        if (shouldExpand) {
            if (resetTimeOutRef.current) {
                clearTimeout(resetTimeOutRef.current);
            }
    
            // Flip the scale logic: closer => bigger
            console.log({isSlow})
            const proximity = Math.max(0,  1-diff / nearThreshold); // 1 when closest, 0 when far
            const scale = 1 + proximity * 0.4; // max scale = 1.4
    
            barRef.current.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
            barRef.current.style.transform = `scaleX(${scale})`;
    
            resetTimeOutRef.current = setTimeout(() => {
                if (!barRef.current) return;
                barRef.current.style.transition = "transform 5s cubic-bezier(0.76, 0, 0.24, 1)";
                barRef.current.style.transform = "scaleX(1)";
            }, 250);
        }
    }, [top, resetTimeOutRef, barRef]);
    

    useImperativeHandle(ref, () => ({
        onScroll: handleScroll,
    }));

    const isLong = size === "long";

    return (
        <div
            ref={barRef}
            className={isLong ? "origin-left bg-[#171717]" : "bg-[#8f8f8f]"}
            style={{
                width: isLong ? "40px" : "24px",
                height: "1px",
                transformOrigin: "0px 0px",
                transform: "scaleX(1)",
                willChange: "transform",
            }}
        />
    );
});

export default Bar;
