

export type Bt = {
    x: number;
    y: number;
};

export type PosterState = {
    _BCR: DOMRect;

    _position: Bt;

    _distanceFromMouse: number;

    _idleSpeed: number;
    _idleDirection: Bt;

    _velocity: Bt;
    _acceleration: Bt;
};



export const cubicBezier=(
    t: number,
    p0: number,
    p1: number,
    p2: number,
    p3: number
)=> {
    const inverse = 1 - t;

    return (
        inverse * inverse * inverse * p0 +
        3 * inverse * inverse * t * p1 +
        3 * inverse * t * t * p2 +
        t * t * t * p3
    );
}

export const quadOut = (t: number)=> {
    return 1 - (1 - t) * (1 - t);
}

export const  createVector=(x = 0, y = 0): Bt=> {
    return { x, y };
}

export const  cloneVector=(vector: Bt): Bt=> {
    return {
        x: vector.x,
        y: vector.y,
    };
}

export const  addVectors=(a: Bt, b: Bt): Bt=> {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
    };
}

export const  subtractVectors=(a: Bt, b: Bt): Bt=> {
    return {
        x: a.x - b.x,
        y: a.y - b.y,
    };
}

export const  multiplyVector=(vector: Bt, value: number): Bt=> {
    return {
        x: vector.x * value,
        y: vector.y * value,
    };
}

export const  getVectorLength=(vector: Bt): number=> {
    return Math.sqrt(
        vector.x * vector.x +
        vector.y * vector.y
    );
}

export const  normalizeVector=(vector: Bt): Bt=> {
    const length = getVectorLength(vector);

    if (length === 0) {
        return createVector(0, 0);
    }

    return {
        x: vector.x / length,
        y: vector.y / length,
    };
}

export const  getDistance=(a: Bt, b: Bt): number=> {
    return getVectorLength(
        subtractVectors(a, b)
    );
}

export const  clamp=( value: number, min: number, max: number) =>{
    return Math.min(
        max,
        Math.max(min, value)
    );
}




export const createRandomIdleDirection=(): Bt=> {
    const direction = createVector(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
    );

    // Same fallback as the source:
    //
    // if (direction.len() === 0)
    //     direction.set(1, random)
    //
    if (getVectorLength(direction) === 0) {
        direction.x = 1;
        direction.y = Math.random() * 2 - 1;
    }

    return normalizeVector(direction);
}

export const createRandomPosterPosition=(
    viewportWidth: number,
    viewportHeight: number,
    BCR: DOMRect
): Bt =>{
    return createVector(
        (Math.random() * 2 - 1) *
        (viewportWidth / 2 + BCR.width / 2) *
        0.5,

        (Math.random() * 2 - 1) *
        (viewportHeight / 2 + BCR.height / 2) *
        0.5
    );
}


// --------------------------------------------------
// Mouse interaction
// --------------------------------------------------

export const getMouseRepulsion=(
    mouse: Bt,
    posterCenter: Bt,
    distanceFromMouse: number,
    f: number,
    c: number,
    e: number
): Bt | null => {
    if (
        distanceFromMouse >= f ||
        distanceFromMouse <= 0.1
    ) {
        return null;
    }

    let direction = subtractVectors(
        posterCenter,
        mouse
    );

    if (distanceFromMouse > 1) {
        direction = normalizeVector(direction);
    } else {
        direction = createVector(0, 0);
    }

    // Stronger when the mouse is closer.
    let S = 1 - distanceFromMouse / f;

    S = Math.pow(S, 0.9);

    const E = c * S;

    return multiplyVector(
        direction,
        E * e
    );
}


// --------------------------------------------------
// Velocity / acceleration
// --------------------------------------------------

export const dampAcceleration=(
    acceleration: Bt,
    e: number,
    Ln: number
)=> {
    const damping = Math.pow(
        0.5,
        e * Ln
    );

    acceleration.x *= damping;
    acceleration.y *= damping;
}

export const dampVelocity=(
    velocity: Bt,
    e: number,
    Ln: number
) =>{
    const g = 0.99;

    const damping = Math.pow(
        g,
        e * Ln
    );

    velocity.x *= damping;
    velocity.y *= damping;
}

export const steerTowardsIdleDirection=(
    velocity: Bt,
    idleDirection: Bt,
    idleSpeed: number,
    e: number,
    Ln: number
)=> {
    const targetVelocity = multiplyVector(
        idleDirection,
        idleSpeed
    );

    const difference = subtractVectors(
        targetVelocity,
        velocity
    );

    const v = 0.07 * Ln;

    velocity.x += difference.x * v * e;
    velocity.y += difference.y * v * e;
}


// --------------------------------------------------
// Position / boundaries
// --------------------------------------------------

export const getPosterBounds=(
    viewportWidth: number,
    viewportHeight: number,
    BCR: DOMRect
) =>{
    return {
        minX:
            -viewportWidth / 2 +
            BCR.width / 2 -
            1,

        maxX:
            viewportWidth / 2 -
            BCR.width / 2 +
            1,

        minY:
            -viewportHeight / 2 +
            BCR.height / 2 -
            1,

        maxY:
            viewportHeight / 2 -
            BCR.height / 2 +
            1,
    };
}

export const applyHorizontalBoundary=(
    poster: PosterState,
    minX: number,
    maxX: number
) =>{
    if (
        poster._position.x >= maxX ||
        poster._position.x <= minX
    ) {
        poster._position.x = clamp(
            poster._position.x,
            minX,
            maxX
        );

        poster._velocity.x *= -1;
        poster._idleDirection.x *= -1;
        poster._acceleration.x = 0;
    }
}

export const applyVerticalBoundary=(
    poster: PosterState,
    minY: number,
    maxY: number
)=> {
    if (
        poster._position.y >= maxY ||
        poster._position.y <= minY
    ) {
        poster._position.y = clamp(
            poster._position.y,
            minY,
            maxY
        );

        poster._velocity.y *= -1;
        poster._idleDirection.y *= -1;
        poster._acceleration.y = 0;
    }
}


// --------------------------------------------------
// Transition back to original position
// --------------------------------------------------

export const fit=(
    value: number,
    inputMin: number,
    inputMax: number,
    outputMin: number,
    outputMax: number
) =>{
    const progress =
        (value - inputMin) /
        (inputMax - inputMin);

    return outputMin +
        progress *
        (outputMax - outputMin);
}



export const getPosterTransitionProgress=(
    transitionRatio: number,
    index: number,
    posterCount: number
) =>{
    // Same stagger used by the source:
    //
    // y = quadOut(r / count) * .5
    //
    const y =
        quadOut(index / posterCount) *
        0.5;

    return fit(
        transitionRatio,
        0,
        0.5 + y,
        0,
        1
    );
}

export const getTransitionMultiplier=(
    transitionRatio: number,
    index: number,
    posterCount: number
)=> {
    const progress =
        getPosterTransitionProgress(
            transitionRatio,
            index,
            posterCount
        );

    const w = 0.05;

    const easedProgress =
        cubicBezier(
            progress,
            1 - w,
            w,
            w,
            1 - w
        );

    return 1 - easedProgress;
}