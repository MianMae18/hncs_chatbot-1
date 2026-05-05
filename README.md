# HNCS Chatbot

Quick notes for safe repo sharing and deployment.

Required environment variables
- `GEMINI_API_KEY` — your Google/Generative AI API key (set this in Vercel and locally in `.env.local`).
- `GOOGLE_GENERATIVE_AI_API_KEY` — used by some Google SDKs; set this if your code or dependencies require it.

Local setup
1. Copy `env.example` to `.env.local` and fill values.
2. Install dependencies: `npm install`.
3. Run locally: `npm run dev`.

Deployment (Vercel)
1. Push this repo to GitHub and import it in Vercel.
2. In Vercel Project Settings → Environment Variables, add `GEMINI_API_KEY` (and `GOOGLE_GENERATIVE_AI_API_KEY` if needed).
3. Deploy and check logs for runtime errors.

Safety notes
- Never commit `.env.local` or any file containing secrets.
- If a secret was accidentally pushed, rotate the secret immediately and remove it from the repo (`git rm --cached .env.local`, commit, push). Use `git filter-repo` or BFG for deep history removal if necessary.
