"use client";

import clsx from "clsx";
import {
    motion,
    useMotionValue,
    useTransform,
    type MotionValue,
} from "framer-motion";
import { useLayoutEffect, useRef, useState, type RefObject } from "react";

import "./style.css";
import { leftFlareClipPath, rightFlareClipPath, scaleRadius } from "./utils";



type TabProps = {
    label: string;
    active: boolean;
    onClick: () => void;
    dragConstraints: RefObject<HTMLDivElement>;
    dragX?: MotionValue<number>;
    buttonRef?: RefObject<HTMLButtonElement>;
    leftFlareRadius?: MotionValue<number>;
    rightFlareRadius?: MotionValue<number>;
    leftFlareClip?: MotionValue<string>;
    rightFlareClip?: MotionValue<string>;
};

function Tab({ label, active, onClick, dragConstraints, dragX, buttonRef, leftFlareRadius, rightFlareRadius, leftFlareClip, rightFlareClip }: TabProps) {
    return (
        <motion.button
            ref={buttonRef}
            onClick={onClick}
            drag={active ? "x" : false}
            dragConstraints={dragConstraints}
            dragElastic={0}
            dragMomentum={false}
            style={active ? { x: dragX } : undefined}
            className={clsx(
                "text-sm font-medium transition-colors w-[100px]",
                "h-[36px] flex items-center",
                active && "relative z-10 cursor-grab active:cursor-grabbing",
            )}
        >
            <div
                className={clsx(
                    "tab w-full",
                    "px-[16px] rounded-[12px] flex items-center justify-center",
                    active && "relative h-full rounded-b-none bg-white text-black",
                    !active && "h-[28px] bg-white/20 text-white",
                )}


            >
                {label}
                {active && leftFlareRadius && leftFlareClip && (
                    <motion.span
                        aria-hidden
                        className="absolute bottom-[-0.25px] right-[calc(100%-0.5px)] pointer-events-none"
                        style={{
                            width: leftFlareRadius,
                            height: leftFlareRadius,
                            backgroundColor: "#ffffff",
                            clipPath: leftFlareClip,
                        }}
                    />
                )}
                {active && rightFlareClip && (
                    <motion.span
                        aria-hidden
                        className="absolute bottom-[-0.25px] left-[calc(100%-0.5px)] pointer-events-none"
                        style={{
                            width: rightFlareRadius,
                            height: rightFlareRadius,
                            backgroundColor: "#ffffff",
                            clipPath: rightFlareClip,
                        }}
                    />
                )}
            </div>
        </motion.button>
    );
}

const TABS = ["Tab 1", "Tab 2", "Tab 3"];

function BrowserTabsDrag() {
    const [activeTab, setActiveTab] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    const mainDivWidth = useRef(800);
    const currentTabWidth = 100;

    // Active tab horizontal drag distance -> radii.
    // Content corner and the tab flare open at different gains (1.5 vs 1.2).
    const dragX = useMotionValue(0);
    const invertDragX = useTransform(dragX, (x) => mainDivWidth.current - (x + currentTabWidth));


    const leftFlareRadius = useTransform(dragX, (x) => scaleRadius(x, 0.5, 12));
    const flareLeftClip = useTransform(leftFlareRadius, leftFlareClipPath);




    const rightFlareRadius = useTransform(invertDragX, (x) => scaleRadius(Math.abs(x), 0.5, 12));
    const flareRightClip = useTransform(rightFlareRadius, (r) => rightFlareClipPath(r, r));

    const contentTopLeftRadius = useTransform(dragX, (x) => scaleRadius(x, 0.5, 20));
    const contentTopRightRadius = useTransform(invertDragX, (x) => scaleRadius(Math.abs(x), 0.5, 20));
    console.log(dragX.get());

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-900">
            <div className="w-[800px]">

                {/* the tabs here */}
                <div className="flex gap-2 mb-0">
                    {TABS.map((label, index) => (
                        <div key={label} >
                            <Tab
                                key={label}
                                label={label}
                                active={index === activeTab}
                                onClick={() => setActiveTab(index)}
                                dragConstraints={contentRef}
                                dragX={dragX}
                                leftFlareRadius={leftFlareRadius}
                                rightFlareRadius={rightFlareRadius}
                                leftFlareClip={flareLeftClip}
                                rightFlareClip={flareRightClip}
                            />
                        </div>
                    ))}
                </div>

                {/* tab content */}
                <motion.div
                    ref={contentRef}
                    style={{
                        borderTopLeftRadius: contentTopLeftRadius,
                        borderTopRightRadius: contentTopRightRadius
                    }}
                    className="w-full h-[400px] bg-white rounded-lg"
                />

            </div>
        </div>
    );
}

export default BrowserTabsDrag;
