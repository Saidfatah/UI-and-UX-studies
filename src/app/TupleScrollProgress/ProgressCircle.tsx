import clsx from "clsx";
import { ReactNode } from "react";

function ProgressCircle({ children }: { children: ReactNode }) {
    return (
        <div className="absolute left-[-2.25rem] top-[3.9rem] flex h-12 w-12 z-[9] items-center justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className={clsx(
                    "absolute left-0 top-0 h-12 w-12 -rotate-90",
                    " fill-gray-900 stroke-gray-700 stroke-2 text-gray-700"
                )}
            >
                <circle cx="24" cy="24" r="23"> </circle>
                <circle cx="24" cy="24" r="23"
                    className={clsx(
                        "transition-all duration-500 ease-in-out fill-transparent",
                        "stroke-green-400 ",
                        "[stroke-dasharray:145px] [stroke-dashoffset:145px] group-[.active]:[stroke-dashoffset:0px]"
                    )}
                >
                </circle>
            </svg>

            <div className="relative opacity-20 grayscale transition duration-300 group-[.active]:opacity-100 group-[.active]:grayscale-0">
                {children}
            </div>
        </div>
    );
}

export default ProgressCircle;