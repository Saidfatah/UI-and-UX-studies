"use client"
import React, { useEffect, useRef, useState } from 'react'
import SlidesNavigation from '../components/SlidesNavigation';
import { AUTOPLAY_MS, slides } from '../constants';
import '../styles/style.css'
import '../styles/scroll.based.animation.css'
import '../styles/navigation.style.css'
import { animated, useSprings } from '@react-spring/web'

const revealConfig = {
    mass: 5,
    damping: 20,
    tension: 200,
}


function MacbookNeo() {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [playerState, setPlayerState] = React.useState<'playing' | 'paused' | 'ended'>('playing');
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
    const activeRef = React.useRef(0);

    const goToSlide = React.useCallback((index: number) => {
        activeRef.current = index;
        setActiveIndex(index);
        const target = document.getElementById(`media-card-gallery-item-${index + 1}`);
        target?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }, []);

    const resetTimer = React.useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            if (activeRef.current >= slides.length - 1) {
                if (timerRef.current) clearInterval(timerRef.current);
                timerRef.current = null;
                setPlayerState('ended');
                return;
            }
            goToSlide(activeRef.current + 1);
        }, AUTOPLAY_MS);
    }, [goToSlide]);

    const handlePlayerClick = React.useCallback(() => {
        if (playerState === 'playing') {
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = null;
            setPlayerState('paused');
        } else if (playerState === 'paused') {
            setPlayerState('playing');
            resetTimer();
        } else {
            goToSlide(0);
            setPlayerState('playing');
            resetTimer();
        }
    }, [playerState, resetTimer, goToSlide]);


    const handleClickOnSlide = React.useCallback((index: number, stopTimer?: boolean) => {
        goToSlide(index);
        if (stopTimer) {
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = null;
            setPlayerState('paused');
            return;
        }

        if (playerState !== 'paused') {
            setPlayerState('playing');
            resetTimer();
        }
    }, [goToSlide, playerState, resetTimer]);

    React.useEffect(() => {
        if (wrapperRef.current) {
            wrapperRef.current.style.setProperty('--autoplay-duration', String(AUTOPLAY_MS));
        }
        resetTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [resetTimer]);


    // this to cancel the animation state when user swipe or uses wheel to navigate
    useEffect(() => {
        const handleTouchStart = () => {
            setPlayerState("paused");
        };

        let swipeCooldown = false;
        const handleWheel = (e: WheelEvent) => {
            // if (Math.abs(e.deltaX) < 10 || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;

            // e.preventDefault();

            if (swipeCooldown) return;
            swipeCooldown = true;
            setTimeout(() => { swipeCooldown = false; }, 600);

            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = null;
            setPlayerState("paused");

            if (e.deltaX > 0 && activeRef.current < slides.length - 1) {
                activeRef.current = activeRef.current + 1;
                setActiveIndex(activeRef.current);
            } else if (e.deltaX < 0 && activeRef.current > 0) {
                activeRef.current = activeRef.current - 1;
                setActiveIndex(activeRef.current);
            }
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('wheel', handleWheel);
        };
    }, [goToSlide]);


    const [showNavigation, setShowNavigation] = useState(false);
    const observedRef = useRef<HTMLDivElement>(null);


    const [springs, api] = useSprings(
        slides.length,
        () => ({
            from: { opacity: 0 },
        }),
        []
    )

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    console.log('Intersection detected, starting animation');

                    // revealSlidesAPI.start({
                    //     to: {
                    //         opacity: 1,
                    //     },
                    //     config: revealConfig,
                    // });

                    api.start((index) => {
                        console.log('Index:', index);
                        return {
                            to: {
                                opacity: 1,
                            },
                            config: revealConfig,
                            delay: index * 300,
                        }
                    });
                    setShowNavigation(true);
                    // Optional: only play once
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (observedRef.current) observer.observe(observedRef.current);

        return () => observer.disconnect();
    }, [observedRef]);

    return (
        <div>
            <div className='w-screen h-screen bg-gray-200' />
            <div className='w-screen h-screen bg-gray-200' />
            <div className='w-screen h-screen bg-gray-200' />

            <div
                ref={wrapperRef}
                data-player-state={playerState}
                className='relative h-screen  gallery-page-wrapper  bg-red-300'
            >
                <div
                    ref={wrapperRef}
                    className='w-screen h-screen flex items-center '
                >
                    <div ref={observedRef} className='w-full media-gallery-wrapper'>
                        <div

                            className='w-full scroll-container media-gallery' >
                            <ul className='media-card-set'>
                                {slides.map((slide, index) => (
                                    <animated.li
                                        className='gallery-item '
                                        key={slide.id}
                                        id={`media-card-gallery-item-${index + 1}`}
                                        style={{
                                            '--slide-index': index,
                                            ...springs[index],
                                        } as any}
                                        onClick={() => handleClickOnSlide(index, true)}
                                    >
                                        <div className='card'>
                                            <div className='caption-container'>
                                                <div className='caption-animation-container'
                                                    style={{
                                                        '--caption-width-desktop': slide.captionWidth[0],
                                                        '--caption-width-mobile': slide.captionWidth[1],
                                                    } as React.CSSProperties}
                                                >
                                                    <p className='typography-media-card-gallery-headline'>{slide.title}</p>
                                                </div>
                                            </div>
                                            <div className='media-container'
                                                style={{
                                                    '--p-width-desktop': slide.sizes[0].width,
                                                    '--p-height-desktop': slide.sizes[0].height,
                                                    '--p-width-mobile': slide.sizes[1].width,
                                                    '--p-height-mobile': slide.sizes[1].height,

                                                } as React.CSSProperties}
                                            >
                                                <img src={slide.imageUrl} alt={slide.title} />
                                            </div>

                                        </div>
                                    </animated.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='absolute w-full h-screen   top-0 left-0 flex flex-col justify-end items-center'>

                    {
                        showNavigation && (
                            <div className='h-[56px] pointer-events-auto sticky z-[4] left-1/2 bottom-[32px] -translate-x-1/2'>
                                <SlidesNavigation
                                    slides={slides}
                                    activeIndex={activeIndex}
                                    handlePlayerClick={handlePlayerClick}
                                    playerState={playerState}
                                    handleClickOnSlide={handleClickOnSlide}
                                />
                            </div>
                        )
                    }
                </div>


            </div>

            <div className='w-screen h-screen bg-gray-200' />
            <div className='w-screen h-screen bg-gray-200' />
        </div>
    );
}

export default MacbookNeo;