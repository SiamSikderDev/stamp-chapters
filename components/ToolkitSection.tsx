import { AFFILIATE_TOOLS, hasAffiliates } from "@/lib/affiliates";

/**
 * Creator Toolkit — native affiliate recommendations.
 * Hidden until at least one affiliate link is configured in lib/affiliates.ts.
 * Links carry rel="sponsored" per Google's guidelines.
 */
export default function ToolkitSection() {
  if (!hasAffiliates) return null;
  const tools = AFFILIATE_TOOLS.filter((t) => t.href.trim().length > 0);

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <p className="text-xs font-black uppercase tracking-[0.25em] text-pop">Creator toolkit</p>
      <h2 className="mt-1 font-display text-3xl font-black sm:text-4xl">
        Tools we actually recommend
      </h2>
      <p className="mt-2 max-w-2xl text-ink/70">
        The same tools top creators use to research, edit and stay copyright-safe.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <a
            key={t.name}
            href={t.href}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="group flex flex-col rounded-2xl border-[3px] border-ink bg-card p-6 shadow-hard transition-transform hover:-translate-y-1"
          >
            <span className="inline-flex w-fit rounded-full border-2 border-ink bg-sun px-3 py-1 text-[11px] font-black uppercase tracking-wider">
              {t.badge}
            </span>
            <h3 className="mt-3 font-display text-2xl font-black">{t.name}</h3>
            <p className="mt-2 flex-1 text-sm text-ink/70">{t.tagline}</p>
            <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl border-[3px] border-ink bg-ink px-4 py-2 text-sm font-black text-paper transition-colors group-hover:bg-pop group-hover:text-ink">
              {t.cta} →
            </span>
          </a>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-ink/50">
        Some links above are affiliate links — if you buy through them we may earn a
        commission at no extra cost to you. It keeps Stamp Chapters free.
      </p>
    </section>
  );
}
