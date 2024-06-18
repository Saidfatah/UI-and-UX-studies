import React from 'react';
import TextReveal from './TextReveal';
import "./animation.css"
import ButtonRevealFadeIn from './ButtonFadeIn';
import { delayStep, phrasesGroups } from './constants';


const PhrasesGroup = ({ index }: { index: number }) => {
    const phrases = phrasesGroups[index]
    return (
        <div className=' flex flex-col justify-between h-full' >
            <div>
                {phrases.map((phrase, i) => (<TextReveal delay={delayStep * (i + 1)} text={phrase} />))}
            </div>

            <ButtonRevealFadeIn delay={delayStep * phrases.length} text={phrases[phrases.length - 1]} />
        </div>
    );
}

export default PhrasesGroup;
