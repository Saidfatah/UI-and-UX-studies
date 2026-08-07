"use client";

import clsx from "clsx";
import {
    animate,
    motion,
    useMotionValue,
    useMotionValueEvent,
    useTransform,
    type MotionValue,
} from "framer-motion";
import { useRef, useState, type RefObject } from "react";

import "./style.css";
import {
    getReorderShift,
    getTargetSlot,
    leftFlareClipPath,
    moveItem,
    rightFlareClipPath,
    scaleRadius,
} from "./utils";



type TabProps = {
    label: string;
    active: boolean;
    onClick: () => void;
    dragConstraints: RefObject<HTMLDivElement>;
    dragX?: MotionValue<number>;
    onDragEnd?: () => void;
    buttonRef?: RefObject<HTMLButtonElement>;
    leftFlareRadius?: MotionValue<number>;
    rightFlareRadius?: MotionValue<number>;
    leftFlareClip?: MotionValue<string>;
    rightFlareClip?: MotionValue<string>;
};

function Tab({ label, active, onClick, dragConstraints, dragX, onDragEnd, buttonRef, leftFlareRadius, rightFlareRadius, leftFlareClip, rightFlareClip }: TabProps) {
    return (
        <motion.button
            ref={buttonRef}
            onClick={onClick}
            drag={active ? "x" : false}
            dragConstraints={dragConstraints}
            dragElastic={0}
            dragMomentum={false}
            onDragEnd={onDragEnd}
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
    const [tabs, setTabs] = useState(TABS);
    const [activeTab, setActiveTab] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    const mainDivWidth = useRef(800);
    const currentTabWidth = 100;
    const TAB_GAP = 8; // matches the flex `gap-2` between tabs

    // One slot = a tab plus the gap after it. Dragging a full pitch swaps a tab
    // with its neighbor.
    const PITCH = currentTabWidth + TAB_GAP;

    const dragX = useMotionValue(0);

    // Which slot the dragged (active) tab currently hovers over. Non-dragged
    // tabs shift to make room for this slot while the drag is in progress.
    const [targetSlot, setTargetSlot] = useState(activeTab);

    // On commit the reordered array already puts each tab in its final slot, so
    // the leftover `animate x` shift must snap to 0 without sliding. This flag
    // makes that one frame instant.
    const [instantSnap, setInstantSnap] = useState(false);

    // Live-track the hovered slot as the active tab is dragged.
    useMotionValueEvent(dragX, "change", (x) => {
        setTargetSlot(getTargetSlot(activeTab, x, PITCH, tabs.length));
    });

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

    // On release: settle the dragged tab into its target slot, then commit the
    // reorder. The array reshuffle lands every tab in its final slot, so we flip
    // `instantSnap` for that frame to cancel the now-stale `animate x` shifts
    // without a visible jump.
    function handleDragEnd() {
        const to = getTargetSlot(activeTab, dragX.get(), PITCH, tabs.length);

        animate(dragX, (to - activeTab) * PITCH, {
            type: "spring",
            stiffness: 500,
            damping: 40,
            onComplete: () => {
                setInstantSnap(true);
                setTabs((prev) => moveItem(prev, activeTab, to));
                setActiveTab(to);
                setTargetSlot(to);
                dragX.set(0);
                requestAnimationFrame(() => setInstantSnap(false));
            },
        });
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-900">
            <div className="w-[800px]">

                {/* the tabs here */}
                <div className="flex gap-2 mb-0">
                    {tabs.map((label, index) => {
                        const active = index === activeTab;
                        // Non-dragged tabs slide aside to open the target slot.
                        // The active tab is driven by `dragX`, so its wrapper
                        // stays put.
                        const shift = active
                            ? 0
                            : getReorderShift(index, activeTab, targetSlot, PITCH);

                        return (
                            <motion.div
                                key={label}
                                animate={{ x: shift }}
                                transition={
                                    instantSnap
                                        ? { duration: 0 }
                                        : { type: "spring", stiffness: 500, damping: 40 }
                                }
                                style={{ zIndex: active ? 10 : 0 }}
                            >
                                <Tab
                                    label={label}
                                    active={active}
                                    onClick={() => {
                                        setActiveTab(index);
                                        setTargetSlot(index);
                                        dragX.set(0);
                                    }}
                                    dragConstraints={contentRef}
                                    dragX={dragX}
                                    onDragEnd={handleDragEnd}
                                    leftFlareRadius={leftFlareRadius}
                                    rightFlareRadius={rightFlareRadius}
                                    leftFlareClip={flareLeftClip}
                                    rightFlareClip={flareRightClip}
                                />
                            </motion.div>
                        );
                    })}
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
