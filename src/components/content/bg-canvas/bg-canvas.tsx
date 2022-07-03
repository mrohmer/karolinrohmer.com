import {component$, Host, useClientEffect$, useRef, useStore} from '@builder.io/qwik';
import fastDeepEquals from 'fast-deep-equal';

export const BgCanvas = component$(
  () => {
    const ref = useRef<HTMLCanvasElement>();
    useClientEffect$(() => {
      const canvas = ref.current ? new Canvas(ref.current) : undefined;
      //const handleClick = () => (canvas?.draw());
      //window.addEventListener('click', handleClick);

      canvas?.start();
      return () => {
        canvas?.stop();
        // window.removeEventListener('click', handleClick);
      }
    });
    return (<Host class="absolute inset-0 w-full h-full" ref={ref}/>)
  },
  {
    tagName: 'canvas',
  }
);

type Point = Record<'x' | 'y', number>;

type TrianglePosition = [Point, Point, Point];
type TriangleColor = [number, number, number];;
interface Triangle {
  points: TrianglePosition;
  color: TriangleColor;
}

export class Canvas {
  private context: CanvasRenderingContext2D;
  private radius = 0;
  private redrawTimeout = 0;
  private startHeight = 0;
  private running = false;

  private startTriangles?: Triangle[];
  private endTriangles?: Triangle[];
  private animationStart?: number;
  private readonly duration = 35000;

  constructor(private canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;

    this.init();
  }

  private init() {
    const pixelRatio = window.devicePixelRatio || 1;

    this.canvas.width = window.innerWidth * pixelRatio;
    this.canvas.height = window.innerHeight * pixelRatio;

    this.context.scale(pixelRatio, pixelRatio);
    this.context.globalAlpha = 0.6;

    this.radius -= Math.PI * this.random(0, 5);
  }

  start() {
    if (this.running) {
      return;
    }

    this.running = true;
    this.startTriangles = undefined;
    this.endTriangles = undefined;
    this.animationStart = undefined;

    this.draw();
  }

  stop() {
    this.running = false;
  }

  private draw() {
    if (!this.running) {
      return;
    }

    const now = +new Date();
    if (!this.startTriangles || !this.animationStart) {
      this.startTriangles = this.getTriangles();
      this.endTriangles = this.getTriangles();
      this.animationStart = +new Date();
    } else if (this.animationStart + this.duration < now) {
      this.startTriangles = this.endTriangles;
      this.endTriangles = this.getTriangles();
      this.animationStart = +new Date();
    }

    const percentage = (now - this.animationStart) / this.duration;
    const triangles = this.startTriangles!
      .filter((_, i) => i < this.endTriangles!.length)
      .map((triangle, i) => [triangle, this.endTriangles![i]])
      .map(([start, end]) => this.getDeltaTriangle(start, end, percentage))

    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    triangles.forEach(triangle => this.drawTriangle(triangle));

    requestAnimationFrame(() => this.draw());
  }

  private getDeltaTriangle(start: Triangle, end: Triangle, percentage: number): Triangle {
    const points = start.points.map(({x, y}, i) => ({
      x: x + (end.points[i].x - x) * percentage,
      y: y + (end.points[i].y - y) * percentage,
    })) as Triangle['points'];
    const color = start.color.map((c, i) => this.padNumber(c + (end.color[i] - c) * percentage, 0, 255)) as Triangle['color'];

    return {
      points,
      color,
    }

  }

  private getTriangles(): Triangle[] {
    this.startHeight = this.random(150, 75);
    const startY = this.random((window.innerHeight - 2 * this.startHeight) * 0.7, 0);
    let nextPoints = [
      {
        x: 0,
        y: startY - this.startHeight / 2
      },
      {
        x: 0,
        y: startY + this.startHeight / 2
      }
    ];

    const triangles: Triangle[] = [];
    const amount = 14;

    while (triangles.length < amount) {

      const isFirst = triangles.length === 0;
      const isLast = triangles.length === amount - 2;

      const toRightBorder = window.innerWidth - nextPoints[1].x;

      const triangle = this.getNextTriangle(
        nextPoints[0],
        nextPoints[1],
        isLast ? toRightBorder : (isFirst ? toRightBorder / (amount * 2) : -this.startHeight),
        toRightBorder
      );

      triangles.push(triangle);

      nextPoints = [triangle.points[1], triangle.points[2]];
    }

    return triangles;
  }

  private getNextTriangle(point1: Point, point2: Point, minWidth: number, maxWidth: number): Triangle {
    this.radius -= Math.PI * 2.5 / -50;

    const width = this.padNumber(this.random(2, -0.25) * this.startHeight, minWidth, maxWidth);
    const x = point2.x + width;
    const y = this.getNewY(point2.y);
    const color = [
        Math.cos(this.radius) * 127 + 128,
        Math.cos(this.radius + Math.PI * 2 / 3) * 127 + 128,
        Math.cos(this.radius + Math.PI * 2 / 3 * 2) * 127 + 128,
      ] as Triangle['color']
    ;

    return {
      points: [point1, point2, {x, y}],
      color,
    }
  }

  private drawTriangle({points, color}: Triangle) {
    this.context.beginPath();
    this.context.moveTo(points[0].x, points[0].y);
    this.context.lineTo(points[1].x, points[1].y);
    this.context.lineTo(points[2].x, points[2].y);

    this.context.closePath();

    this.context.fillStyle = '#' + color.map(c => Math.floor(c).toString(16)).join('');
    this.context.fill();
  }

  private getNewY(y: number): number {
    const temp = y + this.random(1.0, -1.3) * this.startHeight;
    return (temp > window.innerHeight - this.startHeight || temp < this.startHeight) ? this.getNewY(y) : temp
  }

  private random(max: number, min: number): number {
    return Math.random() * (max - min) + min;
  }
  private padNumber(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }
}
