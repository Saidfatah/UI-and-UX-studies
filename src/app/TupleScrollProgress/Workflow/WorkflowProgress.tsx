import { forwardRef, useImperativeHandle, useRef, useCallback } from "react";
import { WorkflowProgressRef } from "./type";

const WorkflowProgress = forwardRef<WorkflowProgressRef>((_, ref) => {
    const lineRef = useRef<HTMLDivElement>(null);

    const onProgress = useCallback((progress: number) => {
        lineRef.current?.style.setProperty('--progress', `${progress}px`);
    }, [lineRef]);

    // Expose `onProgress` method via ref
    useImperativeHandle(ref, () => ({
        onProgress,
    }));

    return (
        <div className="absolute -left-[0.825rem] top-0 flex h-[calc(100%-2rem)] w-0.5 flex-col overflow-hidden bg-gray-700">
            <div
                ref={lineRef}
                style={{ '--progress': '0px' } as React.CSSProperties}
                className="absolute top-0 left-0 h-[var(--progress)] w-full rounded-full bg-green-500"
            />

            <div className="absolute top-0 h-24 w-full bg-gradient-to-b from-gray-950"></div>
            <div className="absolute bottom-0 h-24 w-full bg-gradient-to-t from-gray-950"></div>
        </div>
    );
});

export default WorkflowProgress;
