import type {RequestHandler} from '@sveltejs/kit';

const getLocalBackend = () => {
  if (!!process.env.PROD) {
    return undefined;
  }

  return {
    url: `http://localhost:8083/api/v1`
  };
};

export const GET: RequestHandler = ({url}) => {
  return {
    body: {
      backend: {
        name: 'github',
        repo: 'mrohmer/karolinrohmer.com',
        branch: 'master',
        commit_messages: {
          create: 'content({{collection}}): created {{slug}}',
          update: 'content({{collection}}): updated {{slug}}',
          delete: 'content({{collection}}): deleted {{slug}}',
          uploadMedia: 'content(media): uploaded {{path}}',
          deleteMedia: 'content(media): deleted {{path}}',
          openAuthoring: 'content: {{message}}'
        }
      },
      media_folder: 'static/uploads',
      public_folder: '/uploads',
      collections: [
        {
          name: 'data',
          label: 'Data',
          editor: {
            preview: false
          },
          i18n: {
            structure: 'single_file',
            locales: ['de', 'en'],
            default_locale: 'de'
          },
          files: [
            {
              name: 'meta',
              label: 'Metadaten',
              file: 'content/meta.json',
              i18n: true,
              fields: [
                {
                  name: 'title',
                  label: 'Titel',
                  widget: 'string',
                  i18n: 'duplicate'
                },
                {
                  name: 'description',
                  label: 'Beschreibung',
                  widget: 'string',
                  i18n: true,
                },
              ],
            },
            {
              name: 'content',
              label: 'Content',
              file: 'content/content.json',
              i18n: true,
              fields: [
                {
                  name: 'emopic',
                  label: 'Emopic',
                  widget: 'object',
                  i18n: true,
                  fields: [
                    {
                      name: 'name',
                      label: 'Name',
                      widget: 'string',
                      i18n: 'duplicate'
                    },
                    {
                      name: 'slogan',
                      label: 'Slogan',
                      widget: 'markdown',
                      i18n: true,
                    },
                    {
                      name: 'subslogan',
                      label: 'Subslogan',
                      widget: 'string',
                      i18n: true,
                    },
                    {
                      name: 'email',
                      label: 'Email',
                      widget: 'string',
                      i18n: true,
                    },
                    {
                      name: 'links',
                      label: 'Links',
                      widget: 'object',
                      fields: [
                        {
                          name: 'linkedin',
                          label: 'Linkedin',
                          i18n: true,
                          widget: 'string',
                        },
                        {
                          name: 'xing',
                          label: 'Xing',
                          i18n: true,
                          widget: 'string',
                        },
                        {
                          name: 'instagram',
                          label: 'Instagram',
                          i18n: true,
                          widget: 'string',
                        },
                        {
                          name: 'ddim',
                          label: 'DDIM',
                          i18n: true,
                          widget: 'string',
                        },
                        {
                          name: 'diag',
                          label: 'DIAG',
                          i18n: true,
                          widget: 'string',
                        },
                      ],
                    }
                  ],
                },
                {
                  name: 'bio',
                  label: 'Biographie',
                  widget: 'markdown',
                  i18n: true,
                }
              ],
            },
          ],
        },
      ],
      local_backend: getLocalBackend(),
      display_url: `${url.protocol}//${url.host}`,
      locale: 'de',
      i18n: {
        structure: 'multiple_folders',
        locales: ['en', 'de'],
        default_locale: 'de'
      },
    }
  };
};
