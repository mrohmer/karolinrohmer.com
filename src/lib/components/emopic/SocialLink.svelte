<script lang="ts">
    export let href: string;
</script>

<a {href} target="_blank" rel="noopener nofollow" class="block cursor-pointer mx-0.5 p-1">
    <slot/>
</a>
