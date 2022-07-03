import {component$, Host, useClientEffect$, useRef, useStore} from '@builder.io/qwik';
import {Canvas} from '../../../utils/bg-canvas';

export const BgCanvas = component$(
  () => {
    const ref = useRef<HTMLCanvasElement>();
    useClientEffect$(() => {
      const canvas = ref.current ? new Canvas(ref.current) : undefined;

      canvas?.start();
      return () => {
        canvas?.stop();
      }
    });
    return (<Host class="absolute inset-0 w-full h-full" ref={ref}/>)
  },
  {
    tagName: 'canvas',
  }
);

