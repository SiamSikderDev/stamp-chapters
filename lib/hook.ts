/**
 * lib/hook.ts — rule-based "first 30 seconds" hook scorer.
 *
 * Pure functions, no AI calls: zero running cost.
 * Four sub-scores (25 pts each): curiosity, clarity, pacing, payoff promise.
 */

import type { CaptionSegment } from "./chapters";

export interface HookScore {
  total: number; // 0-100
  curiosity: number;
  clarity: number;
  pacing: number;
  payoff: number;
  verdict: string;
  tips: string[];
}

const POWER_WORDS = [
  "secret", "mistake", "nobody", "free", "truth", "hack", "proven",
  "shocking", "stop", "never", "new", "easy", "fast", "warning",
  "brutal", "honest", "actually", "exactly",
];

const CLICHES = [
  "welcome back to my channel",
  "welcome to my channel",
  "welcome back to the channel",
  "smash that subscribe button",
  "don't forget to subscribe",
  "hey guys",
  "what's up guys",
  "what is up guys",
];

const PROMISES = [
  "by the end",
  "you'll learn",
  "you will learn",
  "i'll show you",
  "i'm going to show",
  "let me show you",
  "stay tuned",
  "in this video",
  "stick around",
];

export function scoreHook(segments: CaptionSegment[]): HookScore {
  const first30 = segments.filter((s) => s.start < 30);
  const text = first30.map((s) => s.text).join(" ").toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const tips: string[] = [];

  // --- Curiosity (0-25): questions, numbers, power words ---
  const questions = (text.match(/\?/g) || []).length;
  const numbers = (text.match(/\b\d[\d,]*(%|x)?\b/g) || []).length;
  const power = POWER_WORDS.filter((w) => new RegExp(`\\b${w}\\b`).test(text)).length;
  const curiosity = Math.round(
    Math.min(10, questions * 5) + Math.min(8, numbers * 4) + Math.min(7, power * 2.5)
  );
  if (questions === 0) tips.push("Open with a question — it creates an instant curiosity gap.");
  if (numbers === 0) tips.push("Drop a specific number or stat in the first 30 seconds (viewers anchor on specifics).");

  // --- Clarity (0-25): penalize filler openers & clichés ---
  let clarity = 25;
  for (const c of CLICHES) {
    if (text.includes(c)) {
      clarity -= 8;
      tips.push(`Cut the opener "${c}" — start with value, not channel admin.`);
    }
  }
  if (/^(so |well |okay |um |uh )/.test(text)) {
    clarity -= 4;
    tips.push("Don't start with filler words — the first 3 seconds decide everything.");
  }
  clarity = Math.max(0, clarity);

  // --- Pacing (0-25): words per second, ideal 2.0–3.0 ---
  const wps = words.length / 30;
  let pacing: number;
  if (wps >= 2 && wps <= 3) pacing = 25;
  else if (wps < 2) pacing = Math.max(5, Math.round(25 - (2 - wps) * 15));
  else pacing = Math.max(5, Math.round(25 - (wps - 3) * 10));
  if (wps < 1.5) tips.push("Your opening is slow — tighten it so the payoff lands before viewers click away.");
  if (wps > 3.5) tips.push("Your opening is rushed — slow down so the key promise actually registers.");

  // --- Payoff promise (0-25): does the viewer know what's in it for them? ---
  const promises = PROMISES.filter((p) => text.includes(p)).length;
  const payoff = Math.min(25, promises * 12 + (questions > 0 ? 4 : 0));
  if (promises === 0) tips.push('Promise a payoff explicitly ("by the end of this video, you\'ll…").');

  const total = Math.min(100, curiosity + clarity + pacing + payoff);

  const verdict =
    total >= 80 ? "Strong hook — this opening earns the click."
    : total >= 60 ? "Decent hook — a couple of tweaks and it converts."
    : total >= 40 ? "Needs work — viewers are likely bouncing early."
    : "Weak hook — rewrite the first 30 seconds.";

  return { total, curiosity, clarity, pacing, payoff, verdict, tips: tips.slice(0, 4) };
}
