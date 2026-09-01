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
    rightFlareClipPath,
    scaleRadius,
} from "./utils";



type TabProps = {
    label: string;
    active: boolean;
    onClick: () => void;
    dragConstraints: RefObject<HTMLDivElement>;
    dragX?: MotionValue<number>;
    onDragStart?: () => void;
    onDragEnd?: () => void;
    buttonRef?: RefObject<HTMLButtonElement>;
    leftFlareRadius?: MotionValue<number>;
    rightFlareRadius?: MotionValue<number>;
    leftFlareClip?: MotionValue<string>;
    rightFlareClip?: MotionValue<string>;
};

function Tab({ label, active, onClick, dragConstraints, dragX, onDragStart, onDragEnd, buttonRef, leftFlareRadius, rightFlareRadius, leftFlareClip, rightFlareClip }: TabProps) {
    return (
        <motion.button
            ref={buttonRef}
            onClick={onClick}
            drag={active ? "x" : false}
            dragConstraints={dragConstraints}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={onDragStart}
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
    // tabs slide aside to open it while the drag is in progress.
    const [targetSlot, setTargetSlot] = useState(activeTab);

    // True only while the user is physically dragging. The snap-back animation
    // and dragX.set(0) on select also fire the change listener below; letting
    // them through would clobber `targetSlot`, so we only track a real drag.
    const isDraggingRef = useRef(false);

    // framer-motion fires a native `click` right after a drag. Without this
    // guard that click runs the active tab's onClick (dragX.set(0) + reset
    // targetSlot) and yanks the tab + neighbours back to their start — so the
    // snap never sticks. Set on drag end (pointerup, before the click).
    const didDragRef = useRef(false);

    // Live-track the hovered slot as the active tab is dragged.
    useMotionValueEvent(dragX, "change", (x) => {
        if (!isDraggingRef.current) return;
        setTargetSlot(getTargetSlot(activeTab, x, PITCH, TABS.length));
    });

    // Resting left offset of the active tab (its slot × pitch). `dragX` shifts
    // it from there. Lets the flares / corner radii reflect the tab's real
    // position, including when you just SELECT a tab without dragging.
    const tabBaseLeft = activeTab * PITCH;

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

    // On release: just snap the active tab onto its target slot by animating
    // `dragX` to that slot's offset. No commit, no reorder — the neighbours stay
    // where the preview left them and the active tab holds its snapped position.
    function handleDragEnd() {
        // Stop tracking before the snap animation runs so its change events
        // don't reset `targetSlot`.
        isDraggingRef.current = false;
        // Swallow the trailing click this drag will emit.
        didDragRef.current = true;

        const to = getTargetSlot(activeTab, dragX.get(), PITCH, TABS.length);

        animate(dragX, (to - activeTab) * PITCH, {
            type: "spring",
            stiffness: 500,
            damping: 40,
        });
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-900">
            <div className="w-[800px]">

                {/* the tabs here */}
                <div className="flex gap-2 mb-0">
                    {TABS.map((label, index) => {
                        const active = index === activeTab;
                        // The active tab's offset rides on `dragX`, so its wrapper
                        // stays put. Inactive tabs slide aside to open the hovered
                        // slot (a no-op when not dragging: targetSlot === activeTab).
                        const shift = active
                            ? 0
                            : getReorderShift(index, activeTab, targetSlot, PITCH);

                        return (
                            <motion.div
                                key={label}
                                animate={{ x: shift }}
                                transition={{ type: "spring", stiffness: 500, damping: 40 }}
                                style={{ zIndex: active ? 10 : 0 }}
                            >
                                <Tab
                                    label={label}
                                    active={active}
                                    onClick={() => {
                                        // Ignore the synthetic click emitted at
                                        // the end of a drag.
                                        if (didDragRef.current) {
                                            didDragRef.current = false;
                                            return;
                                        }
                                        setActiveTab(index);
                                        setTargetSlot(index);
                                        dragX.set(0);
                                    }}
                                    dragConstraints={contentRef}
                                    dragX={dragX}
                                    onDragStart={() => {
                                        isDraggingRef.current = true;
                                    }}
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
