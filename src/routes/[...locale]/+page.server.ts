import type {PageLoad, PageLoadEvent} from "./$types";
import {error} from '@sveltejs/kit';
import metaJson from '../../../content/meta.json';
import contentJson from '../../../content/content.json';
import {parse} from 'marked';

export const prerender = true;

export const load: PageLoad = async ({params}: PageLoadEvent<Record<'locale', string>>) => {
  const locale = params?.locale ? params.locale : 'de';

  if (!['de', 'en'].includes(locale?.trim().toLowerCase())) {
    throw error(404)
  }

  const meta = (metaJson as any)[locale] ?? metaJson.de;
  const content = (contentJson as any)[locale] ?? contentJson.de;

  return {
    meta,
    content: {
      ...content,
      emopic: {
        ...content.emopic,
        slogan: parse(content.emopic.slogan),
      },
      bio: parse(content.bio),
    },
    lang: locale,
  };
};
