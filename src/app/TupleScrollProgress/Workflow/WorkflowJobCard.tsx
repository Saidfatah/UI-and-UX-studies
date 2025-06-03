import Glare from "@/app/cardsGlareEffect/Glare";
import clsx from "clsx";
import { useRef } from "react";
import { Job } from "./type";


const WorkflowJobCard = ({ icon, title, description, index }: Job & { index: number }) => {
    const ref = useRef<HTMLDivElement>(null)

    return (
        <div
            ref={ref}
            style={{
                '--delay': `${200 + (index * 150)}ms`
            }}
            className={clsx(
                "block translate-x-16 rounded-2xl  outline-offset-4 outline-white",
                "opacity-0",
                "group-[.active]:translate-x-0 group-[.active]:opacity-100 group-[.active]:delay-[var(--delay)]",
                // focus-visible handles accessability ,and enables users who navigate only using keyboard to experience website animations 
                "focus-visible:translate-x-0 focus-visible:opacity-100 focus-visible:outline focus-visible:!delay-0",

                "transition duration-500 ease-in-out"
            )}
        >
            <div className={clsx(
                "glare relative overflow-hidden  p-4 text-base",
                "flex flex-row gap-4",
                "rounded-2xl border border-gray-500 bg-[#35353b]",
                "[&amp;>.glare-inner>div]:hover:scale-[4] [&amp;>.glare-inner>div]:hover:opacity-100",
                "group-data-[glare=false]/body:!transition-colors group-data-[glare=false]/body:!delay-0 group-data-[glare=false]/body:!duration-150  group-data-[glare=false]/body:hover:bg-white/25 [&>.glare-inner>div]:hover:scale-[4] [&>.glare-inner>div]:hover:opacity-100",
            )}>
                <img
                    src={icon}
                    className="h-6 w-6 flex-none select-none sm:h-12 sm:w-12"
                />

                <div>
                    <h5 className="font-semibold text-white">{title}</h5>
                    <p className="text-gray-400">{description}</p>
                </div>

                <Glare parentRef={ref} />
            </div>
        </div>
    )
}

export default WorkflowJobCard;