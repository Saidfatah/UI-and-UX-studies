import React, { useRef, useEffect } from 'react';
import { easeInOutBack } from './utils';

interface Particle {
    posX: number;
    posY: number;
    targetXInitial: number;
    targetYInitial: number;
    targetX: number;
    targetY: number;
    alpha: number;
    scale: number;
    targetScale: number;
    rotationAngle: number;
    rotationSwing: number;
    initialDistance: number;
}


const stepIncrement = 0.75;
const minDistanceToTargetThreshold = 1;
const scale_0_to_1_threshold = 0.2;
const scale_1_to_0_threshold = 0.8;
const alpha_0_to_1_threshold = 0.2;
const alpha_1_to_0_threshold = 0.8;

const ParticlesCanvasComponent: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;


        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [canvasRef]);

    useEffect(() => {
        const canvas = canvasRef.current;
        let particles: Particle[] = []
        if (!canvas) return;

        const c = canvas.getContext('2d');
        if (!c) return;


        const onClick = (event: MouseEvent) => {
            const x = event.clientX - canvas.offsetLeft;
            const y = event.clientY - canvas.offsetTop;

            const randomParticlesCount = Math.floor(Math.random() * 4) + 1;
            // const randomParticlesCount = 1
            // particles.push(createParticleWithRandomTargetPosition(x, y));

            for (let i = 0; i < randomParticlesCount; i++) {
                particles.push(createParticleWithRandomTargetPosition(x, y));
            }
        };

        canvas.addEventListener('mousedown', onClick);

        const createParticleWithRandomTargetPosition = (x: number, y: number): Particle => {
            let offsetX = (Math.random() * 30) + 30;
            if (Math.random() < 0.5) offsetX = -offsetX;
            const targetX = x + offsetX;

            let offsetY = (Math.random() * 30) + 30;
            if (Math.random() < 0.5) offsetY = -offsetY;
            const targetY = y + offsetY;

            const minRotationAngle = 30;
            const maxRotationAngle = 75;
            const rotationSwing = (Math.random() < 0.5 ? 1 : -1) * (Math.random() * (maxRotationAngle - minRotationAngle) + minRotationAngle);

            return {
                posX: x,
                posY: y,
                targetX,
                targetXInitial: targetX,
                targetY,
                targetYInitial: targetY,
                alpha: 1,
                targetScale: 10,
                scale: 0,
                rotationAngle: 0,
                rotationSwing: rotationSwing,
                initialDistance: 0,
            };
        };


        const getCenterCoordinates = (p: Particle) => {
            const halfScale = p.scale / 2;
            const centerX = p.posX + halfScale;
            const centerY = p.posY + halfScale;
            return { centerX, centerY };
        };

        const getDistanceToTarget = (p: Particle) => {
            const { centerX, centerY } = getCenterCoordinates(p);
            const dx = p.targetX - centerX;
            const dy = p.targetY - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (p.initialDistance === 0) p.initialDistance = distance

            return distance
        };

        const removeIfReachedDestination = (p: Particle) => {
            if (getDistanceToTarget(p) < minDistanceToTargetThreshold) particles = particles.filter((_, i) => i > 0)
        }


        const easedStep = (distance: number) => {
            const easingFactor = easeInOutBack(distance / 100);
            return stepIncrement
            return stepIncrement * easingFactor / 2
        }

        const calculateSinOffset = (dir: number, distance: number) => {
            // Calculate oscillation value based on the current distance traveled
            const oscillationValue = dir * Math.sin(distance * Math.PI / 100) * 2; // Adjust frequency and amplitude
            return 0
            return -dir * oscillationValue
        }

        const updateParticlePosition = (p: Particle) => {
            const { centerX, centerY } = getCenterCoordinates(p);
            let dirX = p.targetX - centerX;
            let dirY = p.targetY - centerY;

            const distance = getDistanceToTarget(p);

            // Stop updating if the particle is close enough to the target
            if (distance <= minDistanceToTargetThreshold) {
                return;
            }

            // Normalize direction
            dirX /= distance;
            dirY /= distance;

            const easedSpeed = easedStep(distance);

            const xv = dirX * easedSpeed;
            const vy = dirY * easedSpeed;

            const offsetSin = calculateSinOffset(dirX, distance)

            p.posX += xv + offsetSin;
            p.posY += vy + offsetSin;
        };


        const updateScaleBasedOnDistanceToTarget = (p: Particle) => {
            const initialDistance = p.initialDistance
            const currentDistance = getDistanceToTarget(p);

            const distanceCovered = parseFloat((1 - currentDistance / initialDistance).toFixed(2))

            if (distanceCovered <= scale_0_to_1_threshold) {
                // Scale goes from 0 to p.scale
                const progress = parseFloat((distanceCovered / scale_0_to_1_threshold).toFixed(2))
                p.scale = progress * p.targetScale;
            } else if (distanceCovered >= scale_1_to_0_threshold) {
                // Scale goes from p.scale to 0
                p.scale = ((1 - distanceCovered) / (1 - scale_1_to_0_threshold)) * p.targetScale;
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
                p.rotationAngle = progress * p.rotationSwing;
            } else if (distanceCovered <= 0.5) {
                // Rotation goes from 45 deg to 0 deg
                const progress = parseFloat(((distanceCovered - 0.25) / 0.25).toFixed(2));
                p.rotationAngle = (p.rotationSwing - (progress * p.rotationSwing));
            } else if (distanceCovered <= 0.75) {
                // Rotation goes from 0 deg to -45 deg
                const progress = parseFloat(((distanceCovered - 0.5) / 0.25).toFixed(2));
                p.rotationAngle = -progress * p.rotationSwing;
            } else {
                // Rotation goes from -45 deg to 0 deg
                const progress = parseFloat(((distanceCovered - 0.75) / 0.25).toFixed(2));
                p.rotationAngle = (-p.rotationSwing + (progress * p.rotationSwing));
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


        const renderRectWithPath = (p: Particle, c: CanvasRenderingContext2D) => {
            c.save();
            c.translate(p.posX, p.posY);
            c.beginPath();
            c.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;

            c.rotate(p.rotationAngle * Math.PI / 180);
       



            // Draw a rectangle with width and height based on p.scale
            const halfScale = p.scale / 2;
            c.moveTo(-halfScale, -halfScale); // top-left corner
            c.lineTo(halfScale, -halfScale); // top-right corner
            c.lineTo(halfScale, halfScale); // bottom-right corner
            c.lineTo(-halfScale, halfScale); // bottom-left corner
            c.closePath();

            c.fill();
            c.restore();
        }

        const renderParticle = (p: Particle, c: CanvasRenderingContext2D) => {
            updateParticlePosition(p);
            updateScaleBasedOnDistanceToTarget(p)
            updateRotationBasedOnDistanceToTarget(p)
            updateAlphaBasedOnDistanceToTarget(p)
            renderRectWithPath(p, c)
            removeIfReachedDestination(particles[0])
        };

        const updateParticlesInScene = (c: CanvasRenderingContext2D) => {
            for (let i = particles.length - 1; i >= 0; i--) {
                const particle = particles[i];
                renderParticle(particle, c);
                if (particle.alpha <= 0) {
                    particles.splice(i, 1);
                }
            }
        };
        const updateParticleInScene = (c: CanvasRenderingContext2D) => {
            if (particles.length)
                renderParticle(particles[0], c);

        };

        const draw = () => {
            try {
                c.clearRect(0, 0, canvas.width, canvas.height);

                updateParticlesInScene(c);

                // updateParticleInScene(c);

                requestAnimationFrame(draw);
            } catch (error) {
                console.log(error)
            }
        };


        draw();

        return () => {
            canvas.removeEventListener('mousedown', onClick);
        };
    }, [canvasRef]);



    return <canvas ref={canvasRef} id="canvas" />;
};

export default ParticlesCanvasComponent;
