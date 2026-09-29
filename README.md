# Stamp Chapters

Free YouTube chapter generator + opening-hook scorer. Paste a transcript (or try a YouTube link) and get description-ready chapters plus a hook score — no sign-up, no cost.

**Live:** https://stamp-chapters.vercel.app

## How it works

- **📝 Paste transcript** (default) — paste from YouTube's "Show transcript" or your own script with optional `[MM:SS]` timestamps.
- **🔗 YouTube URL** — best-effort auto-fetch; YouTube often blocks server-side caption fetching, in which case the tool switches you to the paste tab with a 20-second guide.
- **⚡ Try a sample** — one click to see it work.

Everything runs on a zero-cost rule-based engine (no LLM/API calls): transcript parsing, chapter segmentation, title generation, and hook scoring all happen in `lib/`.

## Stack

Next.js 14 · React 18 · TypeScript · Tailwind CSS · Vercel

## Project layout

| Path | What |
|---|---|
| `app/page.tsx` | Homepage + tool |
| `components/ChapterTool.tsx` | The chapter generator UI |
| `lib/chapters.ts` | Chapter segmentation + title engine |
| `lib/hook.ts` | Opening-hook scorer |
| `lib/youtube.ts` | Caption fetching (youtubei) |
| `lib/guides.ts` | Guides content |
| `app/guides/` | SEO guides section |
| `components/AdSlot.tsx` / `lib/ads.ts` | AdSense slots (render nothing until configured) |

## Deploy

Pushes to `master` auto-deploy via the connected Vercel project.
