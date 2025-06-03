'use client'
import { useEffect, useLayoutEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import './style.css';



const Accordion = ({ parentRef, index, lenis }: { parentRef: HTMLDivElement | null, index: number, lenis: any }) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const paragraphHeight = useRef(0);

    useLayoutEffect(() => {
        if (!descriptionRef.current) return;
        paragraphHeight.current = descriptionRef.current.offsetHeight;
    }, [descriptionRef]);

    useEffect(() => {
        if (!lenis) return;

        const onScroll = () => {
            if (!parentRef || !descriptionRef.current || !elementRef.current) return;

            const elementScrollScreenTime = 300;

            // Get element positioning
            const parentTop = parentRef.offsetTop ?? 0;
            const elementTop = descriptionRef.current.offsetTop;
            const scrollOffset = lenis.animatedScroll - parentTop;

            // Ensure progress starts at zero
            const progress = Math.max(0, scrollOffset - elementTop - (elementScrollScreenTime * index));
            const percentage = Math.min(progress / elementScrollScreenTime, 1);
            const invertedPercentage = 1 - percentage

            // Control clipping using `clip-path`
            // const clipBottom = 100 * invertedPercentage; // Moves bottom upwards as progress increases
            // descriptionRef.current.style.clipPath = `polygon(0% 0%, 100% 0%, 100% ${clipBottom}%, 0% ${clipBottom}%)`;

            // Optional: Adjust height dynamically
            descriptionRef.current.style.transform = `scaleY(${invertedPercentage})`;
            descriptionRef.current.style.height = `${paragraphHeight.current * invertedPercentage}px`;
            descriptionRef.current.style.opacity = `${invertedPercentage}`;
        };

        lenis.on('scroll', onScroll);
        return () => lenis.off('scroll', onScroll);
    }, [parentRef, paragraphHeight, descriptionRef, elementRef, lenis]);

    return (
        <section ref={elementRef} className="ol-feats-accordion__feat-wrapper ol-feats-accordion__feat-1 space-y-5">
            <div className="ol-feats-accordion__feat-heading flex items-center gap-5">
                <div className="text-white w-10 opacity-70">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M19.9952 20C8.9517 19.9974 9.65504e-07 11.0441 0 3.49692e-06L40 0C40 11.0441 31.0484 19.9974 20.0048 20C31.0484 20.0026 40 28.956 40 40H1.74845e-06C1.74845e-06 28.956 8.9517 20.0026 19.9952 20Z" fill="currentColor">
                        </path>
                    </svg>
                </div>
                <h3 className="font-display text-start transition-all duration-700 text-xl md:text-2xl text-white">No Oracles No Validator</h3>
            </div>
            <p ref={descriptionRef} className="ol-feats-accordion__feat-text text-white overflow-clip origin-top-left ml-16 text-start text-sm md:text-base">
                Omnilane doesn’t rely on external oracles or validators, ensuring faster and more secure transactions.
            </p>
        </section>
    );
};
function easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
function easeInOutQuad(x: number): number {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }
function Page() {
    const featuresContainerRef = useRef<HTMLDivElement>(null);
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1,
            // duration: 1, // Adjust for smoothness
            easing: easeInOutQuad, // Smooth ease-out
            smoothWheel: true,
            smoothTouch: false,
        });

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        lenisRef.current = lenis;

        return () => lenis.destroy();
    }, []);

    return (
        <div>
            <div className="bg-gray-900 w-screen h-screen"></div>
            <div ref={featuresContainerRef} className="relative pin-wrapper bg-black">
                <div className='sticky top-0 z-10 mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 md:grid-cols-2 md:gap-20'>
                    <div className='z-10 flex flex-col gap-4'>
                        <Accordion index={0} parentRef={featuresContainerRef.current} lenis={lenisRef.current} />
                        <Accordion index={1} parentRef={featuresContainerRef.current} lenis={lenisRef.current} />
                        <Accordion index={2} parentRef={featuresContainerRef.current} lenis={lenisRef.current} />
                        <Accordion index={3} parentRef={featuresContainerRef.current} lenis={lenisRef.current} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
