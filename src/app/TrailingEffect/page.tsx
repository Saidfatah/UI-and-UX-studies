
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';


type PoolItem = {
    container: HTMLDivElement;
    img: HTMLImageElement;
    active: boolean;
};

const size = 100
const threshold = 100+25
const poolSize = 20

const images = [
    "/images/glareCards/git-coauthors.png",
    "/images/glareCards/hide-desktop-icons.png",
    "/images/glareCards/iterm-command.png",
    "/images/glareCards/open-figma.png",
    "/images/glareCards/pause-spotify.png",
    // "/images/glareCards/saidfatah.jpeg",
    "/images/glareCards/slack.png",
    "/images/glareCards/update-google-calendar.png",
    "/images/glareCards/vscode.png",
]

export default function ImageTrail() {
    const poolRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {

        const pool: PoolItem[] = poolRefs.current
            .slice(0, poolSize)
            .filter((el): el is HTMLDivElement => el !== null)
            .map((container) => ({
                container,
                img: container.querySelector('img')!,
                active: false,
            }));

        if (!pool.length) return;

        let nextImageIndex = pool.length % images.length;
        let previousX = 0;
        let previousY = 0;
        let lastSpawnX = 0;
        let lastSpawnY = 0;
        let initialized = false;



        // Keep the pool containers hidden until acquired.
        pool.forEach(({ container, img }) => {
            gsap.set(container, {
                autoAlpha: 0,
            });

            // setup all images to be hidden at first
            gsap.set(img, {
                yPercent: 0,
                opacity: 1,
            });
        });

        const spawnImage = (
            x: number,
            y: number,
            dx: number,
            dy: number
        ) => {
            // Never allocate a new element during mouse movement.
            const item = pool.find((entry) => !entry.active);

            // Skip this spawn if all 10 images are animating.
            if (!item) return;

            item.active = true;

            const { container, img } = item;

            // Position opposite to the direction of travel.
            gsap.set(container, {
                left: x,
                top: y,
                autoAlpha: 1,
                delay: 0.05
            });

            const tl = gsap.timeline({
                defaults: {
                    duration: 0,
                    ease: "power4.out"
                },
            });

            tl.to(img, {
                scale: 1.2,
                rotate: dx >= 0 ? 15 : -15,
                duration: 0.25,
                ease: "sine.in",
            })

            tl.to(
                img,
                {
                    
                    yPercent: -50,
                    rotate: dx <= 0 ? 15 : -15,
                    opacity: 0,
                    scale: 1,
                    duration: 2,
                    
                    onComplete: () => {
                        // Reset before the element is reused.
                        gsap.set(img, {
                            yPercent: 0,
                            opacity: 1,
                            filter: "blur(0px)",
                        });

                        // Prepare the next image for this pool slot.
                        img.src = images[nextImageIndex % images.length];
                        nextImageIndex++;

                        gsap.set(container, {
                            autoAlpha: 0,
                            clearProps: 'left,right,top,bottom',
                        });

                        item.active = false;
                    },
                },
                ">-25%"
            );

        };

        const handleMouseMove = (event: MouseEvent) => {
            const x = event.clientX;
            const y = event.clientY;

            if (!initialized) {
                previousX = lastSpawnX = x;
                previousY = lastSpawnY = y;
                initialized = true;
                return;
            }

            const dx = x - previousX;
            const dy = y - previousY;

            previousX = x;
            previousY = y;

            // Euclidean distance from the last spawn.
            const traveled = Math.hypot(
                x - lastSpawnX,
                y - lastSpawnY
            );

            if (traveled < threshold) return;

            spawnImage(x, y, dx, dy);

            lastSpawnX = x;
            lastSpawnY = y;
        };

        document.body.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.body.removeEventListener('mousemove', handleMouseMove);

            gsap.killTweensOf(document.body);

            pool.forEach(({ container, img }) => {
                gsap.killTweensOf(container);
                gsap.killTweensOf(img);
            });
        };
    }, [images, poolSize, threshold]);

    return (
        <div
            className=" w-screen h-screen relative bg-black"
        >
            {Array.from({ length: poolSize }, (_, index) => (
                <div
                    key={index}
                    ref={(el) => {
                        poolRefs.current[index] = el;
                    }}
                    className="image-trail__item"
                    style={{
                        position: 'absolute',
                        zIndex: 1,
                        width: size,
                        height: size,
                        pointerEvents: 'none',
                        willChange: 'transform, opacity',
                    }}
                >
                    <img
                        src={images[index % images.length]}
                        alt=""
                        draggable={false}
                        style={{
                            display: 'block',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            willChange: 'transform, opacity',
                        }}
                    />
                </div>
            ))}
        </div>
    );
}
