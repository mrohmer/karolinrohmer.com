import {component$, Host, useClientEffect$, useRef, useStore} from '@builder.io/qwik';

export const BgCanvas = component$(
  () => {
    const ref = useRef<HTMLCanvasElement>();
    useClientEffect$(() => {
      const canvas = ref.current ? new Canvas(ref.current) : undefined;
      const handleClick = () => (canvas?.draw());
      window.addEventListener('click', handleClick);

      return () => {
        canvas?.stop();
        window.removeEventListener('click', handleClick);
      }
    });
  return (<Host class="absolute inset-0 w-full h-full" ref={ref} />)
},
  {
    tagName: 'canvas',
  }
);

export class Canvas {
  private context: CanvasRenderingContext2D;
  private radius = 0;
  private redrawTimeout = 0;
  private startHeight = 0;

  constructor(private canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;

    this.init();
    this.draw();
  }

  private init() {
    const pixelRatio = window.devicePixelRatio || 1;

    this.canvas.width = window.innerWidth * pixelRatio;
    this.canvas.height = window.innerHeight * pixelRatio;

    this.context.scale(pixelRatio, pixelRatio);
    this.context.globalAlpha = 0.6;
  }

  draw() {
    this.stop();

    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);

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

    while(nextPoints[1].x < window.innerWidth){
      nextPoints = this.drawTriangle(
        nextPoints[0],
        nextPoints[1]
      )
    }

    this.redrawTimeout = setTimeout(this.draw.bind(this), 30000);
  }
  stop() {
    if(this.redrawTimeout){
      clearTimeout(this.redrawTimeout);
    }
  }
  private drawTriangle(point1: Record<'x'|'y', number>, point2: Record<'x'|'y', number>){
    this.context.beginPath();
    this.context.moveTo(point1.x, point1.y);
    this.context.lineTo(point2.x, point2.y);

    const newX = point2.x + this.random(1.75, -0.25) * this.startHeight;
    const newY = this.getNewY(point2.y);

    this.context.lineTo(newX, newY);
    this.context.closePath();

    this.radius -= Math.PI * 2 / -50;
    this.context.fillStyle = '#' + (Math.cos(this.radius) * 127 + 128 << 16 | Math.cos(this.radius + Math.PI * 2 / 3) * 127 + 128 << 8 | Math.cos(this.radius + Math.PI * 2 / 3 * 2) * 127 + 128).toString(16);
    this.context.fill();

    return [point2, {x: newX, y: newY}];
  }
  private getNewY(y: number): number {
    const temp = y + this.random(0.9, -1.1) * this.startHeight;
    return (temp > window.innerHeight - this.startHeight || temp < this.startHeight) ? this.getNewY(y) : temp
  }
  private random(max: number, min: number): number {
    return Math.random() * (max - min) + min;
  }
}
