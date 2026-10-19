import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { processContactForm } from './server/contactHandler.ts';

function contactApiPlugin(): Plugin {
  const setupMiddleware = (server: { middlewares: any }) => {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      const url = req.url ? req.url.split('?')[0] : '';
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
    plugins: [react(), contactApiPlugin()],
  };
});
