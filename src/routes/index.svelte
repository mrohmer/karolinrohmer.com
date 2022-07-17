<script lang="ts" context="module">
    export const prerender = true;
</script>
<script lang="ts">
  import LanguageSwitch from "$lib/components/LanguageSwitch.svelte";
  import Emopic from "$lib/components/emopic/Emopic.svelte";
  import Bio from "$lib/components/Bio.svelte";

  const description = 'Globales Produktmanagement auf den Punkt gebracht';
</script>

<svelte:head>
    <meta name="description" content={description} />
    <meta name="og:description" content={description} />
    <meta name="og:locale" content="de" />
</svelte:head>

<LanguageSwitch lang="de"/>

<Emopic>
    <div slot="slogan">
        <div class="break-sm">Globales Produktmanagement</div>
        <div class="break-sm">auf den Punkt gebracht</div>
    </div>
    <div slot="subslogan">Profitabel durch Innovation</div>
    <div slot="memberof">Mitglied von</div>
</Emopic>
<Bio>
    Als <b>global tätige, mehrsprachige Führungskraft in durable FMCG</b> (Elektrobranche) &amp; <b>Hygiene-Dienstleistungen</b>
    stehe ich mit Ideen und <b>eigenen Patenten</b> für ein <b>am Kunden orientiertes Innovationsmanagement</b> und
    verfüge überbreite Erfahrungen in <b>Marketing-, Produktmanagement &amp; -entwicklung inklusive
    Restrukturierungen</b>.<br/>Mit Fokus auf <b>Reduzierung der Variantenvielfalt</b> sorge ich <b>für
    Profitabilität</b> im <b>globalen Kategoriemanagement</b>.
</Bio>
