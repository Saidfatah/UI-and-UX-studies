"use client"
import React, { useEffect } from 'react'
import './style.css'

const AUTOPLAY_MS = 3000;

const slides = [
    {
        id: 1,
        title: "Silver, Blush, Citrus, and Indigo. Four stunning colors. One durable design.",
        imageUrl: "/images/macbook-neo/highlights_colors_endframe__c5rr2wp9mp0m_large_2x.jpg",
        captionWidth: [
            "555px", // desktop
            "390px" // mobile
        ],
        sizes: [
            { // desktop
                width: 934,
                height: 628
            },
            { // mobile
                width: 400,
                height: 480
            },
        ]
    },
    {
        id: 2,
        title: "Fast for all your everyday tasks. And up to 16 hours of battery life to go, go, go.1",
        imageUrl: "/images/macbook-neo/highlights_battery__fu65vu9o4te2_large_2x.jpg",
        captionWidth: [
            "555px", // desktop
            "320px" // mobile
        ],
        sizes: [
            { // desktop
                width: 934,
                height: 628
            },
            { // mobile
                width: 400,
                height: 480
            },
        ]
    },
    {
        id: 3,
        title: "13-inch Liquid Retina display.2 Exceptionally vibrant and bright. One billion colors. Open up and say wow.",
        imageUrl: "/images/macbook-neo/highlights_display_endframe__c0qk6ggqxdw2_large_2x.jpg",
        captionWidth: [
            "486px", // desktop
            "320px" // mobile
        ],
        sizes: [
            { // desktop
                width: 934,
                height: 628
            },
            { // mobile
                width: 400,
                height: 480
            },
        ]
    },
    {
        id: 4,
        title: "A powerful platform for AI. With Apple Intelligence built right in.3 Smarter than smart.",
        imageUrl: "/images/macbook-neo/highlights_ai__cfrukhyww2nm_large_2x.jpg",
        captionWidth: [
            "555px", // desktop
            "320px" // mobile
        ],
        sizes: [
            { // desktop
                width: 934,
                height: 628
            },
            { // mobile
                width: 400,
                height: 480
            },
        ]
    },
    {
        id: 5,
        title: "macOS. Easy to use. Runs all your go-to apps. Puts the fun in functional.",
        imageUrl: "/images/macbook-neo/highlights_mac_iphone__b5emh4vjjnyq_large_2x.jpg",
        captionWidth: [
            "555px", // desktop
            "320px" // mobile
        ],
        sizes: [
            { // desktop
                width: 934,
                height: 628
            },
            { // mobile
                width: 400,
                height: 480
            },
        ]
    },
]



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
            if (Math.abs(e.deltaX) < 10 || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;

            e.preventDefault();

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



    return (<div ref={wrapperRef} className='w-screen h-screen flex items-center gallery-page-wrapper' data-player-state={playerState}>


        <div className='w-full media-gallery-wrapper'>
            <div

                className='w-full scroll-container media-gallery'
            >
                <ul className='media-card-set'>
                    {slides.map((slide, index) => (
                        <li
                            className='gallery-item'
                            key={slide.id}
                            id={`media-card-gallery-item-${index + 1}`}
                            style={{

                                '--slide-index': index,

                            } as React.CSSProperties}
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
                        </li>
                    ))}
                </ul>
            </div>
        </div>


        <div className='nav-controls'>
            <ul role="tablist" aria-label="MacBook Neo highlights" className='dot-nav-container'>
                {slides.map((slide, index) => (
                    <li role="presentation" className='dot-nav-item' key={index} style={{ '--item-index': index } as React.CSSProperties}>
                        <a
                            role="tab"
                            className='dot-nav-link'
                            href={`#media-card-gallery-item-${index + 1}`}
                            aria-controls={`media-card-gallery-item-${index + 1}`}
                            tabIndex={index === 0 ? 0 : -1}
                            data-active={index === activeIndex}
                            onClick={(e) => {
                                e.preventDefault()
                                handleClickOnSlide(index, true)
                            }}
                        >
                            <span className='visually-hidden'>{slide.title}</span>
                        </a>
                    </li>
                ))}
            </ul>

            <button className='player-btn' onClick={handlePlayerClick} aria-label={playerState === 'playing' ? 'Pause' : playerState === 'paused' ? 'Play' : 'Replay'}>
                <div className='player-icon-stack'>
                    {/* Play icon */}
                    <svg className='player-icon' data-visible={playerState === 'paused'} width="56" height="56" viewBox="0 0 56 56" fill="currentColor">
                        <path d="M22.026 36.625C22.4738 36.625 22.8858 36.4907 23.4501 36.1682L34.3679 29.836C35.2277 29.3344 35.7293 28.815 35.7293 27.9999C35.7293 27.1938 35.2277 26.6744 34.3679 26.1728L23.4501 19.8406C22.8858 19.5092 22.4739 19.3749 22.026 19.3749C21.0945 19.3749 20.2705 20.0914 20.2705 21.3184V34.6813C20.2705 35.9083 21.0945 36.625 22.026 36.625Z" fill="black" />
                    </svg>

                    {/* Pause icon */}
                    <svg className='player-icon' data-visible={playerState === 'playing'} width="56" height="56" viewBox="0 0 56 56" fill="currentColor">
                        <path d="M21.7335 36.6701H24.2677C25.416 36.6701 26.0001 36.0905 26.0001 34.9508V21.0493C26.0001 19.9293 25.416 19.3595 24.2677 19.33H21.7335C20.5852 19.33 20.0011 19.8998 20.0011 21.0493V34.9508C19.9714 36.0904 20.5555 36.6701 21.7335 36.6701ZM31.7327 36.6701H34.2674C35.4159 36.6701 36.0001 36.0905 36.0001 34.9508V21.0493C36.0001 19.9293 35.4159 19.33 34.2674 19.33H31.7327C30.5842 19.33 30 19.8998 30 21.0493V34.9508C30 36.0904 30.5545 36.6701 31.7327 36.6701Z" fill="currentColor" />
                    </svg>

                    {/* Replay icon */}
                    <svg className='player-icon' data-visible={playerState === 'ended'} fill="currentColor" width="56" height="56" viewBox="0 0 56 56">
                        <path d="M36.2449 26.9629C35.1376 26.9629 34.2397 27.8607 34.2397 28.9681C34.2397 32.4086 31.4405 35.2078 28 35.2078C24.5595 35.2078 21.7603 32.4086 21.7603 28.9681C21.7603 25.5276 24.5595 22.7284 28 22.7284C28.0283 22.7284 28.0546 22.7212 28.0825 22.7201L26.7986 24.0042C26.0153 24.787 26.0153 26.0568 26.7986 26.8396C27.1897 27.2312 27.7033 27.427 28.2163 27.427C28.7293 27.427 29.2429 27.2312 29.634 26.8396L34.0746 22.399C34.8579 21.6162 34.8579 20.3464 34.0746 19.5636L29.4176 14.9066C28.6353 14.1233 27.3645 14.1233 26.5822 14.9066C25.7989 15.6894 25.7989 16.9592 26.5822 17.742L27.5795 18.7394C22.1234 18.9624 17.75 23.4583 17.75 28.9681C17.75 34.6198 22.3483 39.2181 28 39.2181C33.6517 39.2181 38.25 34.6198 38.25 28.9681C38.25 27.8608 37.3523 26.9629 36.2449 26.9629Z" fill="black" />
                    </svg>
                </div>
            </button>
        </div>
    </div>);
}

export default MacbookNeo;