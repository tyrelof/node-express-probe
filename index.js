const express = require('express');
const { version } = require('./package.json');

const app = express();
const port = Number(process.env.PORT || 3000);

let isReady = true;
let server;

app.get('/', (_req, res) => {
  res.status(200).json({
    ok: true,
    service: 'deployment-test-app',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true });
});

app.get('/version', (_req, res) => {
  const commit = process.env.APP_COMMIT_SHA || null;
  res.status(200).json({ version, commit });
});

app.get('/ready', (_req, res) => {
  if (!isReady) {
    return res.status(503).json({ ok: false, reason: 'shutting_down' });
  }

  return res.status(200).json({ ok: true });
});

app.get('/live', (_req, res) => {
  res.status(200).json({ ok: true });
});

server = app.listen(port, '0.0.0.0', () => {
  process.stdout.write(`Listening on ${port}\n`);
});

const shutdown = () => {
  isReady = false;

  if (!server) {
    process.exit(0);
  }

  server.close(() => {
    process.exit(0);
  });

  setTimeout(() => {
    process.exit(1);
  }, 10000).unref();
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
