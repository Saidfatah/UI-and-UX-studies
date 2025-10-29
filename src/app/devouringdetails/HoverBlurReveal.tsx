"use client"
import { useRef } from "react";

function HoverReveal() {
    const ref = useRef<HTMLDivElement>()
    const buttonRef = useRef<HTMLDivElement>()
    const contentRef = useRef<HTMLDivElement>()

    const animateWidthToZero = () => {
        ref.current?.animate([
            {
                width: "400px",
                // right:"100%",
                borderRadius: "0px"
            },
            {
                width: "0",
                // right:"0%",
                borderRadius: "100%"
            },
        ], {
            duration: 2100,
            fill: "forwards",
            easing: "cubic-bezier(0.45, 0, 0.55, 1)",
        })

        contentRef.current?.animate([
            {
                width: "0%",
                filter: "blur(16px)"
            },
            {
                width: "400px",
                filter: "blur(0px)"
            },
        ], {
            duration: 2000,
            fill: "forwards",
            easing: "cubic-bezier(0.45, 0, 0.55, 1)",
        })
    }

    return (<div className="w-screen h-screen flex items-center justify-center">
        <div
            onMouseEnter={() => {
                animateWidthToZero()
            }}
            className="relative h-[70px] w-[400px] ">
            <div ref={ref as any} className="absolute origin-right bg-red-500 rounded-[0px]  bg-transparent w-[450px] h-[200px] backdrop-blur-lg z-[3] top-[-65px] right-0" />
            <div ref={contentRef as any} className=" blur-lg relative z-0 w-0 overflow-hidden">
                <div className="w-[400px] flex gap-[16px] items-center">
                    <div className="w-[16px] h-[16px] rounded-full bg-orange-600" />
                    <p className="text-[18px]">Attention To Details</p>
                    <button ref={buttonRef as any} className=" inline-block w-fit py-[4px] text-[14px] px-[12px] text-white rounded-[24px] bg-orange-600">
                        Register Now
                    </button>
                </div>
            </div>
        </div>
    </div>);
}

export default HoverReveal;