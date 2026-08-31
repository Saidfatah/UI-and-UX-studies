import {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
} from "react";
import { gsap } from "gsap";

export type HeaderExpandingTextRef = {
    getHoverWidth: () => number;
    hide: () => void;
    reveal: () => void;
};

type Props = {
    href: string;
    setElementRef: (element: HTMLElement | null) => void;
    mainText: string;
    centerText: string;
    rightText?: string;
    onEnter?: (width: number) => void;
};

const HeaderExpandingText = forwardRef<HeaderExpandingTextRef, Props>(
    function HeaderExpandingText(
        {
            href,
            mainText,
            centerText,
            rightText,
            setElementRef
        },
        ref
    ) {
        const hoverTextRef = useRef<HTMLSpanElement>(null);

        const centerRef = useRef<HTMLSpanElement>(null);
        const rightRef = useRef<HTMLSpanElement>(null);

        const centerChars = centerText.split("");
        const rightChars = rightText?.split("") ?? [];

        const centerCharRefs = useRef<HTMLSpanElement[]>([]);
        const rightCharRefs = useRef<HTMLSpanElement[]>([]);

        const hoverWidthRef = useRef(0);

        const setCenterCharRef = (
            element: HTMLSpanElement | null,
            index: number
        ) => {
            if (element) {
                centerCharRefs.current[index] = element;
            }
        };

        const setRightCharRef = (
            element: HTMLSpanElement | null,
            index: number
        ) => {
            if (element) {
                rightCharRefs.current[index] = element;
            }
        };

        useLayoutEffect(() => {
            if (!hoverTextRef.current) return;

            const width = hoverTextRef.current.getBoundingClientRect().width;

            hoverWidthRef.current = width;
        }, []);

        const hide = useCallback(() => {
            hoverTextRef.current?.classList.add('pointer-events-none');

            const chars = [
                ...centerCharRefs.current,
                ...rightCharRefs.current,
            ];

            gsap.killTweensOf([
                centerRef.current,
                rightRef.current,
                ...chars,
            ]);

            // Hide wrappers immediately
            gsap.set(
                [centerRef.current, rightRef.current].filter(Boolean),
                {
                    opacity: 0,
                    duration: 0.15,
                }
            );

            gsap.to(
                chars,
                {
                    opacity: 0,
                    duration: 0.15,
                    ease: "power1.in",
                }
            );
        }, [centerCharRefs, rightCharRefs, centerRef, rightRef]);


        const reveal = useCallback(() => {
            hoverTextRef.current?.classList.remove('pointer-events-none');

            const chars = [
                ...centerCharRefs.current,
                ...rightCharRefs.current,
            ];

            const wrappers = [
                centerRef.current,
                rightRef.current,
            ].filter(Boolean);

            gsap.killTweensOf([
                ...wrappers,
                ...chars,
            ]);

            // Show the wrappers
            gsap.to(wrappers, {
                opacity: 1,
                duration: 0.4,
                ease: "power1.out",
            });
            // Start characters hidden
            gsap.set(chars, {
                opacity: 0,
            });

            console.log('reveal', chars);

            gsap.to(chars, {
                opacity: 1,
                duration: 0.4,
                stagger: 0.05,
                ease: "power1.out",
            });
        }, [centerCharRefs, rightCharRefs, centerRef, rightRef]);

        useImperativeHandle(ref, () => ({
            getHoverWidth() {
                return hoverWidthRef.current;
            },
            reveal,
            hide,
        }), [reveal, hide]);


        return (
            <div
                className="header-item-w pointer-events-none"
            >
                <a
                    ref={(element) => {
                        setElementRef(element);
                    }}
                    href={href}
                    className="header-item relative flex pointer-events-auto transition-opacity duration-smooth ease-out pr-[0.8rem] "
                    style={{
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transform: "translate(0px, 0px)",
                    }}
                >
                    <span className="header-item-left inline-block pointer-events-none">
                        {mainText}
                    </span>

                    <span
                        ref={hoverTextRef}
                        className="header-item-hover-text absolute top-0 left-[calc(100%-0.8rem)] flex gap-x-2 pl-2"
                    >
                        <span
                            ref={centerRef}
                            className="header-item-center pt-[7px] inline-block font-heading italic body-16 normal-case silvanaRegular whitespace-nowrap"
                            style={{
                                opacity: 0,
                            }}
                        >
                            {centerChars.map((char, index) => (
                                <span
                                    key={index}
                                    ref={(el) =>
                                        setCenterCharRef(el, index)
                                    }
                                    className="char"
                                    style={{
                                        opacity: 0,
                                        // visibility: "hidden",
                                    }}
                                >
                                    {char}
                                </span>
                            ))}
                        </span>

                        {rightText && (
                            <span
                                ref={rightRef}
                                className="header-item-right uppercase inline-block whitespace-nowrap !max-w-full"
                                style={{
                                    opacity: 0,
                                }}
                            >
                                {rightChars.map((char, index) => (
                                    <span
                                        key={index}
                                        ref={(el) =>
                                            setRightCharRef(el, index)
                                        }
                                        className="char"
                                        style={{
                                            opacity: 0,
                                            // visibility: "hidden",
                                        }}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </span>
                        )}
                    </span>
                </a>
            </div>
        );
    }
);

export default HeaderExpandingText;