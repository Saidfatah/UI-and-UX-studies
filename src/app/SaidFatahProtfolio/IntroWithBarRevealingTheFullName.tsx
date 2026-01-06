'use client';
import './style.css';
import { useCallback, useEffect, useRef } from 'react';

const REVEAL_DURATION = 1500;
const HEADER_MOVE_TO_TP_DURATION = 1500;
const SCALE_DOWN_DURATION = 1500;

const FAST_START_EASING = "cubic-bezier(.17, .67, .1, .99)"
const EASIE_IN_OUT_EXPO = "cubic-bezier(0.87, 0, 0.13, 1)"

function IntroWithBarRevealingTheFullName() {
    const headerRef = useRef<HTMLAnchorElement>(null);
    const containerRef = useRef<HTMLAnchorElement>(null);
    const scaleContainerRef = useRef<HTMLAnchorElement>(null);
    const titleRevealContainerRef = useRef<HTMLDivElement>(null);
    const titleRevealWhiteBgRef = useRef<HTMLDivElement>(null);
    const titleRevealBarRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLParagraphElement>(null);

    const introAnimationSequence = useCallback(() => {
        console.log("introAnimationSequence", titleRevealContainerRef.current);
        // slide the title reveal container to the right WAAPI 
        titleRevealContainerRef.current?.animate(
            [
                {
                    left: "12px",
                    filter: "blur(0px)",
                },
                {
                    left: `${titleRef.current?.offsetWidth}px`,
                    filter: "blur(12px)",
                }
            ],
            {
                duration: REVEAL_DURATION,
                easing: FAST_START_EASING,
                fill: "forwards",
            }
        )

        
        scaleContainerRef.current?.animate(
            [
                {
                    transform: "scale(4) rotate(10deg)",
                },
                {
                    transform: "scale(1) rotate(0deg)",
                }
            ],
            {
                duration: SCALE_DOWN_DURATION,
                easing: "cubic-bezier(0.83, 0, 0.17, 1)",
                fill: "forwards",
            }
        )


        const titleWidth = titleRef.current?.getBoundingClientRect().width;
        containerRef.current?.animate(
            [
                {
                    transform: "translateX(0px)",
                },
                {
                    transform: `translateX(${-(titleWidth / 2) + 16}px)`,
                }
            ],
            {
                duration: HEADER_MOVE_TO_TP_DURATION,
                easing: EASIE_IN_OUT_EXPO,
                fill: "forwards",
            }
        )


        headerRef.current?.classList.remove("headerPreStart");
        headerRef.current?.classList.add("headerPostStart");



    }, [containerRef,scaleContainerRef, headerRef, titleRevealContainerRef, titleRef])

    useEffect(() => {
        setTimeout(() => {
            introAnimationSequence();
        }, 1000);
    }, [introAnimationSequence]);

    useEffect(() => {
        if (titleRevealWhiteBgRef.current && titleRef.current) {
            titleRevealWhiteBgRef.current.style.width = `${titleRef.current.offsetWidth + 5}px`;
        }

    }, [titleRevealWhiteBgRef, titleRef]);

    return (<nav
        ref={headerRef}
        style={{
            '--headerMoveFromMiddleToTopTransition': `transform ${HEADER_MOVE_TO_TP_DURATION}ms cubic-bezier(0.83, 0, 0.17, 1)`
        }}
        className="header headerPreStart "
    >
        <div  className='h-full w-full flex items-center justify-center'>
            <div ref={scaleContainerRef} className='scale-[4] rotate-[10deg]'>
                <a ref={containerRef} href="#" className='origin-center relative z-[99] w-[16px] overflow-visible'>
                    <div ref={titleRevealContainerRef} className='absolute z-[9] top-1/2 -translate-y-1/2 left-[12px] ' >
                        <div className='relative w-fit flex items-center'>
                            <div className='translate-y-[-0.2px]'>
                                <div ref={titleRevealBarRef} className='w-[2px] h-[16px] bg-black' />
                            </div>
                            <div ref={titleRevealWhiteBgRef} className='w-[200px] h-[100px] bg-white' />
                        </div>
                    </div>

                    <p ref={titleRef} className='text-black w-fit text-[16px] whitespace-nowrap tracking-[0.3em]'>SAID.FATAH</p>
                </a>
            </div>
        </div>
    </nav>);
}

export default IntroWithBarRevealingTheFullName;