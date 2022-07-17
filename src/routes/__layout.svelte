<script lang="ts">
  import "../app.css";
  import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
    <title>Karolin Rohmer</title>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/manifest.json">
</svelte:head>

<main class="z-10 min-h-screen bg-white dark:bg-zinc-900">
    <slot />
</main>
<Footer />
