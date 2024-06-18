"use client"
import React, { useEffect, useRef } from "react";
import './sigma.css'

const windowHeight = window.innerHeight
function SigmaCardStack() {
    const cardsParentRef = useRef<HTMLDivElement | undefined>()
    const secondCardRef = useRef<HTMLDivElement | undefined>()
    const thirdCardRef = useRef<HTMLDivElement | undefined>()
    const forthCardRef = useRef<HTMLDivElement | undefined>()

    useEffect(() => {
        if (!cardsParentRef.current) return

        let scrollStoppedTimeout: NodeJS.Timeout | undefined = undefined


        const scrollStopped = () => {
            scrollStoppedTimeout = setTimeout(function () {

            }, 100);
        }

        const getScrollRelativeToParent = () => {
            return Math.abs(window.scrollY - (cardsParentRef.current?.offsetTop ?? 0))
        }

        const handleScroll = () => {
            clearTimeout(scrollStoppedTimeout)

            const scrollPosition = getScrollRelativeToParent()
            console.log(scrollPosition)

            // second card 
            if (secondCardRef.current)
                secondCardRef.current.style.transform = `translate3d(0, ${(scrollPosition / windowHeight)}%, 0)`


            scrollStopped()
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("scr", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [cardsParentRef, secondCardRef, thirdCardRef, forthCardRef]);


    return (
        <div  >
            <div className="whiteSectionScreen" >
                some content
            </div>

            <div className="whiteSectionScreen" >
                some content
            </div>

            <div ref={cardsParentRef as any} className="relative h-[4000px] w-screen bg-[#285d60]">
                <div className="stick_to_top">
                    <div className="cards_container">
                        <div className="card"  >
                            <div>
                                1
                            </div>
                        </div>
                        <div ref={secondCardRef as any} className="card cardTranslate3d"  >
                            <div>
                                2
                            </div>
                        </div>
                        <div ref={thirdCardRef as any} className="card cardTranslate3d"  >
                            <div>
                                3
                            </div>
                        </div>
                        <div ref={forthCardRef as any} className="card cardTranslate3d"  >
                            <div>
                                4
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default SigmaCardStack;
