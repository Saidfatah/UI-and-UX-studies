import { useEffect, useRef, useState } from "react";
import HomeCoverAnimation from "./HomeCoverAnimation";
import { initialStates } from "./cover.section.utils";


const CoverAnimatedContent = () => <div className="relative grid-w content-end h-full z-1">
    <div className="col-span-full flex justify-center mb-10">
        <h1 className="home-cover-title title">
            <p>
                <span className="line">
                    <span className="word">
                        {["C", "r", "e", "a", "t", "i", "v", "e"].map((char, i) => (
                            <span
                                key={i}
                                className="char"
                                style={initialStates.titleChars}
                            >
                                {char}
                            </span>
                        ))}
                    </span>

                    <span className="word">
                        {["h", "o", "u", "s", "e"].map((char, i) => (
                            <span
                                key={i}
                                className="char"
                                style={initialStates.titleChars}
                            >
                                {char}
                            </span>
                        ))}
                    </span>
                </span>
            </p>

            <p>
                <span className="line" />

                <span className="line">
                    <em>
                        <span className="word">
                            {["f", "o", "r"].map((char, i) => (
                                <span
                                    key={i}
                                    className="char"
                                    style={initialStates.titleChars}
                                >
                                    {char}
                                </span>
                            ))}
                        </span>
                    </em>
                </span>

                <span className="line">
                    <span className="word">
                        {["d", "a", "r", "i", "n", "g"].map((char, i) => (
                            <span
                                key={i}
                                className="char"
                                style={initialStates.titleChars}
                            >
                                {char}
                            </span>
                        ))}
                    </span>

                    <span className="word">
                        {["b", "r", "a", "n", "d", "s"].map((char, i) => (
                            <span
                                key={i}
                                className="char"
                                style={initialStates.titleChars}
                            >
                                {char}
                            </span>
                        ))}
                    </span>
                </span>
            </p>
        </h1>
    </div>

    <div
        style={initialStates.divider}
        className="home-cover-line col-span-full h-px bg-white/25 origin-center"
    />

    <div className="col-span-full flex justify-center mt-15">
        <div className="home-cover-scroll body-20 italic font-heading cursor-pointer">
            <span style={initialStates.scrollText} className="char">S</span>
            <span style={initialStates.scrollText} className="char">c</span>
            <span style={initialStates.scrollText} className="char">r</span>
            <span style={initialStates.scrollText} className="char">o</span>
            <span style={initialStates.scrollText} className="char">l</span>
            <span style={initialStates.scrollText} className="char">l</span>
        </div>
    </div>
</div>

function HomeCoverSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const animationRef = useRef<HomeCoverAnimation | null>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const animation = new HomeCoverAnimation(sectionRef.current);

        animation.init();

        animationRef.current = animation;

        const handleAppear = () => {
            animation.appear();
        };

        window.addEventListener("covertitle:appear", handleAppear);

        return () => {
            window.removeEventListener("covertitle:appear", handleAppear);
            animation.destroy();
            animationRef.current = null;
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="home-cover relative w-full h-screen pb-15 text-white overflow-hidden"
        >

            <div className="home-cover-background absolute-full">
                <video
                    src="/videos/prorotype_showreel_loop.mp4"
                    className="home-cover-video w-full h-full object-cover"
                    loop
                    autoPlay
                    muted
                    playsInline
                />

                <div className="absolute-full bg-black/30" />
            </div>
            <CoverAnimatedContent />
        </section>
    );
}

export default HomeCoverSection;