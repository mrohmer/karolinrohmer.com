<script lang="ts">
    import {onMount} from 'svelte';
    import {BgCanvas} from '../../utils/BgCanvas';

    let ref: HTMLCanvasElement;

    onMount(() => {
      const canvas = ref ? new BgCanvas(ref) : undefined;
      const handleClick = () => (canvas?.draw());
      window.addEventListener('click', handleClick);

      return () => {
        canvas?.stop();
        window.removeEventListener('click', handleClick);
      }
    })
</script>

<canvas bind:this={ref} class="absolute inset-0 w-full h-full"></canvas>
