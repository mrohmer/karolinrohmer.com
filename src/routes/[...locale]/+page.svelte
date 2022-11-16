<script lang="ts">
  import LanguageSwitch from "$lib/components/LanguageSwitch.svelte";
  import Emopic from "$lib/components/emopic/Emopic.svelte";
  import Bio from "$lib/components/Bio.svelte";
  import type {Data} from '$lib/models/data';

  export let data: Data & Record<'lang', string>;

  $: meta = data?.meta;
  $: content = data?.content;
  $: lang = data?.lang;
</script>

<svelte:window lang={lang} />
<svelte:head>
    <meta name="title" content={meta.title} />
    <meta name="description" content={meta.description} />
    <meta name="og:description" content={meta.description} />
    <meta name="og:locale" content={lang} />
</svelte:head>

<LanguageSwitch {lang} />

<Emopic {...content.emopic}>
    <div slot="slogan">
        {@html content.emopic.slogan}
    </div>
    <div slot="subslogan">{content.emopic.subslogan}</div>
    <div slot="memberof">
        {lang === 'en' ? 'Member of' : 'Mitglied von'}
    </div>
</Emopic>
<Bio>
    {@html content.bio}
</Bio>
