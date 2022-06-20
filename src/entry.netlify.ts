import { render } from './entry.ssr';

const handler = async (request: Request) => {
  try {
    // Handle static files
    if (/\.\w+$/.test(request.url)) {
      return;
    }

    const url = new URL(request.url);
    if (!['/', '/en'].includes(url.pathname)) {
      return Response.redirect(new URL('/', url));
    }

    const ssrResult = await render({
      url: request.url,
      base: '/build/',
    });

    const response = new Response(ssrResult.html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
    return response;
  } catch (e) {
    // 500 Error
    return new Response(String(e), { status: 500 });
  }
};

export default handler;
