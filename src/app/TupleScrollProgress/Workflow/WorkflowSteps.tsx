import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { WorkflowProgressRef, WorkflowStep as WorkflowStepType } from "./type";
import WorkflowProgress from "./WorkflowProgress";
import WorkflowStep from "./WorkflowStep";

const WorkflowSteps = forwardRef<WorkflowProgressRef, { steps: WorkflowStepType[], onStepActive: (stepIndex: number) => void }>(
    ({ steps, onStepActive }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);

        const progressRef = useRef<WorkflowProgressRef>(null);
        const workflowStepRefs = useRef<WorkflowProgressRef[]>([]);

        const onProgress = useCallback((progress: number) => {
            if (progressRef.current) {
                progressRef.current.onProgress(progress);
            }

            workflowStepRefs.current.forEach((stepRef) => {
                if (stepRef) stepRef.onProgress(progress);
            });
        }, []);

        useImperativeHandle(ref, () => ({
            onProgress,
        }));

        return (
            <div ref={containerRef} className="workflow relative space-y-8 ml-0 pr-8">
                <WorkflowProgress ref={progressRef} />

                {steps.map((step, index) => (
                    <WorkflowStep
                        ref={(el) => {
                            if (el) workflowStepRefs.current[index] = el;
                        }}
                        onActive={() => {
                            onStepActive(index)
                        }}
                        key={step.title}
                        {...step}
                    />
                ))}
            </div>
        );
    }
);

export default WorkflowSteps;
