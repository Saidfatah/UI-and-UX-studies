'use client'
import React, { useEffect, useRef } from 'react';
import ButtonWithScaledFillAnimationBg from './ButtonWithScaledFillAnimationBg';
import './styles/fruitfull.particles.style.css';
import './styles/button.pop.animations.style.css';
import './styles/typo.style.css';
import './styles/nav.style.css';
import BezierAnimation from './BezierCurve';
import FruitFullNav from './FruitfullNav';

let timeoutRef: any
let intervalRef: any

const Fruitfull = () => {
    const titleRef = useRef<HTMLHeadElement>()
    const title2Ref = useRef<HTMLHeadElement>()
    const descriptionRef = useRef<HTMLHeadElement>()
    const simpleWordCharsRefs = useRef<HTMLSpanElement[]>([])
    const transparentWordCharsRefs = useRef<HTMLSpanElement[]>([])
    const bezierAnimationRef = useRef(null);

    const triggerHeaderPopAnimation = () => {
        simpleWordCharsRefs.current.forEach((_, i) => {
            simpleWordCharsRefs.current[i].classList.add(`_${i}_char_pop-animation_class`)
        })
        transparentWordCharsRefs.current.forEach((_, i) => {
            transparentWordCharsRefs.current[i].classList.add(`_${i}_char_pop-animation_class`)
        })
    }

    const stopHeaderPopAnimation = () => {
        simpleWordCharsRefs.current.forEach((_, i) => {
            simpleWordCharsRefs.current[i].classList.remove(`_${i}_char_pop-animation_class`)
        })
        transparentWordCharsRefs.current.forEach((_, i) => {
            transparentWordCharsRefs.current[i].classList.remove(`_${i}_char_pop-animation_class`)
        })
    }

    const initiateLoop = () => {
        stopHeaderPopAnimation()

        intervalRef = setInterval(() => {
            triggerHeaderPopAnimation()
            timeoutRef = setTimeout(() => {
                stopHeaderPopAnimation()
            }, 1.8 * 1000);
        }, 3000)
    }

    useEffect(() => {
        initiateLoop()

        return () => {
            clearInterval(intervalRef)
            clearTimeout(timeoutRef)
        }

    }, []);



    return (
        <>
            {/* <FruitFullNav /> */}
            <BezierAnimation ref={bezierAnimationRef} />
            <div className='center_wrapper bg-black flex-col gap-[8px]' >
                <div className='mb-[8px]' >
                    <h1 ref={titleRef as any} className='h-display mb-[8px]' >Our pricing is
                        <span className='ml-[27px]' >
                            {'simple'.split('').map((char, i) => (
                                <span
                                    className='inline-block'
                                    ref={(elm) => {
                                        simpleWordCharsRefs.current[i] = elm as any
                                    }}
                                >{char}</span>
                            ))}
                        </span>
                    </h1>
                    <h1 ref={title2Ref as any} className='h-display' >and
                        <span className='ml-[27px]' >
                            {'transparent'.split('').map((char, i) => (
                                <span
                                    className='inline-block'
                                    ref={(elm) => {
                                        transparentWordCharsRefs.current[i] = elm as any
                                    }}
                                >{char}</span>
                            ))}
                        </span>
                    </h1>
                </div>

                <p ref={descriptionRef as any} className='p_md mb-[12px] font-thin ' >...and less than half² the cost of traditional advisory firms.</p>
                <ButtonWithScaledFillAnimationBg
                    onMouseEnter={(x, y, width) => {
                        clearInterval(intervalRef)
                        clearTimeout(timeoutRef)
                        stopHeaderPopAnimation()
                        setTimeout(() => {
                            triggerHeaderPopAnimation()
                            if (bezierAnimationRef.current) {
                                setTimeout(() => {
                                    (bezierAnimationRef.current as any).createParticlesAt(x, y, width);
                                }, 250);
                            }
                        }, 0);
                    }}
                    onMouseLeave={() => {
                        initiateLoop()
                    }}
                    text='Get Started' />
            </div>
        </>
    );
};

export default Fruitfull;
