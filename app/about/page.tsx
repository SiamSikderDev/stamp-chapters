import type { Metadata } from "next";
import Image from "next/image";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "What Stamp Chapters is: a free YouTube chapter generator and hook scorer for creators, built by an indie maker.",
};

export default function AboutPage() {
  return (
    <LegalPage kicker="About" title="About Stamp Chapters">
      <div className="flex items-center gap-4">
        <span className="inline-flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-[3px] border-ink bg-cream">
          <Image src="/mascot.png" alt="Stampy, the Stamp Chapters mascot" width={80} height={80} />
        </span>
        <p className="!mt-0">
          <strong>Meet Stampy</strong> — our chubby orange tabby who stamps your videos
          with perfect chapters. 🐾
        </p>
      </div>

      <h2>What is Stamp Chapters?</h2>
      <p>
        Stamp Chapters is a <strong>free YouTube chapter generator and hook scorer</strong>{" "}
        for creators. Paste a video link or transcript and get:
      </p>
      <ul>
        <li>
          <strong>Perfectly-timed chapters</strong> — ready to paste at the top of your
          YouTube description, so viewers can jump to the good parts.
        </li>
        <li>
          <strong>An opening-hook score</strong> — measuring curiosity, clarity, pacing and
          payoff promise in your first 30 seconds, with concrete tips to fix a weak hook.
        </li>
      </ul>

      <h2>Why it exists</h2>
      <p>
        Chapters boost watch time and make videos feel professional — but writing them by
        hand is tedious, and most generators either cost money or produce messy timestamps.
        Stamp Chapters does one job well: clean chapters in seconds, free forever, no
        signup.
      </p>

      <h2>How it works</h2>
      <p>
        Everything runs on a transparent, rule-based engine — no black-box AI, no API
        costs, no data harvesting. Your transcript never leaves your browser. That&apos;s
        also why the tool is fast and always free.
      </p>

      <h2>Who built this?</h2>
      <p>
        Stamp Chapters is an indie project by a solo maker who builds tools for creators.
        If it saves you time, the best thanks is sharing it with a fellow YouTuber.
      </p>

      <h2>Not affiliated with YouTube</h2>
      <p>
        Stamp Chapters is an independent tool and is not affiliated with, endorsed by, or
        sponsored by YouTube or Google.
      </p>
    </LegalPage>
  );
}
