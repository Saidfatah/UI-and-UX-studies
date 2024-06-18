'use client'
import React, { useRef, useEffect } from "react";
import FruitfulTextReveal, { FruitfulTextRevealHandles } from "./FruitfullTextRevealUp";
import { phrasesWordsSplitLength, sleepBeforeNextPhrase } from "./constants";
import { sleep } from "./utils";

function ImagesAndTextRevealAnimationSequencer() {
    const fruitfulTextRevealRef = useRef<FruitfulTextRevealHandles>(null);

    const loopPhrases = (currentPhraseIndex: number) => {
        setTimeout(async () => {
            if (fruitfulTextRevealRef.current) {
                await fruitfulTextRevealRef.current.hideCurrentPhrase(currentPhraseIndex);

                const nextIndex = currentPhraseIndex >= (phrasesWordsSplitLength - 1) ? 0 : currentPhraseIndex + 1;
                await sleep(sleepBeforeNextPhrase);

                fruitfulTextRevealRef.current.showNextPhrase(nextIndex);

                loopPhrases(nextIndex);
            }
        }, 2000);
    };

    useEffect(() => {
        loopPhrases(0);
    }, []);

    return (
        <>
            <FruitfulTextReveal ref={fruitfulTextRevealRef} />
        </>
    );
}

export default ImagesAndTextRevealAnimationSequencer;
