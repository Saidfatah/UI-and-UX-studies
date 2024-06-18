export type Point = {
    x: number;
    y: number;
};

export type Particle = {
    curvePathPoints: Point[]
    alpha: number;
    scale: number;
    targetScale: number;
    rotationAngle: number;
    rotationSwing: number;
    initialDistance: number;
    pointIndex: number;
};
