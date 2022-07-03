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
type TriangleColor = [number, number, number];
;

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

  private startTrianglePositions?: TrianglePosition[];
  private endTrianglePositions?: TrianglePosition[];
  private colors?: TriangleColor[];
  private animationStartPosition?: number;
  private animationStartColor?: number;
  private readonly durationPosition = 35000;
  private readonly durationColor = this.durationPosition / 3;

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
    this.startTrianglePositions = undefined;
    this.endTrianglePositions = undefined;
    this.animationStartPosition = undefined;

    this.draw();
  }

  stop() {
    this.running = false;
  }

  private draw() {
    if (!this.running) {
      return;
    }

    this.iterateAnimation();

    const positionPercentage = (+new Date() - this.animationStartPosition!) / this.durationPosition;
    const colorPercentage = (+new Date() - this.animationStartColor!) / this.durationColor;
    const triangles = this.startTrianglePositions!
      .filter((_, i) => i < this.endTrianglePositions!.length)
      .map((triangle, i) => [
        {points: triangle, color: this.colors![i]},
        {points: this.endTrianglePositions![i], color: this.colors![i + 1]}
      ])
      .map(
        ([start, end], index) =>
          this.getDeltaTriangle(start, end, positionPercentage, colorPercentage)
      )

    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    triangles.forEach(triangle => this.drawTriangle(triangle));

    requestAnimationFrame(() => this.draw());
  }

  private iterateAnimation() {
    const now = +new Date();
    if (!this.startTrianglePositions || !this.animationStartPosition || this.animationStartPosition + this.durationPosition < now) {
      this.startTrianglePositions = this.endTrianglePositions ?? this.getTrianglesPositions();
      this.endTrianglePositions = this.getTrianglesPositions();
      this.animationStartPosition = now;
    }
    if (!this.colors || !this.animationStartColor || this.animationStartColor + this.durationColor < now) {
      if (this.colors?.length) {
        this.colors.shift();
        this.colors = [
          ...this.colors,
          this.getNextTriangleColor(),
        ];
      } else {
        this.colors = [
          ...this.startTrianglePositions!.map(() => this.getNextTriangleColor()),
          this.getNextTriangleColor(),
        ];
      }
      this.animationStartColor = now;
    }

  }

  private getDeltaTriangle(start: Triangle, end: Triangle, positionPercentage: number, colorPercentage: number): Triangle {
    const points = start.points.map(({x, y}, i) => ({
      x: x + (end.points[i].x - x) * positionPercentage,
      y: y + (end.points[i].y - y) * positionPercentage,
    })) as Triangle['points'];
    const color = start.color.map((c, i) => this.padNumber(c + (end.color[i] - c) * colorPercentage, 0, 255)) as Triangle['color'];

    return {
      points,
      color,
    }

  }

  private getTrianglesPositions(): TrianglePosition[] {
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

    const triangles: TrianglePosition[] = [];
    const amount = 14;

    while (triangles.length < amount) {
      const isFirst = triangles.length === 0;
      const isLast = triangles.length === amount - 2;

      const toRightBorder = window.innerWidth - nextPoints[1].x;

      const points = this.getNextTrianglePosition(
        nextPoints[0],
        nextPoints[1],
        isLast ? toRightBorder : (isFirst ? toRightBorder / (amount * 2) : -this.startHeight),
        toRightBorder
      );

      triangles.push(points)

      nextPoints = [points[1], points[2]];
    }

    return triangles;
  }

  private getNextTrianglePosition(point1: Point, point2: Point, minWidth: number, maxWidth: number): TrianglePosition {
    const width = this.padNumber(this.random(2, -0.25) * this.startHeight, minWidth, maxWidth);
    const x = point2.x + width;
    const y = this.getNewY(point2.y);

    return [point1, point2, {x, y}];
  }

  private getNextTriangleColor(): TriangleColor {
    this.radius -= Math.PI * 2.5 / -50;

    return [
      Math.cos(this.radius) * 127 + 128,
      Math.cos(this.radius + Math.PI * 2 / 3) * 127 + 128,
      Math.cos(this.radius + Math.PI * 2 / 3 * 2) * 127 + 128,
    ] as Triangle['color']
      ;
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
