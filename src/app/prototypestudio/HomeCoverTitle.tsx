import { useEffect, useRef } from "react";
import gsap from "gsap";

const charsIntialState = {
    transform: "rotateY(70deg) translateX(5rem)",
    opacity: 0,
};

function revealSequence(
    lines: (HTMLElement | null)[],
    firstLineChars: (HTMLElement | null)[],
    remainingChars: (HTMLElement | null)[]
) {
    const [firstLine, secondLine, thirdLine] = lines;

    if (!firstLine || !secondLine) return;

    const referenceLine = thirdLine || secondLine;

    if (!referenceLine) return;

    const rem = parseFloat(
        getComputedStyle(document.documentElement).fontSize
    );

    const lineOffset = referenceLine.offsetHeight - rem * 2;

    gsap.set(lines, {
        y: lineOffset,
    });

    gsap.set([...firstLineChars, ...remainingChars], {
        x: "5rem",
        rotateY: 70,
        opacity: 0,
    });

    const tl = gsap.timeline();

    tl.to(firstLineChars, {
        opacity: 1,
        duration: 0.4,
        stagger: 0.03,
        ease: "beaucoup.alpha",
    }, 0)

        .to(firstLineChars, {
            x: 0,
            rotateY: 0,
            duration: 1.25,
            stagger: 0.03,
            ease: "expo.out",
        }, "<")

        .fromTo(firstLine,
            {
                y: lineOffset,
            },
            {
                y: 0,
                duration: 1.2,
                ease: "beaucoup.inOut",
            },
            "<40%"
        )

        .to(remainingChars, {
            opacity: 1,
            duration: 0.4,
            stagger: 0.03,
            ease: "beaucoup.alpha",
        }, "<")

        .to(remainingChars, {
            x: 0,
            rotateY: 0,
            duration: 1.25,
            stagger: 0.03,
            ease: "expo.out",
        }, "<")

        .to(lines, {
            y: 0,
            duration: 1.2,
            ease: "beaucoup.inOut",
        }, "<");

    return tl;
}

function HomeCoverTitle() {
    
    const lineRefs = useRef<(HTMLElement | null)[]>([null, null, null]);
    const firstLineCharRefs = useRef<(HTMLElement | null)[]>([]);
    const remainingCharRefs = useRef<(HTMLElement | null)[]>([]);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!titleRef.current) return;

        const tl = revealSequence(lineRefs.current, firstLineCharRefs.current, remainingCharRefs.current);

        return () => {
            tl?.kill();
        };
    }, []);

    return (
        <h1 ref={titleRef} className="home-cover-title title">
            <p>
                <span
                    ref={(el) => {
                        if (el) lineRefs.current[0] = el;
                    }}
                    className="line">
                    <span
                        className="word"
                        style={{ display: "inline-block" }}
                    >
                        {["C", "r", "e", "a", "t", "i", "v", "e"].map((char, index) => (
                            <span
                                style={charsIntialState}
                                key={index}
                                ref={(el) => {
                                    if (el) firstLineCharRefs.current.push(el);
                                }}
                                className="char">{char}</span>
                        ))}

                    </span>
                    <span
                        className="word"
                        style={{ display: "inline-block" }}
                    >
                        {["h", "o", "u", "s", "e"].map((char, index) => (
                            <span
                                style={charsIntialState}
                                key={index}
                                ref={(el) => {
                                    if (el) firstLineCharRefs.current.push(el);
                                }}
                                className="char">{char}</span>
                        ))}
                    </span>
                </span>
            </p>

            <p>
                <span
                    ref={(el) => {
                        if (el) lineRefs.current[1] = el;
                    }}
                    className="line"
                ></span>
                <span
                    ref={(el) => {
                        if (el) lineRefs.current[1] = el;
                    }}
                    className="line"
                >
                    <em>
                        <span
                            className="word"
                            style={{ display: "inline-block" }}
                        >
                            {
                                ["f", "o", "r"].map((char, index) => (
                                    <span
                                        style={charsIntialState}
                                        key={index}
                                        ref={(el) => {
                                            if (el) remainingCharRefs.current.push(el);
                                        }}
                                        className="char"
                                    >
                                        {char}
                                    </span>
                                ))
                            }
                        </span>
                    </em>
                </span>

                <span
                    ref={(el) => {
                        if (el) lineRefs.current[2] = el;
                    }}
                    className="line"
                >
                    <span
                        className="word"
                        style={{ display: "inline-block" }}
                    >
                        {
                            ["d", "a", "r", "i", "n", "g"].map((char, index) => (
                                <span
                                    style={charsIntialState}
                                    key={index}
                                    ref={(el) => {
                                        if (el) remainingCharRefs.current.push(el);
                                    }}
                                    className="char"
                                >
                                    {char}
                                </span>
                            ))
                        }
                    </span>
                    <span className="word">
                        {
                            ["b", "r", "a", "n", "d", "s"].map((char, index) => (
                                <span
                                    style={charsIntialState}
                                    key={index}
                                    ref={(el) => {
                                        if (el) remainingCharRefs.current.push(el);
                                    }}
                                    className="char"
                                >
                                    {char}
                                </span>
                            ))
                        }

                    </span>
                </span>
            </p>
        </h1>
    );
}

export default HomeCoverTitle;