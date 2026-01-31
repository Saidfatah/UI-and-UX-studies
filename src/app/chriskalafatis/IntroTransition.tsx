import { useEffect, useRef } from "react";
import IntroCurvedBackground, { IntroCurvedBackgroundRef } from "./IntroCurvedBackground";
import RollingChars, { RollingCharsRef } from "./RollingChars";
import { collapseNameWordDelay, collapseNameWordDuration, delayBeforeStartingTheCurvedBackgroundDrawerAnimation, firstWordsLifeTime, fullnameAbbreviationFadeOutDuration } from "./animation.orchestration";
import { sleep } from "./utils";


function IntroTransition() {
    const saidRollingCharsRef = useRef<RollingCharsRef>(null);
    const fatahRollingCharsRef = useRef<RollingCharsRef>(null);
    const fullNameRef = useRef<HTMLDivElement>(null);
    const firstNameWidthCalcRef = useRef<HTMLDivElement>(null);
    const lastNameWidthCalcRef = useRef<HTMLDivElement>(null);

    const introCurvedBackgroundRef = useRef<IntroCurvedBackgroundRef>(null);


    const theSlideTheInitialsTowardsEachOther = async () => {
        if (!fullNameRef.current) return;
        if (!introCurvedBackgroundRef.current) return;

        // now animate with of said to the width of char S
        saidRollingCharsRef.current?.scaleAnticipateAnimationFirstChar();
        saidRollingCharsRef.current?.shrinkTheWidthToTheWidthOfFirstChar();

        // and animate fatah to the width of teh character F 
        fatahRollingCharsRef.current?.scaleAnticipateAnimationFirstChar();
        fatahRollingCharsRef.current?.shrinkTheWidthToTheWidthOfFirstChar();

        // by shrinking teh width of both intro_word_last_name_last and intro_word_last_name_last 
        // the char S and F will appear as they are sliding towards each other to collide

        // now what's left is to translate the dot in intro_word_last_name_last to teh left towards char F to tie the animation
        // we will translate it by the width of the lastname - the width of the char F

        // teh scale anticipate animation make animation feeling natural
        fatahRollingCharsRef.current?.scaleAnticipateAnimationFOLastChar();
        fatahRollingCharsRef.current?.slideLastCharToStartOfWord();

        // to finish the collision we will shrink teh gap between the two words
        fullNameRef.current?.animate([
            {
                gap: `32px`,
            },
            {
                gap: `0px`,
            },
        ], {
            duration: collapseNameWordDuration / 2,
            easing: "cubic-bezier(0.87, 0, 0.13, 1)",
            fill: 'forwards',
        });

        // fade out the words now 
        fullNameRef.current.animate([
            {
                opacity: "1",
            },
            {
                opacity: "0",
            },
        ], {
            duration: collapseNameWordDuration,
            delay: collapseNameWordDuration,
            easing: "cubic-bezier(0.83, 0, 0.17, 1)",
            fill: 'forwards',
        })

        await sleep(delayBeforeStartingTheCurvedBackgroundDrawerAnimation);
        introCurvedBackgroundRef.current?.startAnimation();


        fullNameRef.current?.animate([
            {
                opacity: `1`,
            },
            {
                opacity: `0`,
            },
        ], {
            duration: fullnameAbbreviationFadeOutDuration,
            easing: "cubic-bezier(0.83, 0, 0.17, 1)",
            fill: 'forwards',
        });
    }

    const theFinalCut = async () => {
        await sleep(firstWordsLifeTime * 1000);
        saidRollingCharsRef.current?.exitAnimation();
        fatahRollingCharsRef.current?.exitAnimation();
        // await sleep(250);
        saidRollingCharsRef.current?.enterAnimation();
        fatahRollingCharsRef.current?.enterAnimation();

        await sleep(collapseNameWordDelay);
        theSlideTheInitialsTowardsEachOther();
    }

    useEffect(() => {
        theFinalCut();
    }, []);



    return (
        <>
            <IntroCurvedBackground ref={introCurvedBackgroundRef} />
            <div className=" absolute z-10 top-0 left-0 w-screen h-screen">
                <div className="intro flex items-center justify-center">
                    <div className="relative  w-full h-full">
                        <div ref={fullNameRef} className=" flex items-center gap-[32px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">

                            <div ref={firstNameWidthCalcRef}>
                                <RollingChars
                                    ref={saidRollingCharsRef}
                                    word="SAID"
                                    showOnlyFirstCharOfHiddenWord={true}
                                    showFirstCharAndLastCharOfHiddenWord={false}
                                />
                            </div>

                            <div ref={lastNameWidthCalcRef}>
                                <RollingChars
                                    ref={fatahRollingCharsRef}
                                    word="FATAH."   
                                    showOnlyFirstCharOfHiddenWord={false}
                                    showFirstCharAndLastCharOfHiddenWord={true}
                                />
                            </div>


                            {/* <div ref={lastNameRef} className=" grid place-items-start overflow-hidden">
                                <div className=" intro_word_last_name_first font_intro">
                                    <span className="intro_word--v1" >F</span>
                                    <span className="intro_word--v1" >A</span>
                                    <span className="intro_word--v1" >T</span>
                                    <span className="intro_word--v1" >A</span>
                                    <span className="intro_word--v1" >H</span>
                                    <span className="intro_word--v1" >.</span>
                                </div>

                                <div ref={lastNameV2Ref} className="intro_word_last_name_last font_intro">
                                    <span ref={charFRef} className="intro_word--v2" >F</span>
                                    <span className="yolo" >A</span>
                                    <span className="yolo" >T</span>
                                    <span className="yolo" >A</span>
                                    <span className="yolo" >H</span>
                                    <span ref={charDotRef} className="intro_word--v2" ><span className="scale-wrapper inline-block">.</span></span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default IntroTransition;