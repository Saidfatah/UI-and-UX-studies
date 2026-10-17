'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ImageCarouselProps = {
    images: string[];
    alt?: string;
};

const SLIDE_HEIGHT = 500;
const THUMB_SIZE = 80;
const THUMB_GAP = 20;

export default function ImageCarousel({
    images,
    alt = 'Carousel image',
}: ImageCarouselProps) {
    const displayRef = useRef<HTMLDivElement>(null);
    const activeBoxRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (images.length <= 1) return;

        const ctx = gsap.context(() => {
            const display = displayRef.current;
            const activeBox = activeBoxRef.current;

            if (!display || !activeBox) return;

            const maxScroll =
                display.scrollHeight - display.clientHeight;

            const thumbStep = THUMB_SIZE + THUMB_GAP;
            const activeBoxTravel =
                (images.length - 1) * thumbStep;

            gsap.to(activeBox, {
                y: activeBoxTravel,
                ease: 'none',
                scrollTrigger: {
                    trigger: display,
                    scroller: display,
                    start: 'top top',
                    end: () => `+=${maxScroll}`,
                    onUpdate: ({ getVelocity }) => {
                        const velocity = Math.abs(getVelocity())

                        const minVelocity = 10 // ignore tiny jitter
                        const maxVelocity = 200

                        const opacity = velocity <= minVelocity
                            ? 1
                            : gsap.utils.mapRange(
                                minVelocity,
                                maxVelocity,
                                1,
                                0,
                                Math.min(velocity, maxVelocity)
                            )

                        activeBox.style.opacity = `${opacity.toFixed(2)}`
                    },
                    scrub: true,
                },
            });

        }, displayRef);

        return () => ctx.revert();
    }, [images.length]);

    return (
        <section className="image-carousel">
            <div className="image-carousel__items">
                <div className="image-carousel__items-track">
                    <div
                        ref={activeBoxRef}
                        className="image-carousel__active-box"
                        aria-hidden="true"
                    >
                        {/* <div className="image-carousel__active-box-inner" /> */}
                    </div>


                    <div className="image-carousel__thumbnails">
                        {images.map((src, index) => (
                            <div
                                className="image-carousel__thumbnail"
                                key={`${src}-${index}`}
                            >
                                <img
                                    src={src}
                                    alt={`${alt} ${index + 1}`}
                                    draggable={false}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div
                ref={displayRef}
                className="image-carousel__display"
            >
                <div className="image-carousel__display-track">
                    {images.map((src, index) => (
                        <div
                            className="image-carousel__slide"
                            key={`${src}-display-${index}`}
                        >
                            <img
                                src={src}
                                alt={`${alt} ${index + 1}`}
                                draggable={false}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}