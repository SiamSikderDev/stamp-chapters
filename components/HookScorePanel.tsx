"use client";

import type { HookScore } from "@/lib/hook";

function Bar({ label, value, hint }: { label: string; value: number; hint: string }) {
  const color = value >= 18 ? "bg-ink" : value >= 12 ? "bg-pop" : "bg-ink/30";
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-bold">{label}</span>
        <span className="text-sm font-black tabular-nums">{value}/25</span>
      </div>
      <div
        className="mt-1 h-3 rounded-full border-2 border-ink bg-white"
        role="img"
        aria-label={`${label}: ${value} out of 25. ${hint}`}
      >
        <div className={`h-full rounded-full ${color}`} style={{ width: `${(value / 25) * 100}%` }} />
      </div>
      <p className="mt-1 text-xs text-ink/60">{hint}</p>
    </div>
  );
}

export default function HookScorePanel({ score }: { score: HookScore }) {
  const ring = score.total >= 80 ? "bg-ink text-sun" : score.total >= 60 ? "bg-sun text-ink" : "bg-pop text-white";
  return (
    <section aria-label="Hook score" className="rounded-2xl border-[3px] border-ink bg-card p-5 shadow-hard-sm">
      <div className="flex items-center gap-4">
        <div
          className={`tilt-l flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-[3px] border-ink ${ring}`}
          role="img"
          aria-label={`Hook score ${score.total} out of 100`}
        >
          <span className="font-display text-3xl font-black tabular-nums">{score.total}</span>
        </div>
        <div>
          <h3 className="font-display text-xl font-black">Hook Score</h3>
          <p className="text-sm text-ink/70">{score.verdict}</p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <Bar label="Curiosity" value={score.curiosity} hint="Questions, numbers & power words in the first 30s." />
        <Bar label="Clarity" value={score.clarity} hint="No filler openers or subscribe-begging clichés." />
        <Bar label="Pacing" value={score.pacing} hint="Ideal delivery: 2–3 words per second." />
        <Bar label="Payoff promise" value={score.payoff} hint="Does the viewer know what's in it for them?" />
      </div>

      {score.tips.length > 0 && (
        <div className="mt-4 rounded-xl border-2 border-dashed border-ink/30 bg-paper p-3">
          <p className="text-xs font-black uppercase tracking-widest text-ink/60">Fix these first</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
            {score.tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
