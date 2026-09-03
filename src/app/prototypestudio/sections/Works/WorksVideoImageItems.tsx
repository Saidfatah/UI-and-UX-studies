"use client";

import { workItems } from "./works.utils";
import WorkItem from "./WorkItem";

function WorksVideoImageItems({ currentIndex, setHoveredIndex }: { currentIndex: number, setHoveredIndex: (index: number) => void }) {


    return (
        <div
            className={[
                "works-items flex flex-col gap-y-20",
                "col-start-5 col-end-9",
                "pt-[calc(50vh+2rem)]",
                "pb-[calc(50vh_-_var(--header-height)_/_2_-_(var(--column)_*_4_+_var(--padding-container)_*_3)_*_0.5572_/_2)]",
            ].join(" ")}
        >
            {workItems.map((item, index) => (
                <div
                    key={index}
                    data-work-index={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(-1)}
                >
                    <WorkItem
                        {...item}
                        active={currentIndex === index}
                    />
                </div>
            ))}
        </div>
    );
}

export default WorksVideoImageItems;