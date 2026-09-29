"use client";

import { useEffect, useRef } from "react";

interface AdUnitProps {
  client: string;
  slot: string;
}

/** Renders a live AdSense unit and pushes it to adsbygoogle once. */
export default function AdUnit({ client, slot }: AdUnitProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      const w = window as unknown as { adsbygoogle: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      /* AdSense blocked or not yet loaded — fail silently */
    }
  }, []);

  return (
    <div className="rounded-2xl border-[3px] border-ink bg-card px-4 py-3 shadow-hard-sm">
      <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-ink/40">
        Advertisement
      </p>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
