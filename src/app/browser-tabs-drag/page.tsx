"use client";

import clsx from "clsx";
import {
    motion,
    useMotionValue,
    useTransform,
    type MotionValue,
} from "framer-motion";
import { useRef, useState, type RefObject } from "react";

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
    const TAB_GAP = 8; // matches the flex `gap-2` between tabs

    const dragX = useMotionValue(0);

    // Resting left offset of the active tab inside the row. The row and the
    // content both start at the wrapper's left edge, so this is also the tab's
    // offset inside the content. Lets the flares / corner radii reflect the
    // tab's real position when you just SELECT a tab without dragging.
    const tabBaseLeft = activeTab * (currentTabWidth + TAB_GAP);

    // Absolute distance from the tab's left / right edge to the content's
    // left / right edge; dragX shifts the tab from its base position.
    const leftDistance = useTransform(dragX, (x) => tabBaseLeft + x);
    const rightDistance = useTransform(dragX, (x) => mainDivWidth.current - (tabBaseLeft + x + currentTabWidth));

    const leftFlareRadius = useTransform(leftDistance, (d) => scaleRadius(d, 0.5, 12));
    const flareLeftClip = useTransform(leftFlareRadius, leftFlareClipPath);

    const rightFlareRadius = useTransform(rightDistance, (d) => scaleRadius(d, 0.5, 12));
    const flareRightClip = useTransform(rightFlareRadius, (r) => rightFlareClipPath(r, r));

    const contentTopLeftRadius = useTransform(leftDistance, (d) => scaleRadius(d, 0.5, 20));
    const contentTopRightRadius = useTransform(rightDistance, (d) => scaleRadius(d, 0.5, 20));

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
                                onClick={() => {
                                    setActiveTab(index);
                                    dragX.set(0);
                                }}
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
