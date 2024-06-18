"use client"
import React, { useRef, useEffect, useState, ReactNode } from "react";
import clsx from "../../../node_modules/clsx/clsx";
import './moesySlider.css'
import RollingText from "./RollingText";
// https://mosey.com/

const HORIZONTAL_PADDING = 30
const FIRST_THIRD = 33
const SECOND_THIRD = 66
const THIRD_MARK_LENGTH = 0.5

const getStepText = (progress: number) => {
    if (progress >= 0 && progress < 33) {
        return "01";
    } else if (progress >= 33 && progress < 66) {
        return "02";
    } else {
        return "03";
    }
};


const animatePopup = (element: HTMLDivElement, className?: string, duration?: number) => {
    element.classList.remove(className ?? "popup");
    element.classList.add(className ?? "popup");
    setTimeout(() => {
        element.classList.remove(className ?? "popup");
    }, duration ?? 500); // Adjust the timeout to match the duration of your animation
}


const data = [
    {
        title: "Setup like a walk in the park",
        description: "Get guided through each area of state compliance and identify any gaps.",
        img: "https://images.unsplash.com/photo-1714745455071-9ebfecf55df8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Automate it away",
        description: "Use Mosey to register, embed notices, receive mail, and calculate your due dates.",
        img: "https://images.unsplash.com/photo-1706169940131-d81bb0013275?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Monitor like a pro",
        description: "Receive alerts when it’s time to take action on changes to your compliance.",
        img: "https://images.unsplash.com/photo-1687263809550-603ebc9b4970?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
]
function MoesySlider() {
    const loaderBarRef = useRef<HTMLDivElement>(null);
    const firstThirdRef = useRef<HTMLDivElement>(null);
    const stepDataRef = useRef<HTMLDivElement>(null);
    const secondThirdRef = useRef<HTMLDivElement>(null);
    const stepLabelRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [progress, setProgress] = useState(0);
    const [stepIndex, setStepIndex] = useState(0);


    useEffect(() => {
        let scrollStoppedTimeout: NodeJS.Timeout | undefined = undefined
        let wasInFirstThird = false
        let wasInSecondThird = false

        const getPercentage = () => {
            const scrollPosition = window.scrollY;
            // Update the width of the loader based on scroll percentage
            return (scrollPosition - (2 * 1000)) / (4000 - window.innerHeight) * 100
        }

        const scrollStopped = () => {
            scrollStoppedTimeout = setTimeout(function () {
                // api call here 
                const percentage = getPercentage()

                wasInFirstThird = false
                wasInSecondThird = false

                setProgress(percentage)
            }, 100);
        }

        const animateThirdMark = (element: HTMLDivElement) => {
            animatePopup(element)
        }

        const animateStepLabel = () => {
            animatePopup(stepLabelRef.current!)
        }

        const handleScroll = () => {
            clearTimeout(scrollStoppedTimeout)

            if (loaderBarRef.current && firstThirdRef.current && secondThirdRef.current) {
                const percentage = getPercentage()

                const isInFirstThirdMark = (percentage >= FIRST_THIRD && percentage < FIRST_THIRD + THIRD_MARK_LENGTH)
                const isInSecondThirdMark = (percentage >= SECOND_THIRD && percentage < SECOND_THIRD + THIRD_MARK_LENGTH)

                if (isInFirstThirdMark || isInSecondThirdMark) {
                    wasInFirstThird = isInFirstThirdMark && !isInSecondThirdMark
                    wasInSecondThird = !isInFirstThirdMark && isInSecondThirdMark

                    if (wasInFirstThird) {
                        animateThirdMark(firstThirdRef.current!);
                    }
                    if (wasInSecondThird) animateThirdMark(secondThirdRef.current!);

                    animatePopup(imageRef.current!, "subtlePopup")

                    animateStepLabel()

                    return
                } else {
                    setProgress(percentage)
                }

                scrollStopped()
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("scr", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [firstThirdRef, secondThirdRef, imageRef, stepDataRef, stepLabelRef, loaderBarRef]);

    useEffect(() => {
        if (progress < FIRST_THIRD) {
            setStepIndex(0)
        }
        if (progress > FIRST_THIRD && progress < SECOND_THIRD) {
            setStepIndex(1)
        }
        if (progress > SECOND_THIRD) {
            setStepIndex(2)
        }
    }, [progress]);

    return (
        <div  >
            <div className="bg-white h-[1000px] w-screen" >
                some content
            </div>

            <div className="bg-white h-[1000px] w-screen" >
                some content
            </div>

            <div className="relative h-[4000px] w-screen bg-[#285d60]">
                <div
                    className="sticky top-0 left-0 h-screen w-screen "
                    style={{
                        paddingRight: HORIZONTAL_PADDING,
                        paddingLeft: HORIZONTAL_PADDING
                    }}
                >
                    <div className="relative flex flex-col justify-between p-[24px] h-full w-full">

                        <div className="absolute  top-1/2 -translate-y-1/2  left-0 w-full h-[500px]">
                            <div className="relative w-full h-full" >
                                {/* <h3 className="absolute uppercase text-[60px] top-[-30px] left-[-20px]" >{step.title}</h3> */}
                                {/* <div className="absolute text-[16px] bottom-[30px] w-[500px] left-1/2 -translate-x-1/2 pl-[12px]">
                                    {/* <p className="text-[16px] font-light ">{step.description}</p> */}
                                {/* {
                                        stepIndex === 0 && (<RollingText key="title1" word={data[0].title} />)
                                    }
                                    {
                                        stepIndex === 1 && (<RollingText key="title2" word={data[1].title} />)
                                    }
                                    {
                                        stepIndex === 2 && (<RollingText key="title3" word={data[2].title} />)
                                    } */}
                                {/* </div> */}



                                <img
                                    style={{
                                        filter: stepIndex !== 0 ? 'blur(2px)' : '',
                                        opacity: stepIndex !== 0 ? 0.5 : 1

                                    }}
                                    className={clsx(
                                        "absolute left-[24px]  top-1/2 -translate-y-1/2   w-[calc(33%-24px)] h-auto  rounded-[24px]",
                                        stepIndex !== 0 && "skew-x-1"
                                    )}
                                    src={data[0].img}
                                />
                                <img
                                    style={{
                                        filter: stepIndex !== 1 ? 'blur(2px)' : '',
                                        opacity: stepIndex !== 1 ? 0.5 : 1

                                    }}
                                    className={clsx(
                                        "absolute left-1/2 -translate-x-1/2 z-[12] top-1/2 -translate-y-1/2  w-[calc(33%-24px)] h-auto  rounded-[24px]",
                                        stepIndex !== 1 && "skew-x-1"
                                    )}
                                    src={data[1].img}
                                />

                                <img
                                    ref={imageRef}
                                    style={{
                                        filter: stepIndex !== 2 ? 'blur(2px)' : '',
                                        opacity: stepIndex !== 2 ? 0.5 : 1

                                    }}
                                    className={clsx(
                                        "absolute right-[24px] top-1/2 -translate-y-1/2  w-[calc(33%-24px)] h-auto  z-[9] rounded-[24px]",
                                        stepIndex !== 2 && "skew-x-1"
                                    )}
                                    src={data[2].img}
                                />
                            </div>
                        </div>

                        <div className="flex" />
                        <div className="relative h-[1px] bg-[#e3e3e3]">
                            <div
                                ref={loaderBarRef}
                                style={{
                                    width: `${progress}%`,
                                    transitionSpeed: 0.1,

                                }}
                                className="relative h-[4px] translate-y-[-1.5px] rounded-full bg-white "
                            >
                                <div className="absolute text-[12px] top-[-10px] -translate-y-1/2 right-0">
                                    <p ref={stepLabelRef} className=" origin-bottom" >{getStepText(progress)}</p>
                                </div>
                            </div>

                            <div ref={firstThirdRef} className="absolute origin-bottom top-[-10px] left-[33%] h-[10px] w-[1px] bg-white "></div>
                            <div ref={secondThirdRef} className="absolute  origin-bottom  top-[-10px] left-[66%] h-[10px] w-[1px] bg-white "></div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default MoesySlider;
