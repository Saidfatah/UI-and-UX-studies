
'use client';

import { useEffect, useRef, useState } from 'react';

type Vector = {
    x: number;
    y: number;
};

function normalize(vector: Vector): Vector {
    const length = Math.hypot(vector.x, vector.y);

    return {
        x: vector.x / length,
        y: vector.y / length,
    };
}

function createRandomDirection(): Vector {
    return normalize({
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
    });
}

const imageWidth = (700 - (8 * 6)) / 6;
const imageHeight = imageWidth / (3 / 2);

class ImageBouncer {
    private images: HTMLImageElement[];
    private container: HTMLDivElement;

    private containerWidth: number;
    private containerHeight: number;

    private idleSpeed = 100;
    private steering = 0.1;

    private canStartTransition = false;
    private transitionFactor = 1;

    private directions: Vector[];
    private velocities: Vector[];
    private origins: Vector[];
    private positions: Vector[];

    private previousTime = performance.now();

    constructor(
        images: HTMLImageElement[],
        container: HTMLDivElement
    ) {
        this.images = images;
        this.container = container;
        this.containerWidth = container.offsetWidth;
        this.containerHeight = container.offsetHeight;

        this.directions = images.map(() => createRandomDirection());

        this.velocities = images.map(() => ({
            x: 0,
            y: 0,
        }));


        const containerRect = container.getBoundingClientRect();
        this.origins = images.map((image) => {
            const parentDiv = image.parentElement?.parentElement

            const rect = parentDiv?.getBoundingClientRect() ?? { left: 0, top: 0 };

            return {
                x: rect.left - containerRect.left,
                y: rect.top - containerRect.top,
            };
        });

        this.positions = images.map(() => ({
            x: Math.random() * (this.containerWidth - imageWidth),
            y: Math.random() * (this.containerHeight - imageHeight),
        }));

        this.images.forEach((image) => {
            image.classList.add('absolute');

            image.style.width = `${imageWidth}px`;
            image.style.height = `${imageHeight}px`;

            image.style.opacity = "1"
        });
    }

    start() {
        requestAnimationFrame(this.onRaf);
    }

    startTransition() {
        this.canStartTransition = true
    }

    private onRaf = (time: number) => {
        const elapsedTime = (time - this.previousTime) / 1000;

        this.previousTime = time;

        this.images.forEach((image, index) => {
            const direction = this.directions[index];
            const velocity = this.velocities[index];
            const position = this.positions[index];

            // --------------------------------
            // 1. Steer velocity
            // --------------------------------

            const targetVelocity = {
                x: direction.x * this.idleSpeed,
                y: direction.y * this.idleSpeed,
            };

            velocity.x +=
                (targetVelocity.x - velocity.x) *
                this.steering *
                elapsedTime;

            velocity.y +=
                (targetVelocity.y - velocity.y) *
                this.steering *
                elapsedTime;

            // --------------------------------
            // 2. Move wandering position
            // --------------------------------

            position.x += velocity.x * elapsedTime;
            position.y += velocity.y * elapsedTime;

            // --------------------------------
            // 3. Boundaries
            // --------------------------------

            const minX = 0;
            const maxX = this.containerWidth - imageWidth;

            const minY = 0;
            const maxY = this.containerHeight - imageHeight;

            if (position.y <= minY) {
                position.y = minY;
                direction.y *= -1;
                velocity.y *= -1;
            }

            if (position.y >= maxY) {
                position.y = maxY;
                direction.y *= -1;
                velocity.y *= -1;
            }

            if (position.x <= minX) {
                position.x = minX;
                direction.x *= -1;
                velocity.x *= -1;
            }

            if (position.x >= maxX) {
                position.x = maxX;
                direction.x *= -1;
                velocity.x *= -1;
            }

            // --------------------------------
            // 4. Transition
            // --------------------------------

            if (this.canStartTransition) {
                this.transitionFactor -= elapsedTime;

                if (this.transitionFactor < 0) {
                    this.transitionFactor = 0;
                }
            }

            // --------------------------------
            // 5. Render
            // --------------------------------

            const origin = this.origins[index]
            const x =
                origin.x +
                (position.x - origin.x) * this.transitionFactor;

            const y =
                origin.y +
                (position.y - origin.y) * this.transitionFactor;

            image.style.transform = `
            translate(${x}px, ${y}px)
        `;
        });

        requestAnimationFrame(this.onRaf);
    };
}

export default function Poster() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [startIntroTransition, setStartIntroTransition] = useState(false);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        const images = Array.from(
            container.querySelectorAll<HTMLImageElement>('img')
        );

        const bouncer = new ImageBouncer(images, container);

        if (startIntroTransition) bouncer.startTransition()

        bouncer.start();
    }, [startIntroTransition]);

    return (
        <div className="relative flex justify-center items-center w-screen h-screen overflow-hidden">
            <div
                onClick={() => {
                    setStartIntroTransition(true);
                }}
                ref={containerRef}
                className="relative bg-black grid grid-cols-6 grid-rows-2 gap-2 w-[700px] h-[500px] overflow-hidden"
            >
                {/* Row 1 — spacer */}
                {/* <div /> */}

                <div className="col-span-1 col-start-4 bg-red-50">
                    <div className=''>
                        <img
                            alt=""
                            src="/images/saidFatahImage.jpeg"
                            className="opacity-0 w-full h-auto object-cover"
                        />
                    </div>
                </div>

                {/*
                <div className="col-span-2 col-start-5">
                    <img
                        alt=""
                        src="/images/saidFatahImage.jpeg"
                        className="opacity-100 w-full h-auto object-cover"
                    />
                </div>

                <div className="col-span-2" />

                <div className="col-span-1">
                    <img
                        alt=""
                        src="/images/saidFatahImage.jpeg"
                        className="opacity-100 w-full h-auto object-cover"
                    />
                </div>

                <div className="col-span-1" />

                <div className="col-span-1">
                    <img
                        alt=""
                        src="/images/saidFatahImage.jpeg"
                        className="opacity-100 w-full h-auto object-cover"
                    />
                </div>

                <div className="col-span-1">
                    <img
                        alt=""
                        src="/images/saidFatahImage.jpeg"
                        className="opacity-100 w-full h-auto object-cover"
                    />
                </div>

                <div className="col-span-1">
                    <img
                        alt=""
                        src="/images/saidFatahImage.jpeg"
                        className="opacity-100 w-full h-auto object-cover"
                    />
                </div> */}
            </div>
        </div>
    );
}

