import { P5jsSketch } from "../p5Container";
import p5 from 'p5'

const imageUrl = "/images/saidFatahImage.jpeg"
const imageWidth = 800
const imageHeight = 800

let img: any;
const RESOLUTION = 5
let particles: any[] = []
const PARTICLE_SIZE = 5;

const MAX_FORCE = 10
const MIN_FORCE = 0


export const ParticlesSketch: P5jsSketch = (p, parentRef) => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(parentRef);
        p.angleMode(p.DEGREES);


        p.loadImage(imageUrl, (loadedImage) => {
            img = loadedImage;
            spawnParticles(img);
        });
    };

    p.draw = () => {
        p.background(40);

        if (img) {
            for (let i = 0; i < particles.length; i++) {
                particles[i].update()
                particles[i].draw()
            }
        }
    };


    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };


    const spawnParticles = (img: any) => {
        for (let i = RESOLUTION; i < img.width; i += RESOLUTION) {
            for (let j = RESOLUTION; j < img.height; j += RESOLUTION) {
                const color = img.get(i, j) // this always returns [0,0,0,0]
                console.log(color)
                particles.push(new Particle(i, j, color, p))
            }
        }
    }

};


class Particle {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    color: any;
    p: any;

    constructor(x: number, y: number, color: any, p: any) {
        this.x = x
        this.y = y
        this.targetX = x
        this.targetY = x
        this.color = color
        this.p = p
    }

    update() {
        const p = this.p
        let mouseVector = p.createVector(p.mouseX, p.mouseY)
        let currentVector = p.createVector(this.x, this.y)
        let targetVector = p.createVector(this.targetX, this.targetY)

        let fromMouseParticleVector = p5.Vector.sub(currentVector, mouseVector)
        let distanceToMouse = fromMouseParticleVector.mag()

        let particleToTargetVector = p5.Vector.sub(targetVector, currentVector)
        let distanceToTarget = particleToTargetVector.mag()

        let totalForces = p.createVector(0, 0);

        if (distanceToMouse < 50) {
            let repulsionForce = p.map(distanceToMouse, 0, 50, MAX_FORCE, MIN_FORCE)
            fromMouseParticleVector.setMag(repulsionForce)
            totalForces.add(fromMouseParticleVector)
        }

        if (distanceToMouse > 0) {
            let attractionForce = p.map(distanceToTarget, 0, 50, MIN_FORCE, MAX_FORCE)
            particleToTargetVector.setMag(attractionForce)
            totalForces.add(particleToTargetVector)
        }

        this.x += totalForces.x
        this.y += totalForces.y
    }

    draw() {
        this.p.fill(this.color)
        this.p.noStroke()
        this.p.ellipse(this.x, this.y, PARTICLE_SIZE)
    }
}