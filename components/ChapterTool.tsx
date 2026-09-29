"use client";

import { useMemo, useState } from "react";
import {
  generateChapters,
  toYouTubeDescription,
  formatTimestamp,
  parseTimestampInput,
  parsePastedTranscript,
  type CaptionSegment,
  type Chapter,
} from "@/lib/chapters";
import { scoreHook, type HookScore } from "@/lib/hook";
import HookScorePanel from "./HookScorePanel";

const SAMPLE_TRANSCRIPT = `[00:00] hey everyone, today I'm testing three budget microphones so you don't waste your money
[00:38] first up is the twenty five dollar lav mic — I clipped it to my shirt and walked outside into the wind
[01:52] next up, the usb condenser mic — this is the one most beginners buy, so let's see if it's actually worth it
[03:10] now let's talk about the wireless go mic — it's triple the price, but does it sound triple as good?
[04:45] here's the thing nobody tells you about mic placement — one inch makes a bigger difference than a hundred dollars
[06:02] so which one should you buy? I'll give you my honest pick for streaming, for vlogging, and for podcasts`;

type Mode = "url" | "paste";

export default function ChapterTool() {
  const [mode, setMode] = useState<Mode>("paste");
  const [url, setUrl] = useState("");
  const [paste, setPaste] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [copyGuide, setCopyGuide] = useState(false);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [hook, setHook] = useState<HookScore | null>(null);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => toYouTubeDescription(chapters), [chapters]);

  function runEngine(segments: CaptionSegment[], title?: string) {
    setChapters(generateChapters(segments));
    setHook(scoreHook(segments));
    setVideoTitle(title ?? null);
    setCopied(false);
  }

  async function handleFetch() {
    setLoading(true);
    setError(null);
    setHint(null);
    setCopyGuide(false);
    // YouTube routinely blocks server-side caption fetching from hosting IPs,
    // so a failed fetch drops the user onto the paste tab with a 20-second guide.
    const fetchFailed = (err: string, hnt: string | null) => {
      setError(err);
      setHint(hnt);
      setMode("paste");
      setCopyGuide(true);
    };
    try {
      const res = await fetch(`/api/transcript?input=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (!res.ok) {
        fetchFailed(data.error || "Something went wrong.", data.hint || null);
        return;
      }
      runEngine(data.segments, data.title);
    } catch {
      fetchFailed(
        "Couldn't reach the server. Check your connection and try again.",
        "Or skip the wait — paste your transcript below, it always works."
      );
    } finally {
      setLoading(false);
    }
  }

  function handlePaste() {
    setError(null);
    setHint(null);
    setCopyGuide(false);
    const segments = parsePastedTranscript(paste);
    if (segments.length === 0) {
      setError("Paste some transcript text first.");
      return;
    }
    runEngine(segments);
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSample() {
    setMode("paste");
    setCopyGuide(false);
    setPaste(SAMPLE_TRANSCRIPT);
    setError(null);
    setHint(null);
    const segments = parsePastedTranscript(SAMPLE_TRANSCRIPT);
    runEngine(segments, "Sample: 3 budget microphones tested");
    setTimeout(
      () => document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      50
    );
  }

  function updateTitle(i: number, title: string) {
    setChapters((cs) => cs.map((c, j) => (j === i ? { ...c, title } : c)));
  }

  function updateTime(i: number, raw: string) {
    const secs = parseTimestampInput(raw);
    if (secs === null) return; // ignore invalid input, keep old value
    setChapters((cs) => {
      const next = cs.map((c, j) => (j === i ? { ...c, start: secs } : c));
      next.sort((a, b) => a.start - b.start);
      return next;
    });
  }

  function removeChapter(i: number) {
    setChapters((cs) => cs.filter((_, j) => j !== i));
  }

  function addChapter() {
    setChapters((cs) => {
      const last = cs[cs.length - 1];
      const start = last ? last.start + 60 : 0;
      return [...cs, { start, title: `Part ${cs.length + 1}` }].sort((a, b) => a.start - b.start);
    });
  }

  async function copyOutput() {
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = output;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const tabCls = (active: boolean) =>
    `rounded-xl border-[3px] border-ink px-4 py-2 text-sm font-black transition-transform ${
      active ? "bg-ink text-paper shadow-hard-sm -translate-y-0.5" : "bg-white text-ink hover:-translate-y-0.5"
    }`;

  return (
    <div className="rounded-3xl border-[3px] border-ink bg-card p-4 shadow-hard sm:p-6">
      {/* Mode tabs */}
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Input method">
        <button role="tab" aria-selected={mode === "paste"} className={tabCls(mode === "paste")} onClick={() => { setMode("paste"); setCopyGuide(false); setError(null); setHint(null); }}>
          📝 Paste transcript
        </button>
        <button role="tab" aria-selected={mode === "url"} className={tabCls(mode === "url")} onClick={() => { setMode("url"); setCopyGuide(false); setError(null); setHint(null); }}>
          🔗 YouTube URL
        </button>
        <button
          id="try-sample"
          onClick={handleSample}
          className="ml-auto rounded-xl border-[3px] border-dashed border-ink/50 px-4 py-2 text-sm font-bold text-ink/70 hover:border-ink hover:text-ink"
        >
          Try a sample →
        </button>
      </div>

      {/* Inputs */}
      <div className="mt-4">
        {mode === "url" ? (
          <div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <label htmlFor="yt-url" className="sr-only">YouTube video URL</label>
              <input
                id="yt-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleFetch()}
                placeholder="https://www.youtube.com/watch?v=…"
                className="flex-1 rounded-xl border-[3px] border-ink bg-white px-4 py-3 text-sm font-medium placeholder:text-ink/40"
              />
              <button
                onClick={handleFetch}
                disabled={loading || !url.trim()}
                className="rounded-xl border-[3px] border-ink bg-pop px-6 py-3 font-display text-base font-black text-white shadow-hard-sm transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Fetching…" : "Generate ⚡"}
              </button>
            </div>
            <p className="mt-2 text-xs font-medium text-ink/50">
              Heads up: YouTube often blocks auto-fetch from our server. If it fails, you&apos;ll land on the paste tab with a 20-second guide — that always works.
            </p>
          </div>
        ) : (
          <div>
            {copyGuide && (
              <div className="mb-3 rounded-xl border-[3px] border-ink bg-sun/50 p-4 text-sm" role="note">
                <p className="font-black">⚡ YouTube blocked the auto-fetch — grab your transcript in ~20 seconds:</p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 font-medium text-ink/80">
                  <li>Open the video on YouTube and click <b>…more</b> in the description.</li>
                  <li>Click <b>Show transcript</b> and copy the text (timestamps optional).</li>
                  <li>Paste it below and hit Generate. 👇</li>
                </ol>
              </div>
            )}
            <label htmlFor="paste-box" className="sr-only">Paste transcript</label>
            <textarea
              id="paste-box"
              value={paste}
              onChange={(e) => setPaste(e.target.value)}
              rows={7}
              placeholder={"Paste your transcript here.\nWorks with YouTube's transcript copy (timestamps on their own lines)\nor [MM:SS] timestamps, e.g.\n[00:00] welcome to the video\n[01:23] next up, the good stuff"}
              className="w-full rounded-xl border-[3px] border-ink bg-white px-4 py-3 font-mono text-sm placeholder:text-ink/40"
            />
            <button
              onClick={handlePaste}
              disabled={!paste.trim()}
              className="mt-2 rounded-xl border-[3px] border-ink bg-pop px-6 py-3 font-display text-base font-black text-white shadow-hard-sm transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Generate ⚡
            </button>
          </div>
        )}
        <p className="mt-2 text-xs text-ink/60">
          Free forever, no signup. YouTube often blocks automatic caption fetching — if it does, the paste tab always works.
        </p>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border-[3px] border-ink bg-pop/15 p-4" role="alert">
          <p className="font-bold">⚠️ {error}</p>
          {hint && <p className="mt-1 text-sm text-ink/70">{hint}</p>}
        </div>
      )}

      {/* Results */}
      {chapters.length > 0 && (
        <div id="results" className="mt-6 grid gap-6 lg:grid-cols-2">
          <section aria-label="Chapters" className="rounded-2xl border-[3px] border-ink bg-paper p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-black">
                Chapters {videoTitle && <span className="text-sm font-sans font-medium text-ink/60">· {videoTitle.slice(0, 40)}</span>}
              </h3>
              <span className="rounded-full border-2 border-ink bg-sun px-2 py-0.5 text-xs font-black">
                {chapters.length}
              </span>
            </div>

            <ul className="mt-3 max-h-80 space-y-2 overflow-y-auto pr-1">
              {chapters.map((c, i) => (
                <li key={i} className="flex items-center gap-2 rounded-xl border-2 border-ink bg-white p-2">
                  <input
                    aria-label={`Chapter ${i + 1} timestamp`}
                    defaultValue={formatTimestamp(c.start)}
                    key={`t-${i}-${c.start}`}
                    onBlur={(e) => updateTime(i, e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
                    className="w-20 shrink-0 rounded-lg border-2 border-ink/20 bg-paper px-1 py-1 text-center font-mono text-xs font-bold focus:border-ink"
                  />
                  <input
                    aria-label={`Chapter ${i + 1} title`}
                    value={c.title}
                    onChange={(e) => updateTitle(i, e.target.value)}
                    className="min-w-0 flex-1 rounded-lg px-1 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pop"
                  />
                  <button
                    onClick={() => removeChapter(i)}
                    aria-label={`Remove chapter ${i + 1}`}
                    className="shrink-0 rounded-lg border-2 border-ink/20 px-2 py-1 text-xs font-black text-ink/50 hover:border-pop hover:text-pop"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={addChapter}
              className="mt-3 w-full rounded-xl border-[3px] border-dashed border-ink/40 py-2 text-sm font-bold text-ink/60 hover:border-ink hover:text-ink"
            >
              + Add chapter
            </button>
            <p className="mt-2 text-xs text-ink/60">
              💡 YouTube shows chapters when your description starts at <b>00:00</b> and has 3+ timestamps.
            </p>
          </section>

          <div className="space-y-6">
            <section aria-label="YouTube description output" className="rounded-2xl border-[3px] border-ink bg-ink p-4 text-paper">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-black">Description-ready</h3>
                <button
                  onClick={copyOutput}
                  className={`rounded-xl border-[3px] px-4 py-2 text-sm font-black transition-transform hover:-translate-y-0.5 ${
                    copied ? "border-sun bg-sun text-ink" : "border-paper bg-paper text-ink"
                  }`}
                >
                  {copied ? "Copied! ✓" : "Copy 📋"}
                </button>
              </div>
              <pre className="mt-3 max-h-64 overflow-y-auto whitespace-pre-wrap rounded-xl bg-black/40 p-3 font-mono text-sm leading-relaxed">
                {output}
              </pre>
              <p className="mt-2 text-xs text-paper/60">Paste this at the top of your YouTube description.</p>
            </section>

            {hook && <HookScorePanel score={hook} />}
          </div>
        </div>
      )}
    </div>
  );
}
