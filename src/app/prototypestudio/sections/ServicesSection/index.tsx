import { useLayoutEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import ServicesTitlesAnimation from "./ServicesTitlesAnimation";


function ServicesSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const title1 = section.querySelector<HTMLElement>(".services-title-1");
            const title2 = section.querySelector<HTMLElement>(".services-title-2");

            const servicesElements = section.querySelectorAll<HTMLElement>(".services-el");

            if (!title1 || !title2 || !servicesElements) return;

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


            // services elements scroll reveal animation 
            gsap.set(servicesElements, { autoAlpha: 0 })

            ScrollTrigger.create({
                trigger: section,
                scroller,
                start: "top 20%",
                once: true,
                animation: gsap.to(servicesElements, {
                    autoAlpha: 1,
                    ease: "power2.out",
                    duration: 1.2,
                    stagger: .04
                })
            })

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

            <div className="grid-w mt-50">
                <div className="col-start-5 col-end-7  flex items-baseline gap-x-[0.3rem]">
                    <span
                        className="services-el silvanaRegular body-18 italic"
                        style={{ opacity: 0 }}
                    >
                        01.
                    </span>

                    <div className="flex flex-col gap-y-10">
                        <h3 className="services-el body-28" style={{ opacity: 0 }}> Branding </h3>

                        <div className="flex flex-col gap-y-[0.2rem] text-gray body-24">
                            <div className="services-el" style={{ opacity: 0 }}>Art direction</div>
                            <div className="services-el" style={{ opacity: 0 }}>Brand Strategy</div>
                            <div className="services-el" style={{ opacity: 0 }}>Tone &amp; Voice</div>
                            <div className="services-el" style={{ opacity: 0 }}>Insights</div>
                            <div className="services-el" style={{ opacity: 0 }}>Content strategy</div>
                        </div>
                    </div>
                </div>

                <div className="col-start-7 col-end-9  flex items-baseline gap-x-[0.3rem]">
                    <span className="services-el silvanaRegular body-18 italic" style={{ opacity: 0 }} > 02. </span>

                    <div className="flex flex-col gap-y-10">
                        <h3 className="services-el body-28" style={{ opacity: 0 }} > Creative </h3>

                        <div className="flex flex-col gap-y-[0.2rem] text-gray body-24">
                            <div className="flex flex-col gap-y-[0.2rem] text-gray body-24">
                                <div className="services-el" style={{ opacity: 0 }}>Storytelling</div>
                                <div className="services-el" style={{ opacity: 0 }}>Copywriting</div>
                                <div className="services-el" style={{ opacity: 0 }}>Social media guidelines</div>
                                <div className="services-el" style={{ opacity: 0 }}>Photo + Video direction</div>
                                <div className="services-el" style={{ opacity: 0 }}>3D Visualisation</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="grid-w mt-50">
                <div className="col-start-9 col-end-11  flex items-baseline gap-x-[0.3rem]">
                    <span className="services-el silvanaRegular body-18 italic" style={{ opacity: 0 }}>03.</span>
                    <div className="flex flex-col gap-y-10">
                        <h3 className="services-el body-28" style={{ opacity: 0 }}>Production</h3>
                        <div className="flex flex-col gap-y-[0.2rem] text-gray body-24">
                            <div className="services-el" style={{ opacity: 0 }}>Scouting</div>
                            <div className="services-el" style={{ opacity: 0 }}>Production management</div>
                            <div className="services-el" style={{ opacity: 0 }}>Content creation</div>
                            <div className="services-el" style={{ opacity: 0 }}>Live action filming</div>
                            <div className="services-el" style={{ opacity: 0 }}>Experience</div>
                        </div>
                    </div>
                </div>

                <div className="col-start-11 col-end-13 flex items-baseline gap-x-[0.3rem]">
                    <span className="services-el silvanaRegular body-18 italic" style={{ opacity: 0 }}>04.</span>
                    <div className="flex flex-col gap-y-10">
                        <h3 className="services-el body-28" style={{ opacity: 0 }}>Post-production</h3>
                        <div className="flex flex-col gap-y-[0.2rem] text-gray body-24">
                            <div className="services-el" style={{ opacity: 0 }}>Editing</div>
                            <div className="services-el" style={{ opacity: 0 }}>2D/3D Animation</div>
                            <div className="services-el" style={{ opacity: 0 }}>Colorgrading</div>
                            <div className="services-el" style={{ opacity: 0 }}>Visual effect</div>
                            <div className="services-el" style={{ opacity: 0 }}>Finishing</div>
                        </div>
                    </div>
                </div>
            </div>


        </section>

    );
}

export default ServicesSection;
