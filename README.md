# The Daily Reader

A personalized, AI-powered news reader with live web search. Built with vanilla HTML/JS and Vercel serverless functions.

## Categories
- Public Libraries
- Artificial Intelligence
- AI & Libraries
- World of Warcraft — Druid
- World of Warcraft — Class Tuning

## Setup & Deployment

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/daily-reader.git
cd daily-reader
```

### 2. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/daily-reader.git
git push -u origin main
```

### 3. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and click **Add New Project**
2. Import your `daily-reader` GitHub repository
3. Under **Environment Variables**, add:
   - Name: `ANTHROPIC_API_KEY`
   - Value: your Anthropic API key (get one at console.anthropic.com)
4. Click **Deploy**

Vercel will auto-deploy every time you push to `main`.

## Project Structure
```
daily-reader/
├── index.html       # Frontend
├── api/
│   └── news.js      # Serverless function (Anthropic API proxy)
├── vercel.json      # Vercel routing config
├── package.json
└── .gitignore
```

## Local Development
```bash
npm i -g vercel
vercel dev
```
Then open http://localhost:3000. Set `ANTHROPIC_API_KEY` in a `.env.local` file locally.
