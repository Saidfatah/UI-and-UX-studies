'use client'
import React, { useState, useEffect, useRef } from 'react';
import { delayStep, hideTextDuration, phrasesGroupLoopDuration, phrasesGroups, revealTextDuration } from './constants';
import "./animation.css"
import "./imageWrapperAnimations.css"
import PhrasesGroup from './PhrasesGroup';
import ImageReveal from './ImageReveal';


const images = [
    '/images/saidFatahImage.jpeg',
    '/images/nabilImage.jpeg',
    '/images/saidGouzal.jpeg',
    '/images/mechkouri.jpeg'
]

const loopInterval = (phrasesCount: number) => (phrasesGroupLoopDuration + hideTextDuration + revealTextDuration + delayStep * phrasesCount) * 1000

const TextRevealContainer = () => {
    const [currentPhraseGroupIndex, setCurrentPhraseGroupIndex] = useState(0);

    const loopPhrase = () => {
        setCurrentPhraseGroupIndex(prev => prev >= 3 ? 0 : prev + 1);
    };

    useEffect(() => {
        console.log("loopPhrase(); initialized");
        const interval = setInterval(() => {
            loopPhrase();
        }, loopInterval(phrasesGroups[currentPhraseGroupIndex].length)); // Adjust interval based on the length of the current phrase group

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [currentPhraseGroupIndex]);

    return (
        <div className='w-screen h-screen bg-black flex justify-center items-center'>
            <div className='relative h-[190px] w-[500px] flex flex-col justify-between'>


                {currentPhraseGroupIndex === 0 && (
                    <>
                        <ImageReveal src={images[currentPhraseGroupIndex]} delay={delayStep} />
                        <PhrasesGroup key="1" index={0} />
                    </>
                )}
                {currentPhraseGroupIndex === 1 && (
                    <>
                        <ImageReveal src={images[currentPhraseGroupIndex]} delay={delayStep} />
                        <PhrasesGroup key="2" index={1} />
                    </>
                )}
                {currentPhraseGroupIndex === 2 && (
                    <>
                        <ImageReveal src={images[currentPhraseGroupIndex]} delay={delayStep} />
                        <PhrasesGroup key="3" index={2} />
                    </>
                )}
                {currentPhraseGroupIndex === 3 && (
                    <>
                        <ImageReveal src={images[currentPhraseGroupIndex]} delay={delayStep} />
                        <PhrasesGroup key="4" index={3} />
                    </>
                )}
            </div>
        </div>
    );
};

export default TextRevealContainer;
