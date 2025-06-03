import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { Trigger } from "./type";

export interface TriggerTagRef {
    onHighlight: (triggerId: string) => void;
}

const TriggerTag = forwardRef<TriggerTagRef, Trigger>(({ icon, label }, ref) => {
    const tagRef = useRef<HTMLDivElement>(null);

    
    const onHighlight = useCallback((triggerId: string) => {
        console.log({ label,triggerId })
        if (!tagRef.current) return;
        if (triggerId !== label) return;

        tagRef.current.style.background = 'rgb(255 255 255 / 0.3)';
        setTimeout(() => {
            tagRef.current!.style.background = 'rgb(255 255 255 / 0.1)';
        }, 250);
    }, [label]);

    useImperativeHandle(ref, () => ({
        onHighlight,
    }));

    return (
        <div
            key={label}
            ref={tagRef}
            className="tag flex gap-2.5 rounded-xl border text-white font-[300] border-white/10 bg-white/10 p-2 pr-2.5 transition-colors duration-300"
        >
            <img src={icon} className="h-6 w-6 select-none" />
            {label}
        </div>
    );
});

export default TriggerTag;
