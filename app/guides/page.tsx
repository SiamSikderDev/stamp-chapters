import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Creator Guides",
  description:
    "Free, in-depth guides on YouTube chapters, hooks, transcripts and video SEO — written for creators who want more watch time.",
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl border-[3px] border-ink bg-card px-4 py-2 text-sm font-black shadow-hard-sm transition-transform hover:-translate-y-0.5"
      >
        ← Back home
      </Link>

      <p className="mt-8 text-xs font-black uppercase tracking-[0.25em] text-pop">Learn</p>
      <h1 className="mt-1 font-display text-4xl font-black sm:text-5xl">Creator Guides</h1>
      <p className="mt-3 max-w-2xl text-ink/70">
        Practical, no-fluff guides on YouTube chapters, opening hooks, transcripts, and
        video SEO — everything you need to turn casual viewers into subscribers.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {guides.map((g, i) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className={`group rounded-2xl border-[3px] border-ink bg-card p-6 shadow-hard transition-transform hover:-translate-y-1 ${
              i % 2 === 0 ? "tilt-l-sm" : "tilt-r-sm"
            }`}
          >
            <p className="text-xs font-black uppercase tracking-widest text-pop">
              {g.readTime} min read
            </p>
            <h2 className="mt-2 font-display text-2xl font-black leading-snug group-hover:underline">
              {g.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink/70">{g.excerpt}</p>
            <p className="mt-4 text-sm font-black">
              Read the guide <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
