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


    return (<footer ref={footerRef} className="footer border-t mt-200 overflow-hidden">
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
    </footer>);
}

export default Footer;