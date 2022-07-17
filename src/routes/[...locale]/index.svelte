<script lang="ts" context="module">
    import type {Load, LoadEvent} from '@sveltejs/kit';

    export const prerender = true;

    export const load: Load = async ({params, fetch}: LoadEvent<Record<'locale', string>>) => {
      const locale = params?.locale ? params.locale : 'de';

      if (!['de', 'en'].includes(locale?.trim().toLowerCase())) {
        return {
          status: 404,
        };
      }

      const response = await fetch(`/${locale}/data`);

      return {
        props: {
          ...await response.json(),
          lang: locale,
        }
      };
    };
</script>
<script lang="ts">
  import LanguageSwitch from "$lib/components/LanguageSwitch.svelte";
  import Emopic from "$lib/components/emopic/Emopic.svelte";
  import Bio from "$lib/components/Bio.svelte";
  import type {Data} from '../../lib/models/data';

  export let meta: Data['meta'];
  export let content: Data['content'];
  export let lang: string;
</script>

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
