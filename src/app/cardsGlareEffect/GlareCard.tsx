'use client'
import { CardData } from "./types";
import clsx from "clsx";
import Glare from "./Glare";
import { useRef } from "react";
import { cards } from "./constants";

function GlareCard({ title, description, contributors, events, icon }: CardData) {
    const ref = useRef<HTMLDivElement>(null)

    return (<div className="rounded-2xl outline-offset-4 outline-white focus-visible:outline">
        <div ref={ref} className={
            clsx(
                "group relative cursor-pointer p-6",
                " overflow-hidden  ",
                "flex h-full w-full flex-col justify-between gap-8",
                "rounded-2xl border border-gray-600 bg-gray-800  ",
                "transition-colors hover:border-gray-500",
                "glare group-data-[glare=false]/body:!transition-colors group-data-[glare=false]/body:!delay-0 group-data-[glare=false]/body:!duration-150 group-data-[glare=false]/body:hover:bg-white/25 [&>.glare-inner>div]:hover:scale-[4] [&>.glare-inner>div]:hover:opacity-100"
            )
        } >
            <div>
                <div className="flex items-start justify-between">
                    <img
                        src={icon}
                        className="h-12 w-12 flex-none select-none rounded-lg"
                    />
                    <div className="flex gap-2">
                        <p className="inline-block whitespace-nowrap rounded-lg bg-gray-600 px-2 py-1 font-mono text-xs text-gray-200">{events[0]}</p>
                        {events.length > 1 && (
                            <p className="inline-block whitespace-nowrap rounded-lg bg-gray-600 px-2 py-1 font-mono text-xs text-gray-200">{events.length - 1}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <h5 className="font-semibold text-white">{title}</h5>
                    <p className="text-sm leading-relaxed text-gray-300">{description}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex -space-x-2 [&amp;>*]:border-2 [&amp;>*]:border-gray-800 [&amp;>*]:group-hover:border-gray-750">
                    {contributors.map((contributorIconSrc) => (
                        <div className="overflow-hidden rounded-md bg-gray-300 h-8 w-8">
                            <img
                                src={contributorIconSrc}
                                alt="Avatar"
                                className="block h-full w-full"
                            />
                        </div>
                    ))}
                </div>
                {contributors.length > 1 && (<p className="text-sm text-gray-300">{contributors.length} contributors</p>)}

            </div>

            <Glare parentRef={ref} />
        </div >
    </div>
    );
}

export default GlareCard;