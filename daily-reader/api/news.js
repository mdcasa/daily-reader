export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, label } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Missing query' });
  }

  const prompt = `Search the web for the latest news articles about: "${query}". Return ONLY a valid JSON array (no markdown, no explanation) with exactly 4-6 articles. Each object must have these fields:
- title: string (headline, max 90 chars)
- snippet: string (2-sentence summary, max 180 chars)
- source: string (publication name)
- url: string (article URL if available, else empty string)
- date: string (publication date like "Mar 28, 2026" or "2 days ago")

Focus on real, recent articles from 2025-2026. Return only the JSON array.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    let text = '';
    if (data.content) {
      for (const block of data.content) {
        if (block.type === 'text') text += block.text;
      }
    }

    const clean = text.replace(/```json|```/g, '').trim();
    const match = clean.match(/\[[\s\S]*\]/);
    const articles = match ? JSON.parse(match[0]) : [];

    res.status(200).json({ articles });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: 'Failed to fetch news', articles: [] });
  }
}
