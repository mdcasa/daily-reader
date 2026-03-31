import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());

// Serve static files (index.html etc)
app.use(express.static(__dirname));

// Simulate the Vercel serverless function
app.post('/api/news', async (req, res) => {
  const { default: handler } = await import('./api/news.js');
  return handler(req, res);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Daily Reader running at http://localhost:${PORT}`);
});
