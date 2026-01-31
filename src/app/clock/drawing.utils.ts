import { polarToCartesian } from "./math.utils";

export function drawHand(
  ctx: CanvasRenderingContext2D,
  angle: number,
  length: number,
  width: number,
  color = "#222"
) {
  ctx.save();
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -length);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.stroke();
  ctx.restore();
}

const drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};
  
export function secondsHand(
  ctx: CanvasRenderingContext2D,
  angle: number,
  length: number,
  width: number,
  color = "#222"
) {
  ctx.save();
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);

  drawCircle(ctx, 0, 0, 5, color);
  
  ctx.moveTo(1.5, 5);
  ctx.lineTo(3.5, 5);
  ctx.lineTo(3.5, -length);
  ctx.lineTo(1.5, -length);
  
  ctx.closePath();
  
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.stroke();
  ctx.restore();
}



export function drawTick(
  ctx: CanvasRenderingContext2D,
  angle: number,
  outerRadius: number,
  length: number,
  width: number,
  center: number,
  strokeColor: string = "#111"
) {
  const start = polarToCartesian(angle, outerRadius - length, center);
  const end = polarToCartesian(angle, outerRadius, center);

  ctx.save();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  ctx.restore();
}