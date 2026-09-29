import Image from "next/image";
import ChapterTool from "@/components/ChapterTool";
import AdSlot from "@/components/AdSlot";
import ToolkitSection from "@/components/ToolkitSection";

const FAQS = [
  {
    q: "What is a YouTube chapter generator?",
    a: "A YouTube chapter generator turns your video's transcript into clickable timestamps (like 00:00 Intro, 02:14 The Demo). Chapters appear in YouTube's progress bar and in Google search results, which boosts watch time and click-through. Stamp Chapters does it free — paste a link or transcript and get description-ready chapters in seconds.",
  },
  {
    q: "How do I add chapters to my YouTube video?",
    a: "Paste a list of timestamps and titles at the top of your video description. YouTube requires the first timestamp to be 00:00 and at least 3 chapters. Stamp Chapters formats everything correctly for you — just hit Copy and paste it into your description.",
  },
  {
    q: "My video has no captions. Can I still generate chapters?",
    a: "Yes. Switch to the “Paste transcript” tab and drop in your script or notes. Lines starting with [MM:SS] timestamps are honored exactly; without timestamps, Stamp Chapters spaces your lines out and still finds the chapter breaks.",
  },
  {
    q: "What does the Hook Score measure?",
    a: "It scores the first 30 seconds of your video on four things that decide whether viewers stay: curiosity (questions, numbers, power words), clarity (no filler openers or subscribe-begging), pacing (ideal: 2–3 words per second), and payoff promise (does the viewer know what's in it for them). You get a 0–100 score plus specific fixes.",
  },
  {
    q: "Is Stamp Chapters really free?",
    a: "Yes — free forever, no account needed. Everything runs on rule-based analysis in your browser and on our server, so there are no per-video AI costs to pass on to you. The site is supported by ads.",
  },
  {
    q: "Do chapters help my video rank on Google?",
    a: "They can. Google often shows video chapters as “key moments” under search results, giving your video more screen space and more reasons to click. Clear, keyword-rich chapter titles work like mini-headlines for each section of your video.",
  },
];

