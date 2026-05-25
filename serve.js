// Tiny zero-dependency static file server.
// Serves the current folder on http://localhost:<PORT> (default 5173).
// Run:  node serve.js   |   PORT=8080 node serve.js
// Stop: Ctrl+C in the terminal that started it.

const http = require('http');
const fs   = require('fs');
const path = require('path');
const url  = require('url');

const ROOT = __dirname;
const PORT = parseInt(process.env.PORT || '5173', 10);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.htm':  'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.txt':  'text/plain; charset=utf-8',
  '.md':   'text/plain; charset=utf-8',
};

function safeJoin(root, urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const target  = path.normalize(path.join(root, decoded));
  // Block path-traversal outside ROOT
  if (!target.startsWith(root)) return null;
  return target;
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url);
  let filePath = safeJoin(ROOT, parsed.pathname);
  if (!filePath) { res.writeHead(403); return res.end('forbidden'); }

  fs.stat(filePath, (err, stat) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 — ' + parsed.pathname);
    }
    if (stat.isDirectory()) filePath = path.join(filePath, 'index.html');

    fs.readFile(filePath, (err2, data) => {
      if (err2) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('404 — ' + parsed.pathname);
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type':  TYPES[ext] || 'application/octet-stream',
        'Cache-Control': 'no-cache',
      });
      res.end(data);
      const stamp = new Date().toLocaleTimeString();
      console.log(`[${stamp}] 200 ${req.method} ${parsed.pathname}`);
    });
  });
});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try:  PORT=5174 node serve.js`);
  } else {
    console.error(e);
  }
  process.exit(1);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n  Tarun Agrawal homepage — local preview\n`);
  console.log(`  Serving:  ${ROOT}`);
  console.log(`  URL:      http://localhost:${PORT}\n`);
  console.log(`  Press Ctrl+C to stop.\n`);
});
