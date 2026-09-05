import { useLayoutEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap"
import ServicesTitlesAnimation from "./ServicesTitlesAnimation";

function ServicesSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const title1 = section.querySelector<HTMLElement>(".services-title-1");
            const title2 = section.querySelector<HTMLElement>(".services-title-2");

            if (!title1 || !title2) return;

            const split1 = new SplitText(title1, { type: "words,chars", wordsClass: "word", charsClass: "char", noBalance: true, });
            const split2 = new SplitText(title2, { type: "words,chars", wordsClass: "word", charsClass: "char", noBalance: true, });

            const scroller = document.querySelector<HTMLElement>(".main");
            if (!scroller) return;

            const animation1 = new ServicesTitlesAnimation({
                chars: split1.chars as HTMLElement[],
                scrollTriggerElement: title1,
                scroller,
                direction: 1
            });

            const animation2 = new ServicesTitlesAnimation({
                chars: split2.chars as HTMLElement[],
                scrollTriggerElement: title2,
                scroller,
                direction: -1
            });

            return () => {
                animation1.destroy();
                animation2.destroy();
                split1.revert();
                split2.revert();
            };
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="services my-100 overflow-hidden"
        >
            <div className="w-full flex flex-col gap-y-20 mb-60">
                <div className="grid-w">
                    <div className="col-start-8 col-end-13">
                        <div className="services-title-1 body-180 text-right uppercase">
                            OUR
                            <br />
                            SERVICES
                        </div>
                    </div>
                </div>

                <div className="grid-w">
                    <div className="col-span-5 ">
                        <div className="services-title-2 body-180 text-left uppercase">
                            AT YOUR
                            <br />
                            SERVICES
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ServicesSection;
