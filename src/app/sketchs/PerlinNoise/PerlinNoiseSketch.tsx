import { P5jsSketch } from "../p5Container";

const num = 1000;
const particles: any = [];
const noiseScale = 0.02; // Adjusted noise scale for more noticeable effect
const stepSize = 5; // Smaller step size for finer movement

export const PerlinNoiseSketch: P5jsSketch = (p, parentRef) => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(parentRef);

        for (let i = 0; i < num; i++) {
            particles.push(p.createVector(p.random(p.windowWidth), p.random(p.windowHeight)));
        }

        p.strokeWeight(2);
        p.noFill();
    };

    p.mouseReleased = () => {
        p.noiseSeed(p.millis());
    };

    p.draw = () => {
        p.background(0, 10);

        // Animate stroke color
        const colorPhase = p.map(p.sin(p.millis() * 0.001), -1, 1, 0, 100);
        p.stroke(colorPhase, 100, 255 - colorPhase);

        for (let i = 0; i < num; i++) {
            const particle = particles[i];
            p.point(particle.x, particle.y);

            const n = p.noise((particle.x + p.mouseX) * noiseScale, (particle.y + p.mouseY) * noiseScale) *-p.cos(p.mouseX);
            const a = p.TAU * n;

            particle.x += p.cos(a) * stepSize;
            particle.y += p.sin(a) * stepSize;

            if (!onScreen(particle)) {
                particle.x = p.random(p.windowWidth);
                particle.y = p.random(p.windowHeight);
            }
        }
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    function onScreen(v: any) {
        return v.x >= 0 && v.x <= p.windowWidth && v.y >= 0 && v.y <= p.windowHeight;
    }
};
