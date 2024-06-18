'use client'
import React, { useCallback, useRef, forwardRef, useImperativeHandle } from "react";
import WordsRenderer from "./AnimatedAbleWordsWrapper";
import { phrasesWordsSplit, wordTransitionDelayIncrement, wordTransitionDuration } from "./constants";
import { applyTransformTransitionToElement, formatParagraphId, formatWordId, sleep, toggleBlur, toggleElementOpacity } from "./utils";

export interface FruitfulTextRevealHandles {
    hideCurrentPhrase: (paragraphIndex: number) => Promise<void>;
    showNextPhrase: (paragraphIndex: number) => void;
}

const FruitfulTextReveal = forwardRef<FruitfulTextRevealHandles>((_, ref) => {
    const wordRefs = useRef<Record<string, HTMLDivElement>>({});
    const paragraphRefs = useRef<Record<string, HTMLParagraphElement>>({});

    const registerWordRef = useCallback((element: any, id: string) => {
        wordRefs.current[id] = element;
    }, []);

    const registerParagraphRef = useCallback((element: any, id: string) => {
        paragraphRefs.current[id] = element;
    }, []);

    const moveWordsToUpHiddenPosition = useCallback(async (paragraphIndex: number) => {
        const words = phrasesWordsSplit[paragraphIndex];

        words.forEach(word => {
            const wordId = formatWordId(word, paragraphIndex);
            applyTransformTransitionToElement(wordRefs.current[wordId], 'top');
            toggleBlur(wordRefs.current[wordId], 'hide');
            toggleElementOpacity(wordRefs.current[wordId], 'hide');
        });

    }, [wordRefs]);

    const moveWordsToHiddenDownPosition = useCallback((paragraphIndex: number) => {
        const words = phrasesWordsSplit[paragraphIndex];

        words.forEach(word => {
            const wordId = formatWordId(word, paragraphIndex);
            applyTransformTransitionToElement(wordRefs.current[wordId], 'down');
        });

    }, [wordRefs]);

    const moveWordsToMiddleVisiblePosition = useCallback((paragraphIndex: number) => {
        const words = phrasesWordsSplit[paragraphIndex];

        words.forEach(word => {
            const wordId = formatWordId(word, paragraphIndex);

            toggleElementOpacity(wordRefs.current[wordId], 'show');

            toggleBlur(wordRefs.current[wordId], 'show');

            applyTransformTransitionToElement(wordRefs.current[wordId], 'middle');
        });
    }, [wordRefs]);

    const hideCurrentPhrase = useCallback(async (paragraphIndex: number) => {
        await moveWordsToUpHiddenPosition(paragraphIndex);

        await sleep(wordTransitionDuration * 1000)

        moveWordsToHiddenDownPosition(paragraphIndex);
    }, [moveWordsToUpHiddenPosition, moveWordsToHiddenDownPosition]);


    const showNextPhrase = useCallback((paragraphIndex: number) => {
        moveWordsToMiddleVisiblePosition(paragraphIndex);
    }, [moveWordsToMiddleVisiblePosition]);

    useImperativeHandle(ref, () => ({
        hideCurrentPhrase: (paragraphIndex: number) => {
            return hideCurrentPhrase(paragraphIndex)
        },
        showNextPhrase: (paragraphIndex: number) => {
            showNextPhrase(paragraphIndex)
        }
    }), [hideCurrentPhrase, showNextPhrase]);

    return (
        <div className="relative w-full h-[40px] overflow-hidden text-[24px]" >
            {phrasesWordsSplit.map((phraseWordsSplit, index) => (
                <p
                    key={index + new Date().toString()}
                    ref={el => registerParagraphRef(el, formatParagraphId(index))}
                    className="absolute top-0 -translate-x-1/2 left-1/2 h-[40px] text-white text-left"
                >
                    <WordsRenderer
                        registerWordRef={registerWordRef}
                        words={phraseWordsSplit}
                        isInitiallyVisible={index === 0}
                        paragraphIndex={index}
                    />
                </p>
            ))}
        </div>
    );
});

export default FruitfulTextReveal;
