import Link from "next/link";
import type { ReactNode } from "react";

/** Shared wrapper for Privacy / Terms / About / Contact pages. */
export default function LegalPage({
  kicker,
  title,
  updated,
  children,
}: {
  kicker: string;
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl border-[3px] border-ink bg-card px-4 py-2 text-sm font-black shadow-hard-sm transition-transform hover:-translate-y-0.5"
      >
        ← Back home
      </Link>

      <p className="mt-8 text-xs font-black uppercase tracking-[0.25em] text-pop">{kicker}</p>
      <h1 className="mt-1 font-display text-4xl font-black sm:text-5xl">{title}</h1>
      {updated && <p className="mt-2 text-sm text-ink/50">Last updated: {updated}</p>}

      <div className="mt-8 rounded-2xl border-[3px] border-ink bg-card p-6 shadow-hard sm:p-10">
        <div className="legal-prose">{children}</div>
      </div>
    </div>
  );
}
