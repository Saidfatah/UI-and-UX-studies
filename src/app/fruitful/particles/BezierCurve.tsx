'use client'
import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Particle, Point } from './types';
import { easeInOutCirc } from './utils';



const scale_0_to_1_threshold = 0.2;
const scale_1_to_0_threshold = 0.7;
const alpha_0_to_1_threshold = 0.2;
const alpha_1_to_0_threshold = 0.7;
const distanceFromOrigin = 100
var numOfPoints = 200;




// Function to calculate points on a Bezier curve
function calculateBezierPoints(p0: Point, p3: Point, numOfPoints: number): Point[] {
    const points: Point[] = [];

    // Generate control points p1 and p2 within a reasonable range relative to p0 and p3
    const p1 = {
        x: p0.x + (p3.x - p0.x) * 0.5 + (Math.random() - 0.75) * 200,
        y: p0.y + (p3.y - p0.y) * 0.25 + (Math.random() - 0.75) * 200,
    };
    const p2 = {
        x: p0.x + (p3.x - p0.x) * 0.75 + (Math.random() - 0.5) * 200,
        y: p0.y + (p3.y - p0.y) * 0.9 + (Math.random() - 0.5) * 200,
    };

    for (let t = 0; t <= 1; t += 1 / numOfPoints) {
        const x =
            Math.pow(1 - t, 3) * p0.x +
            3 * Math.pow(1 - t, 2) * t * p1.x +
            3 * (1 - t) * Math.pow(t, 2) * p2.x +
            Math.pow(t, 3) * p3.x;
        const y =
            Math.pow(1 - t, 3) * p0.y +
            3 * Math.pow(1 - t, 2) * t * p1.y +
            3 * (1 - t) * Math.pow(t, 2) * p2.y +
            Math.pow(t, 3) * p3.y;
        points.push({ x, y });
    }

    return points;
}

const getRandomPositionInScreen = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const randomX = Math.floor(Math.random() * screenWidth);
    const randomY = Math.floor(Math.random() * screenHeight);

    return { x: randomX, y: randomY };
};


const getBezierCurveAnchorPoints = (x: number, y: number, direction: any) => {
    let offsetX = Math.random() * 60 + distanceFromOrigin;
    if (Math.random() < 0.5) offsetX = -offsetX;
    const targetX = x + offsetX;

    let offsetY;
    if (direction === 'top') {
        offsetY = -(Math.random() * 60 + distanceFromOrigin); // Ensure targetY is above y
    } else {
        offsetY = Math.random() * 60 + distanceFromOrigin;
        if (Math.random() < 0.5) offsetY = -offsetY;
    }
    const targetY = y + offsetY;

    return {
        initialPoint: {
            x, y
        },
        endPoint: {
            x: targetX, y: targetY
        }
    }
}
const createParticle = (x: number, y: number, direction = 'any'): Particle => {

    const {
        initialPoint,
        endPoint
    } = getBezierCurveAnchorPoints(x, y, direction)

    const points = calculateBezierPoints(initialPoint, endPoint, numOfPoints);

    const minRotationAngle = 30;
    const maxRotationAngle = 75;
    const rotationSwing =
        (Math.random() < 0.5 ? 1 : -1) *
        (Math.random() * (maxRotationAngle - minRotationAngle) + minRotationAngle);

    return {
        curvePathPoints: points,
        scale: 10,
        rotationAngle: 0,
        targetScale: 10 * Math.random() + 5,
        initialDistance: points.length,
        rotationSwing,
        pointIndex: 0,
        alpha: 1,
    };
};


