<script lang="ts">
    export let lang: 'de' | 'en';
    const languages: Record<string, string> = {
        '/': 'de',
        '/en': 'en'
    };
</script>
<div class="absolute top-2 right-5 z-50">
    {#each Object.entries(languages) as [href, label], i}
        <a {href} class="px-1" class:text-primary={label === lang} on:click|stopPropagation>{label.toUpperCase()}</a>
        {#if i < Object.keys(languages).length - 1}
            /
        {/if}
    {/each}
</div>
