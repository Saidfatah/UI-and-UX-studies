'use client';

import { useEffect, useRef } from 'react';

type Vector = {
    x: number;
    y: number;
};

function normalize(vector: Vector) {
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

const imageSrcs = [
    "/images/saidFatahImage.jpeg",
    "/images/Flag_of_Morocco.png",
]

const imageWidth = 300;

const getImageHeight = () => {
    const aspectRatio = 3 / 2;

    return imageWidth / aspectRatio;
};

const imageHeight = getImageHeight()

export default function Poster() {
    const posterRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const poster = posterRef.current;
        const container = containerRef.current;

        if (!container || !poster) return;

        let hasRevealed = false;

        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        let currentSrcIndex = 0;

        // intialize stuff
        poster.src = imageSrcs[currentSrcIndex]
        poster.classList.add('absolute')

        poster.style.top = '0';
        poster.style.left = '0';

        let _position = {
            x: Math.random() * (containerWidth - imageWidth),
            y: Math.random() * (containerHeight - imageHeight),
        };



        const _idleDirection = createRandomDirection();

        const _idleSpeed = 100;


        const steering = 0.1;

        const _velocity = {
            x: 0,
            y: 0,
        };


        let previousTime = performance.now();

        function switchImage() {
            if (!poster) return;

            currentSrcIndex = currentSrcIndex === 0 ? 1 : 0;
            poster.src = imageSrcs[currentSrcIndex];
        }


        function onRaf(time: number) {
            const elapsedTime = (time - previousTime) / 1000;
            previousTime = time;


            const targetVelocity = {
                x: _idleDirection.x * _idleSpeed,
                y: _idleDirection.y * _idleSpeed,
            };


            _velocity.x +=
                (targetVelocity.x - _velocity.x) *
                steering *
                elapsedTime;

            _velocity.y +=
                (targetVelocity.y - _velocity.y) *
                steering *
                elapsedTime;

            // accelaration += (elapsedTime / 1000) * 5;


            _position.x += _velocity.x * elapsedTime;
            _position.y += _velocity.y * elapsedTime;

            // --------------------------------
            // 4. Container boundaries
            // --------------------------------

            if (!container) return;

            const minX = 0;
            const maxX = containerWidth - imageWidth;

            const minY = 0;
            const maxY = containerHeight - imageHeight;

            let hitBoundary = false;

            // Hit top
            if (_position.y <= minY) {
                _position.y = minY;
                _idleDirection.y *= -1;
                _velocity.y *= -1;
                hitBoundary = true;
            }

            // Hit bottom
            if (_position.y >= maxY) {
                _position.y = maxY;
                _idleDirection.y *= -1;
                _velocity.y *= -1;
                hitBoundary = true;
            }

            // Hit left
            if (_position.x <= minX) {
                _position.x = minX;
                _idleDirection.x *= -1;
                _velocity.x *= -1;
                hitBoundary = true;
            }

            // Hit right
            if (_position.x >= maxX) {
                _position.x = maxX;
                _idleDirection.x *= -1;
                _velocity.x *= -1;
                hitBoundary = true;
            }

            if (hitBoundary) {
                hitBoundary = false
                switchImage();
            }

            if (!poster) return;

            poster.style.transform = `translate(
                ${_position.x}px,
                ${_position.y}px
            )`;

            if (!hasRevealed) {
                poster.style.transition = "opacity 2s cubic-bezier(0.65, 0, 0.35, 1)"
                poster.style.opacity = "1"
            }

            requestAnimationFrame(onRaf);
        }

        requestAnimationFrame(onRaf);
    }, []);

    return (
        <div className="relative flex justify-center items-center w-screen h-screen overflow-hidden">

            <div
                ref={containerRef}
                className="relative bg-black flex justify-center items-center w-[700px] h-[500px] overflow-hidden"
            >
                <img
                    ref={posterRef}
                    alt=""
                    className=" opacity-0 w-[300px] aspect-[3/2] object-cover"
                />
            </div>
        </div>
    );
}