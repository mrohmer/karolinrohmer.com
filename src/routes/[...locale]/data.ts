import type {RequestHandler} from '@sveltejs/kit';
import type {RequestEvent} from '@sveltejs/kit';
import metaJson from '../../../content/meta.json';
import contentJson from '../../../content/content.json';
import {parse} from 'marked';

export const GET: RequestHandler = (event: RequestEvent<Record<'locale', string>>) => {
  const locale = event.params?.locale;

  if (!['de', 'en'].includes(locale?.trim().toLowerCase())) {
    return {
      status: 404,
    };
  }

  const meta = (metaJson as any)[locale] ?? metaJson.de;
  const content = (contentJson as any)[locale] ?? contentJson.de;

  return {
    body: {
      meta,
      content: {
        ...content,
        emopic: {
          ...content.emopic,
          slogan: parse(content.emopic.slogan),
        },
        bio: parse(content.bio),
      },
    },
  }
}
