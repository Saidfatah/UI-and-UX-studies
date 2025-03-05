'use client'
import clsx from "clsx";
import { useCallback, useRef, useState } from "react";
import "./guest.css"

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const buttonClassNames = "w-[56px] h-[56px] flex justify-center items-center rounded-full bg-slate-200 scale-100 hover:scale-[1.05] active:scale-[0.9]"
const activeButtonBg = "opacity-100"
const inactiveButtonBg = "opacity-50"

const avatarClassNames = "flex preserve-3d items-center justify-center w-[75px] h-[136px] shrink-0 image-container"
const avatarHiddenClassNames = "scale-[1.5] opacity-0 blur-[10px]"

const numberHiddenClassNames = "scale-[0.5] rotate-x-[-90deg] opacity-0 blur-[5px] "

const avatarContainerTransition = 'transform 0.4s cubic-bezier(0.87, 0, 0.13, 1)'
const numbersContainerTransition = 'transform 0.4s cubic-bezier(0.87, 0, 0.13, 1)'
const avatarTransition = 'all 0.3s cubic-bezier(0.68, -0.6, 0.4, 1.6)'
const numberTransition = 'all 0.3s cubic-bezier(0.68, -0.6, 0.32, 1.6)'
const buttonTransition = 'all 0.1s cubic-bezier(0.68, -0.6, 0.32, 1.6)'


function AddGuest() {
    const [counter, setCounter] = useState(1);
    const counterContainer = useRef<HTMLDivElement>(null);
    const guestAvatarsContainer = useRef<HTMLDivElement>(null);
    const counterNumbersContainer = useRef<HTMLDivElement>(null);

    const shakeAnimation = async () => {
        if (!counterContainer.current) return;
        counterContainer.current.animate(
            [
                { transform: "translateX(0)" },
                { transform: "translateX(-5px)" },
                { transform: "translateX(5px)" },
                { transform: "translateX(-5px)" },
                { transform: "translateX(5px)" },
                { transform: "translateX(0)" }
            ],
            { duration: 300, easing: "ease-in-out" }
        );
        await sleep(300);
    };

    const updateCount = useCallback(async (increment: number) => {
        if (increment === 1 && counter === 4) return await shakeAnimation();
        if (increment === -1 && counter === 1) return await shakeAnimation();
        if (!counterNumbersContainer.current) return await shakeAnimation();
        if (!guestAvatarsContainer.current) return await shakeAnimation();


        const newCounter = counter + increment
        const containerHeight = counterNumbersContainer.current.offsetHeight

        const activeChildren = counterNumbersContainer.current.childNodes[counter - 1] as HTMLSpanElement
        const nextActiveChildren = counterNumbersContainer.current.childNodes[newCounter - 1] as HTMLSpanElement

        activeChildren.style.opacity = "0"
        activeChildren.style.filter = "blur(5px)"
        activeChildren.style.transform = `scale(0.5) rotateX(${increment * 90}deg)`
        counterNumbersContainer.current.style.transform = `translateY(${-(newCounter - 1) * containerHeight}px)`
        nextActiveChildren.style.opacity = "1"
        nextActiveChildren.style.filter = "blur(0px)"
        nextActiveChildren.style.transform = `scale(1) rotateX(0deg)`



        guestAvatarsContainer.current.childNodes.forEach((avatarChild, index) => {
            if (index < newCounter) {
                (avatarChild as HTMLDataElement).style.opacity = "1";
                (avatarChild as HTMLDataElement).style.filter = "blur(0px)";
                (avatarChild as HTMLDataElement).style.transform = "scale(1) rotateY(0deg)"
            }
            if (index > newCounter - 1) {
                (avatarChild as HTMLDataElement).style.opacity = "0";
                (avatarChild as HTMLDataElement).style.filter = "blur(10px)";
                (avatarChild as HTMLDataElement).style.transform = "scale(1.5) rotateY(100deg)"
            }
        })

        const avatarWidth = (guestAvatarsContainer.current.childNodes[0] as HTMLDivElement).offsetWidth
        guestAvatarsContainer.current.style.transform = `translateX(${counter * (avatarWidth / 2)}px)`



        setCounter(newCounter);

    }, [counter, counterNumbersContainer, guestAvatarsContainer]);

    return (
        <>

            <div className="bg-white w-screen h-screen flex justify-center items-center relative">
                <div className=" relative z-[999] rounded-md bg-white w-[400px] gap-[2rem] flex flex-col items-center justify-between p-[32px]  border border-dashed border-slate-200 ">

                    <div className="flex flex-col items-center space-y-3">
                        <h3 className="text-2xl font-semibold">Guest</h3>
                        <p className="text-slate-500">
                            Add up to 4 people, including yourself.
                        </p>
                    </div>

                    <div
                        ref={guestAvatarsContainer}
                        style={{
                            transform: `translateX(${(4 - counter) * (75 / 2)}px)`,
                            transition: avatarContainerTransition

                        }}
                        className="flex items-center "
                    >
                        <div
                            style={{ transition: avatarTransition }}
                            className={clsx("opacity-1", avatarClassNames)}
                        >
                            <img src="/images/guest/image-1.png" className="w-[50px]" />
                        </div>
                        <div
                            style={{ transition: avatarTransition }}
                            className={clsx(avatarHiddenClassNames, avatarClassNames)}
                        >
                            <img src="/images/guest/image-2.png" className="w-[64px] translate-y-[4px]" />
                        </div>
                        <div
                            style={{ transition: avatarTransition }}
                            className={clsx(avatarHiddenClassNames, avatarClassNames)}
                        >
                            <img src="/images/guest/image-3.png" className="w-[47px] translate-y-[3px]" />
                        </div>
                        <div
                            style={{ transition: avatarTransition }}
                            className={clsx(avatarHiddenClassNames, avatarClassNames)}
                        >
                            <img src="/images/guest/image-4.png" className="w-[59px] translate-y-[6px]" />
                        </div>
                    </div>

                    <div ref={counterContainer} className=" h-[56px] flex justify-between">
                        <button
                            style={{ transition: numberTransition }}
                            onClick={() => updateCount(-1)}
                            className={clsx(buttonClassNames, counter > 1 ? activeButtonBg : inactiveButtonBg)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" stroke="#111" fill="#111" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em">
                                <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                            </svg>
                        </button>


                        <div className="overflow-hidden h-full mx-8 mt-[2px]">
                            <div
                                ref={counterNumbersContainer}
                                style={{ transition: numbersContainerTransition }}
                                className=" grid place-items-center grid-cols-[64px] grid-rows-[100%,100%,100%,100%] h-full  text-4xl">
                                <span style={{ transition: numberTransition }} className="text-center inline-block origin-center scale-1 col-span-full" >1</span>
                                <span style={{ transition: numberTransition }} className={clsx("text-center inline-block col-span-full ", numberHiddenClassNames)} >2</span>
                                <span style={{ transition: numberTransition }} className={clsx("text-center inline-block col-span-full ", numberHiddenClassNames)} >3</span>
                                <span style={{ transition: numberTransition }} className={clsx("text-center inline-block col-span-full ", numberHiddenClassNames)} ><span className="inline-block text-center translate-x-[-1px]">4</span></span>
                            </div>
                        </div>

                        <button
                            style={{ transition: buttonTransition }}
                            onClick={() => updateCount(1)}
                            className={clsx(buttonClassNames, counter < 4 ? activeButtonBg : inactiveButtonBg)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" stroke="#111" fill="#111" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em">
                                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                            </svg>
                        </button>
                    </div>


                </div>
            </div>
        </>
    );
}

export default AddGuest;