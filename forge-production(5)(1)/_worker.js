// Cloudflare Worker — serves Forge as a static site
// All routes return index.html (SPA routing), except known static assets

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Try to serve the exact static asset first
    try {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) {
        return assetResponse;
      }
    } catch (_) {}

    // Fall back to index.html for all other routes (SPA)
    try {
      const indexRequest = new Request(new URL('/index.html', request.url), request);
      const indexResponse = await env.ASSETS.fetch(indexRequest);
      return new Response(indexResponse.body, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache',
          ...Object.fromEntries(indexResponse.headers)
        }
      });
    } catch (e) {
      return new Response('Forge is loading...', { status: 200, headers: { 'Content-Type': 'text/html' } });
    }
  }
};
