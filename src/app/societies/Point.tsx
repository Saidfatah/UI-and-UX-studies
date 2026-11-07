export const PointStagger = 0.2
export const POINT_SIZE = 10;
export const POINT_NAME_GAP = 8;
export class Point {
    private _x: number;
    private _y: number;


    private acceleration = 0.05;
    private damping = 0.75;

    private _velocityX = 0;
    private _velocityY = 0;

    private _targetVelocityX = 0;
    private _targetVelocityY = 0;


    // this allows us to add adelay to how the points appear 
    private appearDelay: number;
    private isVisible = false;

    constructor(x: number, y: number, appearDelay: number) {
        this._x = x;
        this._y = y;
        this.appearDelay = appearDelay;
    }

    get visibilityDelay() {
        return this.appearDelay;
    }

    get x() {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    get velocityX() {
        return this._velocityX;
    }

    set velocityX(value: number) {
        this._velocityX = value;
    }

    get velocityY() {
        return this._velocityY;
    }

    set velocityY(value: number) {
        this._velocityY = value;
    }

    get targetVelocityX() {
        return this._targetVelocityX;
    }

    set targetVelocityX(value: number) {
        this._targetVelocityX = value;
    }

    get targetVelocityY() {
        return this._targetVelocityY;
    }

    set targetVelocityY(value: number) {
        this._targetVelocityY = value;
    }

    get speed() {
        return Math.hypot(this._velocityX, this._velocityY);
    }


    updateVisibilityBasedOnTime(elapsed: number) {
        if (this.isVisible) {
            return;
        }

        if (elapsed >= this.appearDelay * 1000) {
            this.isVisible = true;
        }
    }

    move() {
        this._velocityX +=
            (this._targetVelocityX - this._velocityX) * this.acceleration;

        this._velocityY +=
            (this._targetVelocityY - this._velocityY) * this.acceleration;


        this._velocityX *= this.damping
        this._velocityY *= this.damping

        this._x += this._velocityX;
        this._y += this._velocityY;


    }

    render(ctx: CanvasRenderingContext2D) {
        if (!this.isVisible) {
            return;
        }

        const halfSize = POINT_SIZE / 2;

        ctx.fillRect(
            this.x - halfSize,
            this.y - halfSize,
            POINT_SIZE,
            POINT_SIZE
        );
    }
}
