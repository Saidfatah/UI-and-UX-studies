import { ReactNode } from "react"

export type Trigger = { icon: string, label: string }

export type Job = {
    icon: string,
    title: string,
    description: string
}
export type WorkflowStep = {
    title:string,
    event:string,
    stepIcon:ReactNode,
    jobs :Job[]
}

export interface WorkflowProgressRef {
    onProgress: (progress: number) => void;
}
export interface LeftSideForwardedRef {
    onProgress: (progress: number) => void;
    animateTriggers: (triggerId:string[]) => void;
}