const BezierAnimation = forwardRef((props, ref) => {
    const canvasRef = useRef(null);
    let isPressed = false
    const particlesRef = useRef<Particle[]>([]);

    useImperativeHandle(ref, () => ({
        createParticlesAt(x: number, y: number, width: number) {
            const numberOfParticles = 10;
            const step = width / (numberOfParticles - 1); // Calculate the step to evenly distribute particles

            for (let i = 0; i < numberOfParticles; i++) {
                const px = x + i * step; // Calculate the x position for each particle
                const py = y; // The y position remains the same for a horizontal line
                particlesRef.current.push(createParticle(px, py, 'top'));
            }
        }
    }));


    useEffect(() => {
        const particles = particlesRef.current

        const canvas: any = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let requestId: any;
        let finishedPathAnimation = false
        let player = {
            x: 0,
            y: 0,
            scale: 10
        }



        const renderPointsAlongCircleOutline = (originX: number, originY: number) => {
            // Create 10 particles in a circle
            const numParticles = Math.random() * 30;
            const angleIncrement = (2 * Math.PI) / numParticles;
            const radius = Math.random() * 100;

            for (let i = 0; i < numParticles; i++) {
                const angle = i * angleIncrement;
                const particleX = originX + radius * Math.cos(angle);
                const particleY = originY + radius * Math.sin(angle);

                particles.push(createParticle(particleX, particleY));
            }

        }


        const mousedown = (event: MouseEvent) => {
            const x = event.clientX - canvas.offsetLeft;
            const y = event.clientY - canvas.offsetTop;
            isPressed = true
            // renderPointsAlongCircleOutline(x, y)
            particles.push(createParticle(x, y));
        };

        document.addEventListener('mousedown', mousedown);


        const onMouseUp = (event: MouseEvent) => {
            isPressed = false
        };

        document.addEventListener('mouseup', onMouseUp);



        const onMouseMove = (event: MouseEvent) => {
            if (isPressed) {
                const x = event.clientX - canvas.offsetLeft;
                const y = event.clientY - canvas.offsetTop;

                
                particles.map(particle => {
                    const {
                        initialPoint,
                        endPoint
                    } = getBezierCurveAnchorPoints(x, y, 'top')
                    particle.curvePathPoints = calculateBezierPoints(initialPoint, endPoint, numOfPoints)
                })
            }
        };

        document.addEventListener('mousemove', onMouseMove);


        const getDistanceToTarget = (p: Particle) => {
            if (p.initialDistance === 0) p.initialDistance = p.curvePathPoints.length - p.pointIndex
            return p.curvePathPoints.length - p.pointIndex;
        };

        const updateScaleBasedOnDistanceToTarget = (p: Particle) => {
            const initialDistance = p.initialDistance
            const currentDistance = getDistanceToTarget(p);

            const distanceCovered = parseFloat((1 - currentDistance / initialDistance).toFixed(2))

            if (distanceCovered <= scale_0_to_1_threshold) {
                // Scale goes from 0 to p.scale
                const progress = parseFloat((distanceCovered / scale_0_to_1_threshold).toFixed(2))
                const easedProgress = easeOutBack(progress);
                p.scale = easedProgress * p.targetScale;
            } else if (distanceCovered >= scale_1_to_0_threshold) {
                // Scale goes from p.scale to 0
                const easedProgress = easeOutQuint(((1 - distanceCovered) / (1 - scale_1_to_0_threshold))) * p.targetScale;
                p.scale = easedProgress;
            } else {
                // Scale stays at p.scale
                p.scale = p.targetScale;
            }
        };

        const updateRotationBasedOnDistanceToTarget = (p: Particle) => {
            const initialDistance = p.initialDistance;
            const currentDistance = getDistanceToTarget(p);

            const distanceCovered = parseFloat((1 - currentDistance / initialDistance).toFixed(2));

            if (distanceCovered <= 0.25) {
                // Rotation goes from 0 deg to 45 deg
                const progress = parseFloat((distanceCovered / 0.25).toFixed(2));
                const easedProgress = easeInQuint(progress);
                p.rotationAngle = easedProgress * p.rotationSwing;
            } else if (distanceCovered <= 0.5) {
                // Rotation goes from 45 deg to 0 deg
                const progress = parseFloat(((distanceCovered - 0.25) / 0.25).toFixed(2));
                const easedProgress = easeInOut(progress);
                p.rotationAngle = (p.rotationSwing - (easedProgress * p.rotationSwing));
            } else if (distanceCovered <= 0.75) {
                // Rotation goes from 0 deg to -45 deg
                const progress = parseFloat(((distanceCovered - 0.5) / 0.25).toFixed(2));
                const easedProgress = easeInQuint(progress);
                p.rotationAngle = -easedProgress * p.rotationSwing;
            } else {
                // Rotation goes from -45 deg to 0 deg
                const progress = parseFloat(((distanceCovered - 0.75) / 0.25).toFixed(2));
                const easedProgress = easeInOut(progress);
                p.rotationAngle = (-p.rotationSwing + (easedProgress * p.rotationSwing));
            }
        };

        const updateAlphaBasedOnDistanceToTarget = (p: Particle) => {
            const initialDistance = p.initialDistance;
            const currentDistance = getDistanceToTarget(p);

            const distanceCovered = parseFloat((1 - currentDistance / initialDistance).toFixed(2));

            if (distanceCovered <= alpha_0_to_1_threshold) {
                // Alpha goes from 0 to 1
                const progress = parseFloat((distanceCovered / alpha_0_to_1_threshold).toFixed(2));
                p.alpha = progress;
            } else if (distanceCovered >= alpha_1_to_0_threshold) {
                // Alpha goes from 1 to 0
                p.alpha = 1 - ((distanceCovered - alpha_1_to_0_threshold) / (1 - alpha_1_to_0_threshold));
            } else {
                // Alpha stays at 1
                p.alpha = 1;
            }
        };

        const renderRect = (size: number) => {
            ctx.moveTo(-size, -size); // top-left corner
            ctx.lineTo(size, -size); // top-right corner
            ctx.lineTo(size, size); // bottom-right corner
            ctx.lineTo(-size, size); // bottom-left corner
            ctx.closePath();

            ctx.fill();
            ctx.restore();
        }

        const prepareRendererThenRenderRect = (point: Point, particle: Particle) => {
            ctx.save();
            ctx.translate(point.x, point.y);
            ctx.beginPath();
            const progress = particle.pointIndex / particle.curvePathPoints.length

            ctx.fillStyle = `rgba(${(Math.random() * 1 + progress) * 255}, ${(Math.random() * 1 + progress) * 255}, ${(Math.random() * 1 + progress) * 255}, ${particle.alpha})`;

            ctx.rotate(particle.rotationAngle * Math.PI / 180);

            // Draw a rectangle with width and height based on particle.scale
            renderRect(particle.scale / 2)
        }


        function renderRectAlongBezierPathPoints(particle: Particle) {
            const points = particle.curvePathPoints;
            const numOfPoints = points.length;

            // Apply easing function to the point index
            const easedPointIndex = easeInOutCirc(particle.pointIndex / numOfPoints) * numOfPoints;

            if (easedPointIndex < numOfPoints) {
                prepareRendererThenRenderRect(points[Math.floor(easedPointIndex)], particle);
                particle.pointIndex++;
                finishedPathAnimation = false
            } else {
                finishedPathAnimation = true
            }
        }

        function renderRectAlongBezierPathPointsAllAtOnce(particle: Particle) {
            const points = particle.curvePathPoints;

            for (let index = 0; index < points.length; index++) {
                const element = points[index];
                prepareRendererThenRenderRect(element, particle);
            }
        }

        const renderParticlesWithScaleAlphaRotationAdjustments = () => {
            particles.forEach(particle => {
                updateAlphaBasedOnDistanceToTarget(particle)
                updateRotationBasedOnDistanceToTarget(particle)
                updateScaleBasedOnDistanceToTarget(particle)
                renderRectAlongBezierPathPoints(particle)
            })
        }

        const renderDestinationFullPath = () => {
            particles.forEach(particle => {
                particle.scale = 2
                renderRectAlongBezierPathPointsAllAtOnce(particle)
            })
        }


        const setInitialPlayerPosition = () => {
            const { x, y } = getRandomPositionInScreen()
            player.x = x
            player.y = y
        }


        const renderPlayer = () => {
            ctx.translate(player.x, player.y);
            renderRect(player.scale / 2)
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (isPressed && particles.length) {
                renderDestinationFullPath()
                renderPlayer()
            } else {
                renderParticlesWithScaleAlphaRotationAdjustments()

            }



            requestId = requestAnimationFrame(animate);
        }

        setInitialPlayerPosition();

        animate();

        return () => {
            cancelAnimationFrame(requestId);
        };
    }, []);

    return <canvas className='fixed top-0  pointer-events-none z-[99] left-0' ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />;
});

export default BezierAnimation;