import Link from "next/link";
import Markdown from "@/components/Markdown";
import type { Guide } from "@/lib/guides";

/** Article layout shared by all guides, with a CTA back to the free tool. */
export default function GuideArticle({ guide }: { guide: Guide }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    datePublished: "2026-09-29",
    author: { "@type": "Organization", name: "Stamp Chapters" },
  };
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Link
        href="/guides"
        className="inline-flex items-center gap-2 rounded-xl border-[3px] border-ink bg-card px-4 py-2 text-sm font-black shadow-hard-sm transition-transform hover:-translate-y-0.5"
      >
        ← All guides
      </Link>

      <p className="mt-8 text-xs font-black uppercase tracking-[0.25em] text-pop">Guide</p>
      <h1 className="mt-1 font-display text-4xl font-black leading-tight sm:text-5xl">
        {guide.title}
      </h1>
      <p className="mt-3 text-sm text-ink/50">
        {guide.date} · {guide.readTime} min read
      </p>

      <div className="mt-8 rounded-2xl border-[3px] border-ink bg-card p-6 shadow-hard sm:p-10">
        <Markdown source={guide.content} />

        <div className="mt-10 rounded-2xl border-[3px] border-ink bg-ink p-6 text-paper shadow-hard-sm">
          <p className="font-display text-xl font-black">Try it on your own video</p>
          <p className="mt-1 text-sm text-paper/70">
            Generate chapters and score your hook free — no signup, right in your browser.
          </p>
          <Link
            href="/#tool"
            className="mt-4 inline-block rounded-xl border-[3px] border-paper bg-pop px-6 py-2.5 font-black text-ink transition-transform hover:-translate-y-0.5"
          >
            Open the free tool →
          </Link>
        </div>
      </div>
    </div>
  );
}
