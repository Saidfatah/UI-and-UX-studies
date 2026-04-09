import { animated, useSpring } from '@react-spring/web'
import { useEffect, useRef } from 'react';

type Props = {
    slides: any[];
    activeIndex: number;
    handlePlayerClick: () => void;
    playerState: 'playing' | 'paused' | 'ended';
    handleClickOnSlide: (index: number, isManual: boolean) => void;
}


const overShootConfig = {
    mass: 10,
    tension: 500,
    friction: 50,
    // clamp:true
}
const opacityConfig = {
    mass: 2,
    tension: 150,
    friction: 20,
    // clamp:true
}

const positionConfig = {
    stiffness: 180,
    damping: 12,
    mass: 1
}

const shapeConfig = {
    stiffness: 400,
    damping: 10,
    mass: 1
}

const buttonPositionConfig = {
    stiffness: 300,
    damping: 200,
    mass: 1
}

const delayBUttonAndItesmSPlit = 500
const innerContentRevealDelay = 250

function SlidesNavigation({ slides, activeIndex, handlePlayerClick, playerState, handleClickOnSlide }: Props) {


    const [overShootSpring] = useSpring(() => ({
        from: {
            translateY: '200px',
        },
        to: [
            {
                translateY: '0%',
            }
        ],
        config: overShootConfig,
    }))

    const [opacitySpring] = useSpring(() => ({
        from: {
            opacity: 0,
            filter: 'blur(16px)',
            scale: 0.5,
        },
        to: [
            {
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
            }

        ],
        config: opacityConfig,
    }))




    const [shapeSpring] = useSpring(() => ({
        from: {
            width: '56px',
        },
        to: {
            width: '214px',
        },
        config: shapeConfig,
        delay: delayBUttonAndItesmSPlit
    }))



    const [buttonPositionSpring] = useSpring(() => ({
        from: {
            "--margin-inline-start": "-68px"// 56px + 12px padding
        },
        to: {
            "--margin-inline-start": "0px"
        },
        config: buttonPositionConfig,
        delay: delayBUttonAndItesmSPlit
    }))

    const [revealItemsSpring] = useSpring(() => ({
        from: {
            '--item-intial-reveal-expand-amount': 0,
            opacity: 0,
            translateX: "50%"
        },

        to: [
            {
                '--item-intial-reveal-expand-amount': 1,
                opacity: 1,
                translateX: "0%"
            }
        ],
        config: buttonPositionConfig,
        delay: delayBUttonAndItesmSPlit
    }))
    
    const [buttonInnerContentRevealSpring] = useSpring(() => ({
        from: {
            opacity: 0,
            scale: 0.4,
        },
        to: {
            opacity: 1,
            scale: 1,
        },
        config: buttonPositionConfig,
        delay: delayBUttonAndItesmSPlit
    }))

    const ariaLabel = playerState === 'playing' ? 'Pause' : playerState === 'paused' ? 'Play' : 'Replay';


    return (
        <animated.div
            style={{
                ...opacitySpring
            } as any}
            className=" origin-center"
        >
            <animated.div
                style={{
                    ...overShootSpring,
                } as any}
                className='nav-controls items-end'
            >


                <animated.div
                    className="dot-nav-container  overflow-hidden w-[56px]"
                    style={{
                        ...shapeSpring,
                    } as any
                    }
                >

                    <animated.ul
                        style={{
                            ...revealItemsSpring
                        } as any
                        }
                        role="tablist"
                        aria-label="MacBook Neo highlights"
                        className='dot-nav-items  min-w-[168px]'
                    >
                        {slides.map((slide, index) => (
                            <li
                                role="presentation"
                                className='dot-nav-item'
                                key={index}
                                style={{ '--item-index': index } as React.CSSProperties}
                            >
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
                    </animated.ul>
                </animated.div>

                <animated.div
                    style={{
                        ...buttonPositionSpring
                    } as any}
                    className="controll button h-[56px] "
                >
                    <button
                        className='player-btn'
                        onClick={handlePlayerClick}
                        aria-label={ariaLabel}
                    >
                        <animated.div
                            style={{
                                ...buttonInnerContentRevealSpring
                            }}
                            className='player-btn-inner-content'
                        >
                            <div className='player-icon-stack'>
                                {/* Play icon */}
                                <svg
                                    className='player-icon'
                                    data-visible={playerState === 'paused'}
                                    width="56"
                                    height="56"
                                    viewBox="0 0 56 56"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M22.026 36.625C22.4738 36.625 22.8858 36.4907 23.4501 36.1682L34.3679 29.836C35.2277 29.3344 35.7293 28.815 35.7293 27.9999C35.7293 27.1938 35.2277 26.6744 34.3679 26.1728L23.4501 19.8406C22.8858 19.5092 22.4739 19.3749 22.026 19.3749C21.0945 19.3749 20.2705 20.0914 20.2705 21.3184V34.6813C20.2705 35.9083 21.0945 36.625 22.026 36.625Z"
                                        fill="currentColor"
                                    />
                                </svg>

                                {/* Pause icon */}
                                <svg
                                    className='player-icon'
                                    data-visible={playerState === 'playing'}
                                    width="56"
                                    height="56"
                                    viewBox="0 0 56 56"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M21.7335 36.6701H24.2677C25.416 36.6701 26.0001 36.0905 26.0001 34.9508V21.0493C26.0001 19.9293 25.416 19.3595 24.2677 19.33H21.7335C20.5852 19.33 20.0011 19.8998 20.0011 21.0493V34.9508C19.9714 36.0904 20.5555 36.6701 21.7335 36.6701ZM31.7327 36.6701H34.2674C35.4159 36.6701 36.0001 36.0905 36.0001 34.9508V21.0493C36.0001 19.9293 35.4159 19.33 34.2674 19.33H31.7327C30.5842 19.33 30 19.8998 30 21.0493V34.9508C30 36.0904 30.5545 36.6701 31.7327 36.6701Z"
                                        fill="currentColor"
                                    />
                                </svg>

                                {/* Replay icon */}
                                <svg
                                    className='player-icon'
                                    data-visible={playerState === 'ended'}
                                    fill="currentColor"
                                    width="56"
                                    height="56"
                                    viewBox="0 0 56 56"
                                >
                                    <path
                                        d="M36.2449 26.9629C35.1376 26.9629 34.2397 27.8607 34.2397 28.9681C34.2397 32.4086 31.4405 35.2078 28 35.2078C24.5595 35.2078 21.7603 32.4086 21.7603 28.9681C21.7603 25.5276 24.5595 22.7284 28 22.7284C28.0283 22.7284 28.0546 22.7212 28.0825 22.7201L26.7986 24.0042C26.0153 24.787 26.0153 26.0568 26.7986 26.8396C27.1897 27.2312 27.7033 27.427 28.2163 27.427C28.7293 27.427 29.2429 27.2312 29.634 26.8396L34.0746 22.399C34.8579 21.6162 34.8579 20.3464 34.0746 19.5636L29.4176 14.9066C28.6353 14.1233 27.3645 14.1233 26.5822 14.9066C25.7989 15.6894 25.7989 16.9592 26.5822 17.742L27.5795 18.7394C22.1234 18.9624 17.75 23.4583 17.75 28.9681C17.75 34.6198 22.3483 39.2181 28 39.2181C33.6517 39.2181 38.25 34.6198 38.25 28.9681C38.25 27.8608 37.3523 26.9629 36.2449 26.9629Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                        </animated.div>
                    </button>
                </animated.div>
            </animated.div>
        </animated.div>
    );
}

export default SlidesNavigation;