<script lang="ts">
  import "../app.css";
  import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
    <title>Karolin Rohmer</title>
</svelte:head>

<main class="z-10 min-h-screen bg-white dark:bg-zinc-900">
    <slot />
</main>
<Footer />
