import { P5jsSketch } from "./p5Container";

export const MySketch: P5jsSketch = (p, parentRef) => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(parentRef);
        p.angleMode(p.DEGREES);
    };

    p.draw = () => {
        p.background(0);
        p.translate(p.windowWidth / 2, p.windowHeight / 2);

        for (let index = 0; index < 20; index++) {
            p.rotate(60);
            drawRing(p, index * 50);
        }


    };

    const drawRing = (p: any, offsset: number) => {
        const mag = p.windowWidth / 10;

        const smoothFrame = p.frameCount / 2
        for (let angle = 0; angle < 360; angle += 5) {
            const x = p.cos(smoothFrame + p.mouseX + angle) * (mag + smoothFrame / 4) + offsset;
            const y = p.sin(smoothFrame + p.mouseY + angle) * (mag + smoothFrame / 4) + offsset;

            p.fill(p.cos(angle + smoothFrame) * 256, p.sin(smoothFrame) * 256, 1);
            p.stroke(0);
            p.strokeWeight(1);
            p.ellipse(x, y, 50 * smoothFrame / 100);
            // p.rect(x, x, 55, 55);
            p.filter = "blur(5px)"
        }
    };

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
};