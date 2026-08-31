"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import HeaderExpandingText, {
    HeaderExpandingTextRef,
} from "../HeaderExpandingLink";


const items = [
    {
        href: "#",
        mainText: "Home",
        centerText: "Home",
        rightText: "Home",
    },
    {
        href: "#",
        mainText: "About",
        centerText: "About",
        rightText: "About",
    },
    {
        href: "#",
        mainText: "Contact",
        centerText: "Contact",
        rightText: "Contact",
    },
];

function Header() {
    const itemRefs = useRef<(HeaderExpandingTextRef | null)[]>([]);
    const itemElementsRefs = useRef<(HTMLElement | null)[]>([]);

    const handleEnter = (index: number) => {

        const width = itemRefs.current[index]?.getHoverWidth() ?? 0;

        const tl = gsap.timeline({
            defaults: {
                duration: 0.8,
                ease: "expo.out",
            },
        });

        items.forEach((_, i) => {
            if (i === index) return;

            const ref = itemRefs.current[i];
            const elementRef = itemElementsRefs.current[i];

            if (!ref || !elementRef) return;
            // Every item gets its new position
            tl.to(
                elementRef,
                {
                    x: i <= index ? -width : 0,
                },
                0
            );

            // Every non-hovered item hides its text
            ref.hide();
        });

        const ref = itemRefs.current[index];
        const elementRef = itemElementsRefs.current[index];

        if (!ref || !elementRef) return;

        // Hovered item reveals its characters
        tl.to(
            elementRef,
            {
                x: -width,
            },
            0
        );
        ref.reveal();
    };

    const handleLeave = () => {
        const tl = gsap.timeline({
            defaults: {
                duration: 0.8,
                ease: "expo.out",
            },
        });

        items.forEach((_, i) => {
            const ref = itemRefs.current[i];
            const elementRef = itemElementsRefs.current[i];

            if (!ref || !elementRef) return;

            tl.to(
                elementRef,
                {
                    x: 0,
                },
                0
            );

            ref.hide();
        });
    };

    return (
        <header
            className="deanGothic body-24 header fixed top-0 left-0 grid-w items-center w-full h-header border-b-px border-transparent z-header"
            style={{ '--menu-color': '#fff' } as React.CSSProperties}
        >
            <div className="col-span-2">
                <a
                    href="https://www.prototypestudio.fr"
                    aria-label="Home"
                    className="header-logo svg-wrapper block w-[13rem]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 874.9 96.7">
                        <path fill="currentColor" d="M64.8.4c24,0,37.6,5.1,37.6,30.5s-9,33.2-44.1,33.2-9.9,0-16,0c.2,6.2.6,11.6,1.1,16H0c.3-11.6.5-22.8.5-39.8S.3,11.7,0,.4h64.8ZM61.8,32.4c0-9.1-2.9-11.1-10.2-11.1s-6.4,0-10,0c0,7.9.1,15.2.1,22.1,2.5,0,5.6,0,9.2,0,8.3,0,10.9-2.6,10.9-11.2Z"></path>
                        <path fill="currentColor" d="M143.5,27.2c4-11.9,12.6-16.2,22.9-16.1,3.5,0,6.2.3,8.7.8-1,11.5-1.7,22.9-1.7,36-2.7-.8-5.5-1.4-9-1.4-8.1,0-11.4,3.4-11.4,12s.1,15.1.7,21.4h-44.6c.3-9.6.4-19.7.4-34.4s0-24.2-.4-33.8h34.5c-.3,5.3-.6,10-1,15.3l.9.2Z"></path>
                        <path fill="currentColor" d="M228.8,81.7c-36.1,0-51.2-11-51.2-37.4s17.1-34.2,51.2-34.2,52,7.1,52,34.2c0,26.4-15.8,37.4-52,37.4ZM229.1,32c-7,0-10.7,2.7-10.7,12.4s3.7,13,10.7,13,10.6-3.2,10.6-13-3.6-12.4-10.6-12.4Z"></path>
                        <path fill="currentColor" d="M331.2,44.7c0,4.6,2.2,6.3,12.1,6.3s15.4-.7,20.7-2c.4,8.8,1.5,20.2,2.8,29.3-10.2,1.8-21.7,2.9-35.7,2.9-31.9,0-40.6-10.2-40.6-26.4s.2-10.7.3-17.7h-6.6c.1-7.8.2-18.2,0-25.1h7.1c0-4.3-.1-8.4-.2-12,6.8.2,13.7.3,20.6.3s14.7,0,20.5-.3l-.4,12.2c12.8,0,24.9,0,33.5-.2-.3,8.4-.7,17.4-.6,26-5.3,0-18.8-.3-33.5-.5v7.2h0Z"></path>
                        <path fill="currentColor" d="M422,81.7c-36.1,0-51.2-11-51.2-37.4s17.1-34.2,51.2-34.2,52,7.1,52,34.2-15.8,37.4-52,37.4ZM422.2,32c-7,0-10.7,2.7-10.7,12.4s3.7,13,10.7,13,10.6-3.2,10.6-13c0-9.5-3.6-12.4-10.6-12.4Z"></path>
                        <path fill="currentColor" d="M524.3,44.7c0,4.6,2.2,6.3,12.1,6.3s15.4-.7,20.7-2c.4,8.8,1.5,20.2,2.8,29.3-10.2,1.8-21.7,2.9-35.7,2.9-31.9,0-40.6-10.2-40.6-26.4s.2-10.7.3-17.7h-6.6c0-7.8.2-18.2,0-25.1h7.1c0-4.3,0-8.4-.2-12,6.8.2,13.7.3,20.6.3s14.7,0,20.5-.3l-.4,12.2c12.8,0,24.9,0,33.5-.2-.3,8.4-.7,17.4-.6,26-5.3,0-18.8-.3-33.5-.5v7.2h0Z"></path>
                        <path fill="currentColor" d="M665.6,11.8c-3.6,9.9-12.3,41.8-16.8,54.6-7.1,21.6-18.3,30.3-47.4,30.3s-28.2-1.7-38.4-4.1c.7-4.1,3.2-20.3,3.5-24.6,8.3,2.8,21.7,4.6,31.6,4.6s10.7-1.7,12.5-5.9v-.3c-13.2,0-25.8,0-30.4,0-2.1-7.7-12.7-40.5-17.6-54.7h44.7c.5,4.4,2.5,15.1,4.8,25.2,1.3,6.1,2.4,11.7,3.5,16.4h1c1.1-4.7,2.2-10.3,3.5-16.4,2.2-10.2,4.2-21,4.8-25.2,0,0,40.7,0,40.7,0Z"></path>
                        <path fill="currentColor" d="M713.6,23.6c5.3-8.7,14.8-13.3,27.9-13.3,20.6,0,31.5,10,31.5,35.5s-10.9,35.7-31.5,35.7-24.6-5.7-28.2-12.4h-.7c0,3.2,0,6.5,0,10.5s.2,10.1.3,15.4h-42.4c.4-15.2.4-30.9.4-47s0-27-.3-36.1h42.3c0,2,0,4,0,6.3s0,3.4-.2,5.3h.9ZM711.9,56.6c2.4.6,5.4,1.1,8.9,1.1,7.3,0,10.4-3.5,10.4-13.3s-3-11.7-8.7-11.7-10.6,3.2-10.6,12.3v11.6h0Z"></path>
                        <path fill="currentColor" d="M874.3,55.4c1.2,17.2-4.7,26.6-47.6,26.6s-49.3-9.9-49.3-36.6,15.7-35.5,50.9-35.5,46.6,8.6,46.6,28.1-.4,9.9-.8,12.7c-9.8-.2-23.7-.2-35.8-.3-7.9,0-14.9,0-19.7,0,.5,10,3.3,13.1,9.9,13.1s8.2-2.7,8.2-8.3c3.4.2,10.5.4,18,.4,6.9.1,13.8,0,19.6-.3ZM837.2,38.1c0-8.1-2.2-10.8-8.6-10.8s-9.2,2.3-10,12.3c4.9,0,10.8.2,18.6,0v-1.6Z"></path>
                    </svg>    </a>
            </div>

            <div className="col-span-10 relative pointer-events-none">
                <div className="header-menu-inner w-full flex  justify-end gap-x-30 uppercase">
                    <div
                        onMouseLeave={handleLeave}
                        className="header-items flex"
                    >
                        <div onMouseEnter={() => handleEnter(0)}>
                            <HeaderExpandingText
                                setElementRef={(element) => {
                                    itemElementsRefs.current[0] = element;
                                }}
                                ref={(el) => {
                                    itemRefs.current[0] = el;
                                }}
                                href="#"
                                mainText="WORKS"
                                centerText="we've"
                                rightText="DONE"
                                onEnter={() => {
                                    handleEnter(0)
                                }
                                }
                            />
                        </div>

                        <div onMouseEnter={() => handleEnter(1)}>
                            <HeaderExpandingText
                                setElementRef={(element) => {
                                    itemElementsRefs.current[1] = element;
                                }}
                                ref={(el) => {
                                    itemRefs.current[1] = el;
                                }}
                                href="#"
                                mainText="ABOUT"
                                centerText="our"
                                rightText="BRAND"
                                onEnter={() => {
                                    handleEnter(1)
                                }
                                }
                            />
                        </div>

                        <div onMouseEnter={() => handleEnter(2)}>
                            <HeaderExpandingText
                                setElementRef={(element) => {
                                    itemElementsRefs.current[2] = element;
                                }}
                                ref={(el) => {
                                    itemRefs.current[2] = el;
                                }}
                                href="#"
                                mainText="CONTACT"
                                centerText="us"
                                onEnter={() => {
                                    handleEnter(2)
                                }
                                }
                            />
                        </div>
                    </div>

                    <div className="header-socials list-o flex justify-end gap-x-[0.2rem]">
                        <a 
                            href="https://www.instagram.com/__prototypestudio/" 
                            target="_blank" 
                            rel="noopener" 
                            className="list-o-item !transition-opacity !duration-smooth !ease-out"
                        >
                            IG
                        </a>
                        <span className="">/</span>
                        <a 
                            href="https://www.youtube.com/@prototypestudio8117" 
                            target="_blank" 
                            rel="noopener" 
                            className="list-o-item !transition-opacity !duration-smooth !ease-out"
                        >
                            YT
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;