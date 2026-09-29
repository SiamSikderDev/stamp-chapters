/**
 * lib/chapters.ts — rule-based chapter segmentation engine.
 *
 * Pure functions, no I/O, no AI calls: zero running cost.
 * Signals: numbered items ("step 1", "number two"), questions,
 * transition phrases ("next up", "moving on"), with a 30s minimum gap
 * and a forced chapter when nothing is detected for 5 minutes.
 */

export interface CaptionSegment {
  start: number;
  dur: number;
  text: string;
  /** Section header detected during parsing ("Title\n0:14" style markers). */
  header?: string;
}

export interface Chapter {
  start: number; // seconds
  title: string;
}

const NUMBER_WORDS: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5,
  six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12,
};

const TRANSITIONS =
  /\b(next up|moving on|now let's|let's talk about|let's discuss|let's look at|let's get into|first up|first(ly)?[,.]|second(ly)?[,.]|third(ly)?[,.]|finally[,.]|lastly[,.]|in conclusion|to sum up|to wrap up|another (tip|point|thing|step)|tip number|here's the thing|with that (said|out of the way))(?!\w)/i;

const NUMBERED_LEAD =
  /^(?:step|part|tip|point|number|no\.?|#)?\s*(\d{1,2})\s*[.):\-–—]/i;
const NUMBERED_WORD_LEAD =
  /^(?:step|part|tip|point|number)\s+(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\b/i;

const FILLER_START =
  /^(so|well|okay|ok|alright|right|now|and|but|anyway|hey everyone|hi everyone|hello everyone|hey guys|hi guys)\b[,\s]*/i;
const STRIP_NUMBERING =
  /^(?:step|part|tip|point|number|no\.?|#)?\s*(?:\d{1,2}|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s*[.):\-–—]\s*/i;

const MIN_GAP = 30; // seconds between chapters
const MAX_GAP = 300; // force a chapter if nothing detected for 5 min
const FORCE_EVERY = 240; // insert forced chapters roughly every 4 min

interface Candidate {
  index: number;
  start: number;
  score: number;
  numbered: number | null;
  /** Explicit "Title\n0:14" header markers are always kept. */
  isHeader: boolean;
}

function scoreSegment(seg: CaptionSegment): { score: number; numbered: number | null } {
  const t = seg.text.trim();
  let score = 0;
  let numbered: number | null = null;

  const mNum = t.match(NUMBERED_LEAD);
  if (mNum) {
    numbered = parseInt(mNum[1], 10);
    score += 5;
  } else {
    const mWord = t.match(NUMBERED_WORD_LEAD);
    if (mWord) {
      numbered = NUMBER_WORDS[mWord[1].toLowerCase()] ?? null;
      score += 5;
    }
  }
  if (t.includes("?")) score += 3;
  if (TRANSITIONS.test(t)) score += 4;
  // Explicit section headers ("Title\n0:14" markers) are strong boundaries too.
  if (seg.header) score += 4;
  return { score, numbered };
}

function nearestSegmentIndex(segments: CaptionSegment[], time: number): number {
  let best = 0;
  let bestDist = Infinity;
  segments.forEach((s, i) => {
    const d = Math.abs(s.start - time);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  });
  return best;
}

function titleCase(s: string): string {
  return s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

/** Build a clean ≤60-char title from a segment's text (or its detected header). */
export function makeTitle(
  raw: string,
  fallbackIndex: number,
  numbered: number | null = null,
  header?: string
): string {
  let t = (header && header.trim() ? header : raw).trim();
  // Safety: a timestamp that slipped into the text must never reach a title.
  t = t.replace(/\[?\b\d{1,2}:\d{2}(?::\d{2})?\b\]?/g, " ").replace(/\s+/g, " ").trim();
  // First sentence only
  const first = t.split(/(?<=[.!?…])\s+/)[0] ?? t;
  t = first;
  // Strip leading numbering ("Step 1:", "1.", "#2 -" ...)
  t = t.replace(STRIP_NUMBERING, "");
  // Strip conversational filler at the start
  t = t.replace(FILLER_START, "");
  // Keep it punchy: max 9 words
  t = t.split(/\s+/).slice(0, 9).join(" ").trim();
  t = titleCase(t).replace(/[.,;:!?…]+$/, "");
  if (t.length > 60) t = t.slice(0, 57).trimEnd() + "…";
  if (numbered !== null) t = `Step ${numbered}: ${t}`;
  return t || `Part ${fallbackIndex + 1}`;
}

/** Main entry: turn caption segments into chapters. */
export function generateChapters(segments: CaptionSegment[]): Chapter[] {
  if (segments.length === 0) return [];

  // 1) Collect scored candidates (skip index 0 — that's always the intro)
  const candidates: Candidate[] = [];
  segments.forEach((s, i) => {
    if (i === 0) return;
    const { score, numbered } = scoreSegment(s);
    if (score > 0) candidates.push({ index: i, start: s.start, score, numbered, isHeader: !!s.header });
  });
  candidates.sort((a, b) => a.start - b.start);

  // 2) Greedy pick with minimum gap; a stronger close candidate replaces a
  // weaker one. Explicit header markers are always kept and never replaced.
  const picked: Candidate[] = [];
  for (const c of candidates) {
    const last = picked[picked.length - 1];
    if (!last || c.start - last.start >= MIN_GAP || c.isHeader) {
      picked.push(c);
    } else if (c.score > last.score && !last.isHeader) {
      picked[picked.length - 1] = c;
    }
  }

  // 3) Assemble, filling long silent gaps with forced chapters
  const chapters: Chapter[] = [
    { start: 0, title: makeTitle(segments[0].text, 0, null, segments[0].header) || "Intro" },
  ];
  if (chapters[0].title === `Part 1`) chapters[0].title = "Intro";
  let cursor = 0;

  for (const c of picked) {
    while (c.start - cursor > MAX_GAP) {
      const idx = nearestSegmentIndex(segments, cursor + FORCE_EVERY);
      const seg = segments[idx];
      if (seg.start <= cursor) break; // safety: never go backwards
      chapters.push({ start: seg.start, title: makeTitle(seg.text, chapters.length, null, seg.header) });
      cursor = seg.start;
    }
    chapters.push({
      start: c.start,
      title: makeTitle(segments[c.index].text, chapters.length, c.numbered, segments[c.index].header),
    });
    cursor = c.start;
  }

  // 4) Thin out pathological cases (cap at 60 chapters)
  if (chapters.length > 60) {
    const step = Math.ceil(chapters.length / 60);
    return chapters.filter((_, i) => i % step === 0 || i === chapters.length - 1);
  }
  return chapters;
}

/** 0:42 or 1:12:05 — YouTube description format. */
export function formatTimestamp(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  return `${h > 0 ? h + ":" : ""}${mm}:${String(sec).padStart(2, "0")}`;
}

/** Parse "MM:SS" / "H:MM:SS" (with optional brackets) back to seconds. */
export function parseTimestampInput(input: string): number | null {
  const m = input.trim().match(/^\[?(\d{1,2}):(\d{2})(?::(\d{2}))?\]?$/);
  if (!m) return null;
  const h = m[3] ? parseInt(m[1], 10) : 0;
  const min = m[3] ? parseInt(m[2], 10) : parseInt(m[1], 10);
  const sec = m[3] ? parseInt(m[3], 10) : parseInt(m[2], 10);
  return h * 3600 + min * 60 + sec;
}

/** Render chapters as YouTube-description text. */
export function toYouTubeDescription(chapters: Chapter[]): string {
  return chapters.map((c) => `${formatTimestamp(c.start)} ${c.title}`).join("\n");
}
/**
 * Parse a pasted transcript. Supports three layouts:
 *  1. "[MM:SS] text" / "MM:SS text" — timestamp + text on one line.
 *  2. YouTube's "Show transcript" copy — bare "MM:SS" on its own line,
 *     followed by caption lines.
 *  3. Plain text with no timestamps at all (evenly spaced ~25s apart).
 * Also detects "Section Title\nMM:SS" markers (a short header-like line
 * right before a bare timestamp) and keeps them as chapter titles.
 */
export function parsePastedTranscript(raw: string): CaptionSegment[] {
  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);

  const TS_ONLY = /^\[?(\d{1,2}):(\d{2})(?::(\d{2}))?\]?$/;
  const TS_WITH_TEXT = /^\[?(\d{1,2}):(\d{2})(?::(\d{2}))?\]?\s+(.+)$/;
  const toSecs = (m: RegExpMatchArray): number => {
    const h = m[3] ? parseInt(m[1], 10) : 0;
    const min = m[3] ? parseInt(m[2], 10) : parseInt(m[1], 10);
    const sec = m[3] ? parseInt(m[3], 10) : parseInt(m[2], 10);
    return h * 3600 + min * 60 + sec;
  };
  // A section header: short, starts uppercase, no sentence punctuation.
  // (Caption fragments like "profile icon. This will open your" are
  // rejected by the punctuation / lowercase-start checks.)
  const isHeaderLine = (line: string): boolean => {
    const words = line.split(/\s+/);
    return (
      words.length >= 1 &&
      words.length <= 6 &&
      line.length <= 45 &&
      /^[A-Z]/.test(line) &&
      !/[.!?…]/.test(line) &&
      !/^\d/.test(line) &&
      /[a-zA-Z]/.test(line)
    );
  };

  interface WorkSeg {
    start: number;
    lines: string[];
    header?: string;
  }
  const work: WorkSeg[] = [];
  let anyTimed = false;

  for (const rawLine of lines) {
    // "Intro 0:00" or "Intro 0:00 hello" → ["Intro", "0:00", "hello"].
    // Only splits when the leading text looks like a section header,
    // so time mentions in speech ("set it to 1:30") are left alone.
    const expand = (line: string): string[] => {
      const m = line.match(/^(.*?)\s*(\[?\d{1,2}:\d{2}(?::\d{2})?\]?)(?:\s+(.+))?$/);
      if (m && m[1].trim() && isHeaderLine(m[1].trim())) {
        const toks = [m[1].trim(), m[2]];
        if (m[3] && m[3].trim()) toks.push(m[3].trim());
        return toks;
      }
      return [line];
    };

    for (const line of expand(rawLine)) {
      const wt = line.match(TS_WITH_TEXT);
      if (wt && wt[4].trim()) {
        anyTimed = true;
        work.push({ start: toSecs(wt), lines: [wt[4].trim()] });
        continue;
      }
      const bare = line.match(TS_ONLY);
      if (bare) {
        const t = toSecs(bare);
        const prev0 = work[work.length - 1];
        if (prev0 && t < prev0.start) {
          // Out of order — almost certainly a time mentioned in speech.
          prev0.lines.push(line);
          continue;
        }
        anyTimed = true;
        const prev = work[work.length - 1];
        let header: string | undefined;
        if (
          prev &&
          prev.lines.length >= 2 &&
          isHeaderLine(prev.lines[prev.lines.length - 1])
        ) {
          header = prev.lines.pop();
        }
        work.push({ start: t, lines: [], header });
        continue;
      }
      const cur = work[work.length - 1];
      if (cur) cur.lines.push(line);
      else work.push({ start: 0, lines: [line] });
    }
  }

  const segs: CaptionSegment[] = work
    .map((w) => ({
      start: w.start,
      dur: 0,
      text: w.lines.join(" ").replace(/\s+/g, " ").trim(),
      ...(w.header ? { header: w.header } : {}),
    }))
    .filter((s) => s.text.length > 0 || s.header);

  if (segs.length === 0) return [];

  if (!anyTimed) {
    // Evenly space untimed lines ~25s apart so the engine still works
    segs.forEach((s, i) => {
      s.start = i * 25;
      s.dur = 25;
    });
  } else {
    segs.forEach((s, i) => {
      s.dur = i < segs.length - 1 ? Math.max(5, segs[i + 1].start - s.start) : 30;
    });
  }
  return segs;
}
