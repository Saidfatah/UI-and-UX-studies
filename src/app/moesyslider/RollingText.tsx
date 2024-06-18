import React, { useEffect, useRef, useState } from 'react';
import "./rolling.css"

const RollingText = React.memo(
    ({ word }: { word: string }) => {
        const wrapperRef = useRef<HTMLDivElement | undefined>()


        useEffect(() => {
            if (wrapperRef.current) {
                const letterElements = Array.from(wrapperRef.current.querySelectorAll('span'))

                letterElements.forEach((_, index) => {
                    console.log(_)
                    letterElements[index].style.transitionDelay = `0s`
                    letterElements[index].classList.remove('letterShown')
                    letterElements[index].classList.add('letterRollDown')
                    letterElements[index].classList.remove('letterRollDown')

                    letterElements[index].style.transitionDelay = `${index * 0.05}s`
                    letterElements[index].classList.add('letterShown')
                })
            }
        }, [wrapperRef, word]);


        return (
            <div key={word} ref={wrapperRef as any} className="text-wrapper">
                {word.split('').map((letter, index) => <span
                    key={index + letter + word}
                    id={index + letter} className='letter letterRollDown' >{letter}
                </span>)}
            </div>
        );
    }
);

export default RollingText;