import clsx from "clsx";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import TriggerTag, { TriggerTagRef } from "./TriggerTag";
import { LeftSideForwardedRef, Trigger } from "./type";

type Props = {
    triggers: Trigger[],
    title: string,
    description: string,
    workflowTitle: string,
    workflowTitleClassName: string
};

const WorkflowLeftSide = forwardRef<LeftSideForwardedRef, Props>(
    ({ triggers, title, description, workflowTitle, workflowTitleClassName }, ref) => {
        const triggersRef = useRef<HTMLDivElement>(null);
        const triggerRefs = useRef<{ ref: TriggerTagRef | null, label: string }[]>(triggers.map((trigger) => ({ ref: null, label: trigger.label }))); // Store multiple refs

        const animateTriggers = useCallback(async (triggerIds: string[]) => {
            for (let index = 0; index < triggerIds.length; index++) {
                setTimeout(() => {
                    const targetTriggerRef = triggerRefs.current.filter(trigger => trigger.label === triggerIds[index])[0].ref
                    targetTriggerRef?.onHighlight(triggerIds[index]);
                }, 250 + index * 150);
            }
        }, []);

        useImperativeHandle(ref, () => ({
            onProgress: () => { },
            animateTriggers
        }));

        return (
            <div className="relative pb-8 pt-12 pl-12 pr-24">
                <div className="sticky top-1/3 pb-16">
                    <div className="space-y-4">
                        <p className={clsx("inline-block rounded-full px-3 py-1 text-sm", workflowTitleClassName)}>
                            {workflowTitle}
                        </p>
                        <h3 className="text-3xl font-semibold leading-tight text-white">
                            {title}
                        </h3>
                        <p className="leading-relaxed text-gray-300 text-xl">
                            {description}
                        </p>
                    </div>

                    <div ref={triggersRef} className="flex flex-wrap gap-2 mt-8">
                        {triggers.map((trigger, index) => (
                            <TriggerTag
                                ref={(el) => {
                                    if (el) {
                                        triggerRefs.current[index].ref = el;
                                        triggerRefs.current[index].label = trigger.label;
                                    }
                                }}
                                key={trigger.label}
                                icon={trigger.icon}
                                label={trigger.label}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
);

export default WorkflowLeftSide;
