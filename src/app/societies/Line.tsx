import { Point } from "./Point";
import { easeInOutCubic } from "./utils";

type DrawDirection = "forward" | "reverse";
export class Line {
    public progress = 0;

    private drawFrom: Point | null = null;
    private startTime = 0;
    private duration = 1000;
    private startProgress = 0;
    private targetProgress = 0;
    private isAnimating = false;
    private resolveAnimation: (() => void) | null = null;

    // Dash
    private readonly dashLength = 10;
    private dashProgress = 0;
    private dashStartProgress = 0;
    private dashTargetProgress = 0;
    private dashStartTime = 0;
    private dashDuration = 1000;
    private isDashAnimating = false;
    private resolveDashAnimation: (() => void) | null = null;

    constructor(
        public start: Point,
        public end: Point
    ) { }

    private animateLine(
        targetProgress: number,
        duration: number
    ): Promise<void> {
        this.resolveAnimation?.();

        this.startProgress = this.progress;
        this.targetProgress = targetProgress;
        this.duration = duration;
        this.startTime = performance.now();
        this.isAnimating = duration > 0;

        if (duration <= 0) {
            this.progress = targetProgress;
            return Promise.resolve();
        }

        return new Promise(resolve => {
            this.resolveAnimation = resolve;
        });
    }

    drawLine(duration: number, from?: Point) {
        if (from && from !== this.start && from !== this.end) {
            throw new Error("Starting point must be one of the line endpoints.");
        }

        this.drawFrom = from ?? this.start;

        return this.animateLine(1, duration);
    }

    undrawLine(duration: number) {
        return this.animateLine(0, duration);
    }

    update(time: number) {
        this.updateLine(time);
        this.updateDash(time);
    }

    private updateLine(time: number) {
        if (!this.isAnimating) return;

        const elapsed = Math.min(
            (time - this.startTime) / this.duration,
            1
        );

        const easedProgress = easeInOutCubic(elapsed);

        this.progress =
            this.startProgress +
            (this.targetProgress - this.startProgress) * easedProgress;

        if (elapsed >= 1) {
            this.isAnimating = false;
            this.progress = this.targetProgress;

            this.resolveAnimation?.();
            this.resolveAnimation = null;
        }
    }

    // DASH ANIMATION

    public dashFromStart(duration: number) {
        return this.animateDash(0, 1, duration);
    }

    public dashFromEnd(duration: number) {
        return this.animateDash(1, 0, duration);
    }

    private animateDash(
        from: number,
        to: number,
        duration: number
    ): Promise<void> {
        this.resolveDashAnimation?.();

        this.dashProgress = from;
        this.dashStartProgress = from;
        this.dashTargetProgress = to;
        this.dashDuration = duration;
        this.dashStartTime = performance.now();
        this.isDashAnimating = duration > 0;

        if (duration <= 0) {
            this.dashProgress = to;
            return Promise.resolve();
        }

        return new Promise(resolve => {
            this.resolveDashAnimation = resolve;
        });
    }

    public updateDash(time: number) {
        if (!this.isDashAnimating) return;

        const elapsed = Math.min(
            (time - this.dashStartTime) / this.dashDuration,
            1
        );

        const easedProgress = easeInOutCubic(elapsed);

        this.dashProgress =
            this.dashStartProgress +
            (this.dashTargetProgress - this.dashStartProgress) *
            easedProgress;

        if (elapsed >= 1) {
            this.isDashAnimating = false;
            this.dashProgress = this.dashTargetProgress;

            this.resolveDashAnimation?.();
            this.resolveDashAnimation = null;
        }
    }

    public renderDash(ctx: CanvasRenderingContext2D) {
        if (!this.isDashAnimating) return;

        const dx = this.end.x - this.start.x;
        const dy = this.end.y - this.start.y;

        const length = Math.hypot(dx, dy);

        if (length === 0) return;

        const progress = this.dashProgress * length;

        const start = Math.max(0, progress - this.dashLength / 2);
        const end = Math.min(length, progress + this.dashLength / 2);

        const directionX = dx / length;
        const directionY = dy / length;

        ctx.strokeStyle = "red";

        ctx.beginPath();

        ctx.moveTo(
            this.start.x + directionX * start,
            this.start.y + directionY * start
        );

        ctx.lineTo(
            this.start.x + directionX * end,
            this.start.y + directionY * end
        );

        ctx.stroke();
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = "white";

        const from = this.drawFrom ?? this.start;
        const to = from === this.start ? this.end : this.start;

        const x = from.x + (to.x - from.x) * this.progress;
        const y = from.y + (to.y - from.y) * this.progress;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(x, y);
        ctx.stroke();

        this.renderDash(ctx);
    }
}