function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function Sticker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block rounded-full border-[3px] border-ink bg-white px-4 py-1.5 text-sm font-black shadow-hard-sm ${className}`}
    >
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <FaqJsonLd />

      {/* ---------- Header ---------- */}
      <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="/" className="flex items-center gap-2" aria-label="Stamp Chapters home">
            {/* Logo */}
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border-[3px] border-ink bg-sun">
              <Image src="/logo.png" alt="Stamp Chapters logo" width={40} height={40} />
            </span>
            <span className="font-display text-xl font-black tracking-tight">Stamp Chapters</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-bold sm:flex" aria-label="Main">
            <a href="#tool" className="hover:underline">The tool</a>
            <a href="#how" className="hover:underline">How it works</a>
            <a href="#faq" className="hover:underline">FAQ</a>
            <a href="/guides" className="hover:underline">Guides</a>
          </nav>
          <a
            href="#tool"
            className="rounded-xl border-[3px] border-ink bg-ink px-4 py-2 text-sm font-black text-paper shadow-hard-sm transition-transform hover:-translate-y-0.5"
          >
            Try it free
          </a>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="dotgrid border-b-[3px] border-ink">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:py-16 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="flex flex-wrap gap-2">
              <Sticker className="tilt-l bg-sun">✨ 100% free</Sticker>
              <Sticker className="tilt-r">No signup</Sticker>
              <Sticker className="tilt-l bg-skyy">Hook score included</Sticker>
            </div>
            <h1 className="mt-5 font-display text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl">
              Chapters your viewers <span className="marker">actually click.</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-ink/75">
              Paste your transcript — Stamp Chapters writes
              perfectly-timed chapters and scores your opening hook. Copy, paste into
              your description, done.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#tool"
                className="rounded-2xl border-[3px] border-ink bg-pop px-7 py-3.5 font-display text-lg font-black text-white shadow-hard transition-transform hover:-translate-y-1"
              >
                Generate chapters ⚡
              </a>
              <a
                href="#how"
                className="rounded-2xl border-[3px] border-ink bg-white px-7 py-3.5 font-display text-lg font-black shadow-hard transition-transform hover:-translate-y-1"
              >
                How it works
              </a>
            </div>
            <p className="mt-4 text-sm text-ink/60">
              Loved by tutorial makers, podcasters & essayists — anyone who talks for more than 3 minutes.
            </p>
          </div>

          {/* Mascot */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="tilt-r rounded-3xl border-[3px] border-ink bg-card p-6 shadow-hard-lg">
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border-[3px] border-dashed border-ink/30 bg-paper">
                <Image
                  src="/mascot.png"
                  alt="Stamp Chapters mascot"
                  width={400}
                  height={400}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
              <p className="mt-3 text-center text-xs font-bold uppercase tracking-widest text-ink/50">
                Official chapter-stamper
              </p>
            </div>
            <Sticker className="tilt-l absolute -top-3 -left-3 bg-lilac">⏱ 00:00</Sticker>
            <Sticker className="tilt-r absolute -bottom-3 -right-3 bg-sun">📑 stamped!</Sticker>
          </div>
        </div>
      </section>

      {/* ---------- Leaderboard ad under hero ---------- */}
      <div className="border-b-[3px] border-ink bg-paper py-6">
        <AdSlot format="leaderboard" slot="" />
      </div>

      {/* ---------- Tool ---------- */}
      <section id="tool" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-pop">The tool</p>
            <h2 className="font-display text-3xl font-black sm:text-4xl">Stamp it in seconds</h2>
          </div>
          <Sticker className="tilt-r-sm hidden bg-skyy sm:inline-block">⚡ instant</Sticker>
        </div>
        <ChapterTool />
      </section>

      {/* ---------- How it works ---------- */}
      <section id="how" className="border-y-[3px] border-ink bg-ink text-paper">
        <div className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-sun">How it works</p>
          <h2 className="mt-1 font-display text-3xl font-black sm:text-4xl">Three steps. Zero editing timelines.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                n: "1",
                t: "Paste your transcript",
                d: "Paste your transcript or script (with optional [MM:SS] timestamps) — or try a YouTube link and we'll fetch captions when YouTube allows it.",
                c: "bg-sun text-ink",
              },
              {
                n: "2",
                t: "Get chapters + hook score",
                d: "Our rule-based engine finds every topic shift and scores your first 30 seconds on curiosity, clarity, pacing and payoff.",
                c: "bg-pop text-white",
              },
              {
                n: "3",
                t: "Copy into your description",
                d: "Edit any title inline, hit Copy, and paste the YouTube-ready timestamps straight into your description box.",
                c: "bg-skyy text-ink",
              },
            ].map((s, i) => (
              <div
                key={i}
                className={`rounded-2xl border-[3px] border-paper/90 p-6 ${i === 1 ? "tilt-l" : i === 2 ? "tilt-r" : ""}`}
              >
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border-[3px] border-paper font-display text-xl font-black ${s.c}`}>
                  {s.n}
                </span>
                <h3 className="mt-4 font-display text-xl font-black">{s.t}</h3>
                <p className="mt-2 text-paper/70">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-pop">Why creators stamp</p>
        <h2 className="mt-1 font-display text-3xl font-black sm:text-4xl">Built for the description box</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { e: "🎯", t: "Smart segmentation", d: "Detects numbered lists, questions and transition phrases — not just silence gaps." },
            { e: "✏️", t: "Fully editable", d: "Retitle, retime, delete or add chapters. You're the director; we're the assistant." },
            { e: "🪝", t: "Hook analyzer", d: "A 0–100 score for your opening with four sub-scores and concrete fixes." },
            { e: "💸", t: "Free, no catch", d: "No accounts, no watermarks, no '5 free videos'. Rule-based = zero cost per video." },
          ].map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border-[3px] border-ink bg-card p-5 shadow-hard-sm transition-transform hover:-translate-y-1"
            >
              <span className="text-3xl" role="img" aria-hidden="true">{f.e}</span>
              <h3 className="mt-3 font-display text-lg font-black">{f.t}</h3>
              <p className="mt-1 text-sm text-ink/70">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- In-feed ad between tool output area and FAQ ---------- */}
      <AdSlot format="rectangle" slot="" className="pb-4" />

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="mx-auto max-w-4xl scroll-mt-24 px-4 py-14">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-pop">FAQ</p>
        <h2 className="mt-1 font-display text-3xl font-black sm:text-4xl">Questions creators ask</h2>
        <div className="mt-8 space-y-4">
          {FAQS.map((f, i) => (
            <details
              key={i}
              className="group rounded-2xl border-[3px] border-ink bg-card shadow-hard-sm"
            >
              <summary className="cursor-pointer list-none p-5 font-display text-lg font-bold [&::-webkit-details-marker]:hidden">
                <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-lg border-2 border-ink bg-sun text-sm font-black transition-transform group-open:rotate-45">
                  +
                </span>
                {f.q}
              </summary>
              <div className="ticket-edge mx-5" />
              <p className="p-5 pt-4 text-ink/75">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- Creator toolkit (affiliates) ---------- */}
      <ToolkitSection />

      {/* ---------- Footer ---------- */}
      <footer className="border-t-[3px] border-ink bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border-[3px] border-paper bg-sun">
                <Image src="/logo.png" alt="Stamp Chapters logo" width={40} height={40} />
              </span>
              <div>
                <p className="font-display text-lg font-black">Stamp Chapters</p>
                <p className="text-xs text-paper/60">Chapters your viewers actually click.</p>
              </div>
            </div>
            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold" aria-label="Footer">
              <a href="#tool" className="hover:underline">Tool</a>
              <a href="#how" className="hover:underline">How it works</a>
              <a href="#faq" className="hover:underline">FAQ</a>
              <a href="/guides" className="hover:underline">Guides</a>
              <a href="/about" className="hover:underline">About</a>
              <a href="/contact" className="hover:underline">Contact</a>
              <a href="/privacy" className="hover:underline">Privacy</a>
              <a href="/terms" className="hover:underline">Terms</a>
            </nav>
          </div>
          <div className="mt-8">
            <AdSlot format="leaderboard" slot="" />
          </div>
          <div className="mt-8 flex justify-center">
            <span className="inline-flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-[3px] border-paper bg-cream">
              <Image src="/mascot-wave.png" alt="Stampy waving goodbye" width={80} height={80} />
            </span>
          </div>
          <p className="mt-6 text-center text-xs text-paper/50">
            © {new Date().getFullYear()} Stamp Chapters. Made for creators. Not affiliated with YouTube or Google.
          </p>
        </div>
      </footer>
    </div>
  );
}
