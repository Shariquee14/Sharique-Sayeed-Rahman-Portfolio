import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { processContactForm } from './server/contactHandler.ts';

function contactApiPlugin(): Plugin {
  const setupMiddleware = (server: { middlewares: any }) => {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      const url = req.url ? req.url.split('?')[0] : '';
      if (url === '/api/youtube-feed' && req.method === 'GET') {
        try {
          const feedRes = await fetch(
            'https://www.youtube.com/feeds/videos.xml?channel_id=UC2cuJbYZ1LE72OhUs52LZHA'
          );
          if (!feedRes.ok) throw new Error(`YouTube feed error: ${feedRes.status}`);
          const xml = await feedRes.text();
          const entries = xml.split('<entry>').slice(1);
          const videos = [];
          for (const e of entries) {
            const idMatch =
              e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) ||
              e.match(/<videoId>([^<]+)<\/videoId>/);
            const titleMatch = e.match(/<title>([^<]+)<\/title>/);
            const linkMatch = e.match(/<link[^>]+href=["']([^"']+)["']/);
            const pubMatch = e.match(/<published>([^<]+)<\/published>/);

            if (idMatch && idMatch[1]) {
              const videoId = idMatch[1].trim();
              const title = titleMatch ? titleMatch[1].trim() : 'Video';
              const link = linkMatch ? linkMatch[1] : '';
              const publishedAt = pubMatch ? pubMatch[1] : new Date().toISOString();
              const isShort =
                link.includes('/shorts/') ||
                title.toLowerCase().includes('#shorts') ||
                title.toLowerCase().includes('#short');

              videos.push({
                id: videoId,
                title,
                url: isShort
                  ? `https://www.youtube.com/shorts/${videoId}`
                  : `https://www.youtube.com/watch?v=${videoId}`,
                thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                publishedAt,
                formattedDate: new Date(publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }),
                isShort,
                type: isShort ? 'short' : 'long',
              });
            }
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, videos }));
          return;
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: err.message }));
          return;
        }
      }

      if (url === '/api/contact' && req.method === 'POST') {
        try {
          const buffers: Buffer[] = [];
          for await (const chunk of req) {
            buffers.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
          }
          const bodyStr = Buffer.concat(buffers).toString('utf-8');
          const body = JSON.parse(bodyStr || '{}');

          const clientIp =
            (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
            req.socket?.remoteAddress ||
            '127.0.0.1';

          const result = await processContactForm(body, clientIp);
          res.statusCode = result.status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result.body));
        } catch {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, error: 'Invalid request body' }));
        }
      } else {
        next();
      }
    });
  };

  return {
    name: 'contact-api-plugin',
    configureServer(server) {
      setupMiddleware(server);
    },
    configurePreviewServer(server) {
      setupMiddleware(server);
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    base: './',
    plugins: [react(), contactApiPlugin()],
  };
});
