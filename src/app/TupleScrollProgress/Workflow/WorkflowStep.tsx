import clsx from "clsx";
import { forwardRef, ReactNode, useCallback, useImperativeHandle, useRef, useState } from "react";
import ProgressCircle from "../ProgressCircle";
import { Job, WorkflowProgressRef } from "./type";
import WorkflowJobCard from "./WorkflowJobCard";



const WorkflowStep = forwardRef<WorkflowProgressRef, { event: string; title: string; jobs: Job[]; stepIcon: ReactNode, onActive: () => void }>(
    ({ event, title, jobs, stepIcon, onActive }, ref) => {
        const [isActive, setIsActive] = useState(false);
        const elementRef = useRef<HTMLDivElement>(null);

        const onProgress = useCallback((progress: number) => {
            if (!elementRef.current) return;

            const top = elementRef.current.offsetTop;
            const elementPaddingTop = parseFloat(getComputedStyle(elementRef.current).paddingTop) || 0;

            if (top <= progress - elementPaddingTop) {
                setIsActive(true);
                if (!isActive)
                    onActive && onActive()
            } else {
                setIsActive(false);
            }
        }, [isActive]);


        // Expose `onProgress` via ref
        useImperativeHandle(ref, () => ({
            onProgress,
        }));

        return (
            <div
                ref={elementRef}
                className={clsx(
                    "trigger border-r-red-400 h-fit group relative pl-0 pt-[4rem] pb-16 pr-4",
                    isActive && "active"
                )}
            >
                <ProgressCircle>{stepIcon}</ProgressCircle>

                <div className="ml-[1.5rem] overflow-hidden space-y-8 p-2 pr-8">
                    <div className="space-y-4">
                        <h4
                            className={clsx(
                                "text-xl font-semibold md:text-2xl text-white",
                                "transition-opacity duration-300",
                                "opacity-20 group-[.active]:opacity-100"
                            )}
                        >
                            {title}
                        </h4>
                        <p
                            className={clsx(
                                "inline-flex flex-wrap items-baseline gap-1.5 text-sm text-gray-300 shadow-sm",
                                "transition-opacity delay-150 duration-300 opacity-20 group-[.active]:opacity-100"
                            )}
                        >
                            <span className="rounded-lg border border-gray-500 bg-[#35353b] px-2 py-1 font-mono text-xs text-white">
                                {event}
                            </span>
                            <span className="font-light">event fires</span>
                        </p>
                    </div>
                    <div className="-m-2 mr-0 space-y-4 p-2 pr-16">
                        {jobs.map((job, index) => (
                            <WorkflowJobCard index={index} key={job.title} {...job} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
);

export default WorkflowStep;
