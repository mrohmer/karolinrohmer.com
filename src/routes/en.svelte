<script lang="ts" context="module">
  export const prerender = true;
</script>
<script lang="ts">
  import LanguageSwitch from "$lib/components/LanguageSwitch.svelte";
  import Emopic from "$lib/components/emopic/Emopic.svelte";
  import Bio from "$lib/components/Bio.svelte";

  const description = 'global product management reduced to the max';
</script>

<svelte:head>
    <meta name="description" content={description} />
    <meta name="og:description" content={description} />
    <meta name="og:locale" content="en" />
</svelte:head>

<LanguageSwitch lang="en"/>

<Emopic>
    <div slot="slogan"><div class="break-sm">global product management</div> <div class="break-sm">reduced to the max</div></div>
    <div slot="subslogan">profitable by innovation</div>
    <div slot="memberof">Member of</div>
</Emopic>
<Bio>
    As a <b>global multi-language leader in durable electronics FMCG &amp; Hygiene-Services</b>, with my ideas and <b>own patents</b> I am representing <b>customer-related innovation management</b> by comprising of wide experience in <b>marketing, and product management &amp; development including restructurings</b>. Focussed on the <b>reductions of variants, profitable growth</b> is my core <b>in global category management</b>.
</Bio>
