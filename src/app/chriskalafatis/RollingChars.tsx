import { forwardRef, useImperativeHandle, useRef } from "react";
import clsx from "clsx";
import { charsSlideOutDelayIncrement, firstNameExitAnimationDuration, lastNameV2EnterAnimationDuration, collapseNameWordDuration } from "./animation.orchestration";


type RollingCharsProps = {
    word: string;
    showOnlyFirstCharOfHiddenWord: boolean,
    showFirstCharAndLastCharOfHiddenWord: boolean,
}
export type RollingCharsRef = {
    exitAnimation: () => void;
    enterAnimation: () => void;
    shrinkTheWidthToTheWidthOfFirstChar: () => void;
    slideLastCharToStartOfWord: () => void;
    scaleAnticipateAnimationFOLastChar: () => void;
    scaleAnticipateAnimationFirstChar: () => void;
}

const RollingChars = forwardRef<RollingCharsRef, RollingCharsProps>((props, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const hiddenWordRef = useRef<HTMLDivElement>(null);

    const exitAnimation = () => {
        const chars: HTMLSpanElement[] = Array.from(containerRef.current?.querySelectorAll('.intro_word--v1') || []);
        chars.forEach((char, index) => {
            char.animate([
                {
                    transform: `translate3d(0, 0, 0)`,
                },
                {
                    transform: `translate3d(0, -100%, 0)`,
                },
            ], {
                duration: firstNameExitAnimationDuration,
                fill: 'forwards',
                delay: index * charsSlideOutDelayIncrement * firstNameExitAnimationDuration,
                easing: "cubic-bezier(0.76, 0, 0.24, 1)",
            });
        });
    }

    const enterAnimation = () => {
        const lastnameV1Letters: HTMLSpanElement[] = Array.from(hiddenWordRef.current?.querySelectorAll('.intro_word--v2') || []);
        lastnameV1Letters.forEach((letter, index) => {
            letter.animate([
                {
                    transform: `translateY(100%)`,
                },
                {
                    transform: `translateY(0)`,
                },
            ], {
                duration: lastNameV2EnterAnimationDuration,
                fill: 'forwards',
                easing: "cubic-bezier(0.76, 0, 0.24, 1)",
                delay: index * charsSlideOutDelayIncrement * lastNameV2EnterAnimationDuration,
            });
        });
    }

    const shrinkTheWidthToTheWidthOfFirstChar = () => {
        const firstHiddenCharRef: HTMLSpanElement | null | undefined = containerRef.current?.querySelector('.intro_word--v2:first-child');
        if (!containerRef.current || !firstHiddenCharRef) return;

        const wordWidth = containerRef.current?.offsetWidth;
        const firstCharWidth = firstHiddenCharRef.offsetWidth;

        // now animate with of intro_word_last_name_last to the width of char S
        containerRef.current.animate([
            {
                width: `${wordWidth}px`,
            },
            {
                width: `${firstCharWidth}px`,
            },
        ], {
            duration: collapseNameWordDuration,
            easing: "cubic-bezier(0.83, 0, 0.17, 1)",
            fill: 'forwards',
        });

    }

    const slideLastCharToStartOfWord = () => {
        const firstHiddenCharRef: HTMLSpanElement | null | undefined = containerRef.current?.querySelector('.intro_word--v2:first-child');
        const lastHiddenCharRef: HTMLSpanElement | null | undefined = containerRef.current?.querySelector('.intro_word--v2:last-child');
        if (!containerRef.current || !lastHiddenCharRef || !firstHiddenCharRef) return;

        const wordWidth = containerRef.current?.offsetWidth;
        const firstCharWidth = firstHiddenCharRef.offsetWidth;

        lastHiddenCharRef.animate([
            {
                transform: `translateX(0)`,
            },
            {
                transform: `translateX(-${wordWidth - firstCharWidth}px)`,
            },
        ], {
            duration: collapseNameWordDuration,
            easing: "cubic-bezier(0.83, 0, 0.17, 1)",
            fill: 'forwards',
        });

    }

    const scaleAnticipateAnimationFOLastChar = () => {
        const lastHiddenCharRef: HTMLSpanElement | null | undefined = containerRef.current?.querySelector('.intro_word--v2:last-child');
        const scaleWrapper = lastHiddenCharRef?.querySelector('.scale-wrapper');
        if (!lastHiddenCharRef || !scaleWrapper) return;

        scaleWrapper.animate([
            {
                transform: `scaleX(1)`,
            },
            {
                transform: `scaleX(1.1)`,
            },
            {
                transform: `scaleX(1)`,
            },
        ], {
            duration: collapseNameWordDuration,
            easing: "cubic-bezier(0.33, 1, 0.68, 1)",
            fill: 'forwards',
        });
    }

    const scaleAnticipateAnimationFirstChar = () => {
        const firstHiddenCharRef: HTMLSpanElement | null | undefined = containerRef.current?.querySelector('.intro_word--v2:first-child');
        const scaleWrapper = firstHiddenCharRef?.querySelector('.scale-wrapper');
        if (!firstHiddenCharRef || !scaleWrapper) return;

        scaleWrapper.animate([
            {
                transform: `scaleX(1)`,
            },
            {
                transform: `scaleX(1.1)`,
            },
            {
                transform: `scaleX(1)`,
            },
        ], {
            duration: collapseNameWordDuration,
            easing: "cubic-bezier(0.33, 1, 0.68, 1)",
            fill: 'forwards',
        });
    }

    useImperativeHandle(ref, () => ({
        exitAnimation,
        enterAnimation,
        shrinkTheWidthToTheWidthOfFirstChar,
        slideLastCharToStartOfWord,
        scaleAnticipateAnimationFOLastChar,
        scaleAnticipateAnimationFirstChar,
    }));

    return (<div ref={containerRef} className=" grid place-items-start overflow-hidden">
        <div className={clsx("initially_shown characters_wrapper font_intro")}>
            {props.word.split('').map((char, index) => (
                <span key={index} className="intro_word--v1 inline-block" >{char}</span>
            ))}
        </div>
        <div ref={hiddenWordRef} className={clsx("hidden_word characters_wrapper font_intro")}>
            {props.word.split('').map((char, index) => (
                <span
                    key={index}
                    className={clsx(
                        "inline-block",
                        !props.showFirstCharAndLastCharOfHiddenWord && !props.showOnlyFirstCharOfHiddenWord && 'yolo',
                        props.showOnlyFirstCharOfHiddenWord && index !== 0 && 'yolo',
                        props.showFirstCharAndLastCharOfHiddenWord && (index !== 0 && index < props.word.length - 1) && 'yolo',
                        (props.showFirstCharAndLastCharOfHiddenWord || props.showOnlyFirstCharOfHiddenWord) && index === 0 && 'intro_word--v2',
                        props.showFirstCharAndLastCharOfHiddenWord && index === props.word.length - 1 && 'intro_word--v2',
                    )}
                >
                    <span className="scale-wrapper inline-block">{char}</span>
                </span>
            ))}
        </div>
    </div>);
})

export default RollingChars;

