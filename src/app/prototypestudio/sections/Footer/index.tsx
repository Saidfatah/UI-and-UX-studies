import { useLayoutEffect, useRef } from "react";
import ServicesTitlesAnimation from "../ServicesSection/ServicesTitlesAnimation";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap"

function Footer() {

    const footerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const section = footerRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const title1 = section.querySelector<HTMLElement>(".services-title");

            if (!title1) return;

            const split1 = new SplitText(
                title1, {
                type: "words,chars",
                wordsClass: "word",
                charsClass: "char",
                noBalance: true
            });

            const scroller = document.querySelector<HTMLElement>(".main");
            if (!scroller) return;

            const animation1 = new ServicesTitlesAnimation({
                chars: split1.chars as HTMLElement[],
                scrollTriggerElement: title1,
                scroller,
                direction: 1
            });




            return () => {
                animation1.destroy();
                split1.revert();
            };
        }, section);

        return () => ctx.revert();
    }, []);


    return (<footer
        ref={footerRef}
        className="footer border-t mt-200 overflow-hidden"
    >
        <div className="grid-w pt-10 pb-20 border-b-px">
            <div className="col-span-7 flex flex-col items-start gap-y-80">
                <div
                    className="services-title relative body-80 uppercase"
                    data-animation="titleChars"
                >
                    Let’s craft
                    <br />
                    your project together
                </div>

                <div className="button  button-contact  dark relative inline-flex gap-x-10 items-center silvanaRegular body-20 italic  cursor-pointer">
                    <span className="svg-wrapper w-[0.5rem] mt-[0.1rem] ">
                        <svg
                            width="5"
                            height="9"
                            viewBox="0 0 5 9"
                            fill="none" xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M5 4.5L0 0L0 9L5 4.5Z" fill="currentColor"></path>
                        </svg>
                    </span>
                    <span className="button-text">Contact us</span>
                </div>
            </div>
        </div>

        <div className="relative grid-w pb-container">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[87vw] h-[87vw] border rounded-full pointer-events-none" ></div>
            <svg className="absolute-full text-black/10 pointer-events-none">
                <line x1="0%" y1="100%" x2="100%" y2="0" stroke="currentCOLOR" stroke-width="1"></line>
            </svg>

            <div className="col-span-4 flex items-end pt-container h-full">
                <div className="footer-showreel group relative w-full h-full min-h-[29rem] cursor-pointer">
                    <div className="absolute-full overflow-hidden">
                        <video
                            data-src="https://www.prototypestudio.fr/wp-content/uploads/2025/03/Boucle_home_6Mo_compressed.mp4"
                            className="simple-video w-full h-full object-cover scale-[1.1] transition-transform duration-slow ease-out group-hover:scale-100"
                            loop
                            autoPlay
                            muted
                            playsInline
                            src="https://www.prototypestudio.fr/wp-content/uploads/2025/03/Boucle_home_6Mo_compressed.mp4"
                        />

                        <div className="absolute-full bg-black/30"></div>

                        <div className="absolute-center w-[11.5rem] h-[11.5rem] flex justify-center items-center opacity-0 scale-[1.3] transition-[transform,opacity] duration-slow ease-out group-hover:delay-75 group-hover:scale-100 group-hover:opacity-100">
                            <div className="svg-wrapper absolute-full text-white opacity-10">
                                <svg width="116" height="116" viewBox="0 0 116 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 58C1 89.4802 26.5198 115 58 115C89.4802 115 115 89.4802 115 58C115 26.5198 89.4802 1 58 1" stroke="currentColor"></path>
                                </svg>
                            </div>
                            <div className="absolute top-0 right-0 w-[300%] h-px bg-white/10"></div>
                            <div className="absolute left-0 bottom-0 w-[300%] h-px bg-white/10"></div>
                            <div className="absolute left-0 top-0 w-px h-[300%] bg-white/10"></div>
                            <div className="absolute right-0 bottom-0 w-px h-[300%] bg-white/10"></div>
                        </div>

                        <div className="absolute-center">
                            <div className="button light relative inline-flex gap-x-10 items-center silvanaRegular body-20 italic  text-white  cursor-pointer">
                                <span className="svg-wrapper w-[0.5rem] mt-[0.1rem] ">
                                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 4.5L0 0L0 9L5 4.5Z" fill="currentColor"></path>
                                    </svg>
                                </span>
                                <span className="button-text">Play</span>
                            </div>
                        </div>

                        <div className="absolute top-5 left-15 body-80 text-white z-1">Reel</div>

                        <div className="absolute bottom-15 right-15 body-80 text-white z-1">2025</div>
                    </div>
                </div>
            </div>

            <div className="col-span-4 flex flex-col justify-end items-end body-24 uppercase -mb-container border-l pb-container">
                <a
                    href="https://www.prototypestudio.fr/wp-content/uploads/2025/03/prototype_cgv.pdf"
                    target="_blank"
                    rel="noopener"
                    className="footer-secondary-item"
                >
                    CGV
                </a>
                <a
                    href="https://www.prototypestudio.fr/legals/"
                    className="footer-secondary-item"
                >
                    Legals
                </a>
                <a
                    href="https://beaucoup.studio/"
                    target="_blank"
                    rel="noopener"
                    className="footer-secondary-item"
                >
                    <span>Credits</span>
                </a>
            </div>

            <div className="footer-items list-o col-span-4 flex flex-col justify-end items-end gap-y-15">
                <a href="https://www.prototypestudio.fr/works" className="footer-item list-o-item body-120 !leading-[90%] uppercase">
                    <span className="pointer-events-none">Works</span>ﬂ
                </a>
                <a href="https://www.prototypestudio.fr/about/" className="footer-item list-o-item body-120 !leading-[90%] uppercase mt-[-2rem]">
                    <span className="pointer-events-none">About</span>
                </a>
                <div className="footer-item list-o-item button-contact body-120 !leading-[90%] uppercase cursor-pointer mt-[-2rem]">
                    <span className="pointer-events-none">Contact</span>
                </div>
            </div>

        </div>
    </footer>);
}

export default Footer;