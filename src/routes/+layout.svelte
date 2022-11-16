<script lang="ts">
  import "../app.css";
  import Footer from "$lib/components/Footer.svelte";
  import {dev} from '$app/environment';
  import {PUBLIC_CLOUDFLARE_TOKEN} from '$env/static/public';
</script>

<svelte:head>
    <title>Karolin Rohmer</title>
    {#if !dev && PUBLIC_CLOUDFLARE_TOKEN}
        <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon={JSON.stringify({"token": PUBLIC_CLOUDFLARE_TOKEN})}></script>
    {/if}
</svelte:head>

<main class="z-10 min-h-screen bg-white dark:bg-zinc-900">
    <slot />
</main>
<Footer />
