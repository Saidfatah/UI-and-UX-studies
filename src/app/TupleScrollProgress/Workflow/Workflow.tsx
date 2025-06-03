import { useRef } from "react";
import { JoinIcon, LeaveIcon, PhoneIcon } from "../icons";
import { LeftSideForwardedRef, WorkflowProgressRef } from "./type";
import useProgress from "./useProgress";
import WorkflowLeftSide from "./WorkflowLeftSide";
import WorkflowSteps from "./WorkflowSteps";

function Workflow() {
    const ref = useRef<HTMLDivElement>(null);
    const rightSideRef = useRef<WorkflowProgressRef>(null);
    const leftSideRef = useRef<LeftSideForwardedRef>(null);

    useProgress({
        parentRef: ref,
        onProgress: (progress) => {
            if (rightSideRef.current) {
                rightSideRef.current.onProgress(progress);
            }
            if (leftSideRef.current) {
                leftSideRef.current.onProgress(progress);
            }
        },
    });


    return (<div ref={ref} className="mx-auto grid gap-6 grid-cols-2">
        <WorkflowLeftSide
            ref={leftSideRef}
            workflowTitle="Developer workflow"
            workflowTitleClassName="text-[#67e8f9] bg-[#0891b24d]"
            title="Spin up your dev environment automatically"
            description="Fire up ngrok, boot your backend, and open your editor."
            triggers={[
                {
                    label: "iTerm2",
                    icon: "/images/glareCards/iterm-command.png"
                },
                {
                    label: "VSCode",
                    icon: "/images/glareCards/vscode.png"
                },
                {
                    label: "Slack",
                    icon: "/images/glareCards/slack.png"
                },
                {
                    label: "Git",
                    icon: "/images/glareCards/git-coauthors.png"
                },
            ]}
        />



        <WorkflowSteps
            ref={rightSideRef}
            onStepActive={(index) => {
                if (index === 0) {
                    leftSideRef.current?.animateTriggers(["iTerm2", "VSCode", "Slack"])
                }
                if (index === 1) {
                    leftSideRef.current?.animateTriggers(["Git"])
                }
                if (index === 2) {
                    leftSideRef.current?.animateTriggers(["Git"])
                }
            }}
            steps={[
                {
                    title: "Tuple call connects",
                    event: "call-connected",
                    stepIcon: (<PhoneIcon />),
                    jobs: [
                        {
                            icon: "/images/glareCards/iterm-command.png",
                            title: "iTerm2",
                            description: "Run `ngrok http 800`"
                        },
                        {
                            icon: "/images/glareCards/iterm-command.png",
                            title: "iTerm2",
                            description: "Run `ngrok http 800`"
                        },
                        {
                            icon: "/images/glareCards/vscode.png",
                            title: "VSCode",
                            description: "star app,open last project"
                        },
                        {
                            icon: "/images/glareCards/slack.png",
                            title: "Slack",
                            description: "Notify #engineering"
                        }
                    ],
                },
                {
                    title: "Participant joins",
                    event: "participant-joined",
                    stepIcon: (<JoinIcon />),
                    jobs: [
                        {
                            icon: "/images/glareCards/slack.png",
                            title: "Slack",
                            description: "Notify #engineering"

                        },
                        {
                            icon: "/images/glareCards/git-coauthors.png",
                            title: "Git",
                            description: "Add participant as co-author"
                        }
                    ],
                },
                {
                    title: "Participant leaves",
                    event: "participant-left",
                    stepIcon: (<LeaveIcon />),
                    jobs: [
                        {
                            icon: "/images/glareCards/git-coauthors.png",
                            title: "Git",
                            description: "Remove participant as co-author"
                        }
                    ],
                }

            ]}
        />

    </div>);
}

export default Workflow;