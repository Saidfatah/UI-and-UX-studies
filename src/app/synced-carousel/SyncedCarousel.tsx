'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';


type ImageCarouselProps = {
    images: string[];
    alt?: string;
    slideDuration?: number;
    holdDuration?: number;
};

const SLIDE_HEIGHT = 500;
const THUMB_SIZE = 80;
const THUMB_GAP = 20;

function easeInOutQuart(x: number): number {
return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}
export default function ImageCarousel({
    images,
    alt = 'Carousel image',
    slideDuration = 4,
    holdDuration = 1.2,
}: ImageCarouselProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const activeBoxRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (images.length <= 1) return;

        const ctx = gsap.context(() => {
            const track = trackRef.current;
            const activeBox = activeBoxRef.current;

            if (!track || !activeBox) return;

            const ease = easeInOutQuart;

            const timeline = gsap.timeline({
                repeat: -1,
                yoyo: true,
                defaults: {
                    ease,
                    force3D: true,
                },
            });

            images.forEach((_, index) => {
                const y = -index * (SLIDE_HEIGHT + 42);
                // translateY(calc(-4 * 500px - 4 * 42px))
                const thumbY = index * (THUMB_SIZE + THUMB_GAP);

                timeline
                    .to({}, { duration: 1})
                    .to(
                        track,
                        {
                            y,
                            duration: slideDuration,
                        },
                        '<'
                    )
                    .to(
                        activeBox,
                        {
                            y: thumbY,
                            duration: slideDuration,
                        },
                        '<'
                    );
            });

            // timeline.reverse()
            // Once the last image is reached, jump both elements
            // back to their first position before the next loop.
            // timeline
            //     .to({}, { duration: holdDuration })
            //     .set(track, { y: 0, force3D: true })
            //     .set(activeBox, { y: 0, force3D: true });
        }, trackRef);

        return () => ctx.revert();
    }, [images.length, slideDuration, holdDuration]);

    return (
        <section className="image-carousel">
            <div className="image-carousel__items">
                <div className="image-carousel__items-track">
                    <div
                        ref={activeBoxRef}
                        className="image-carousel__active-box"
                        aria-hidden="true"
                    />

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

            <div className="image-carousel__display">
                <div ref={trackRef} className="image-carousel__display-track">
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
