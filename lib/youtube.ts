/**
 * lib/youtube.ts — server-side YouTube caption fetching.
 *
 * Method: POST to the youtubei /player endpoint with an ANDROID web-client
 * context. The ANDROID client reliably returns `captionTracks` for public
 * videos without any API key. We then download the timedtext XML track
 * and parse it into segments.
 *
 * This module is imported by the /api/transcript route (server only).
 */

export interface CaptionSegment {
  start: number; // seconds
  dur: number; // seconds
  text: string;
}

export interface TranscriptResult {
  videoId: string;
  title: string;
  language: string;
  segments: CaptionSegment[];
}

/** Extract an 11-char video ID from URLs or bare IDs. */
export function extractVideoId(input: string): string | null {
  const s = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
  const patterns = [
    /(?:youtube\.com\/(?:watch\?[^#]*v=|shorts\/|embed\/|live\/|v\/))([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/attribution_link\?.*v%3D([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = s.match(p);
    if (m) return m[1];
  }
  return null;
}

export class TranscriptError extends Error {
  code: "NO_CAPTIONS" | "FETCH_FAILED" | "VIDEO_UNAVAILABLE";
  constructor(code: TranscriptError["code"], message: string) {
    super(message);
    this.code = code;
  }
}

interface CaptionTrack {
  baseUrl: string;
  name?: { simpleText?: string };
  languageCode?: string;
  kind?: string; // "asr" = auto-generated
}

function decodeEntities(s: string): string {
  return s
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
}

function parseTimedText(xml: string): CaptionSegment[] {
  const segs: CaptionSegment[] = [];
  const re = /<text start="([\d.]+)" dur="([\d.]+)"[^>]*>([\s\S]*?)<\/text>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    const text = decodeEntities(m[3].replace(/<[^>]+>/g, ""))
      .replace(/\s+/g, " ")
      .trim();
    if (!text) continue;
    segs.push({
      start: parseFloat(m[1]),
      dur: parseFloat(m[2]),
      text,
    });
  }
  return segs;
}

/** Pick the best caption track: manual English > any English > manual other > ASR. */
function pickTrack(tracks: CaptionTrack[]): CaptionTrack {
  const score = (t: CaptionTrack) => {
    const isEn = (t.languageCode || "").toLowerCase().startsWith("en");
    const isAsr = t.kind === "asr";
    return (isEn ? 2 : 0) + (isAsr ? 0 : 1);
  };
  return [...tracks].sort((a, b) => score(b) - score(a))[0];
}

export async function fetchTranscript(videoId: string): Promise<TranscriptResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    // 1) Ask youtubei for the player response (ANDROID client => captionTracks, no key needed)
    const playerRes = await fetch("https://www.youtube.com/youtubei/v1/player", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "com.google.android.youtube/19.09.37 (Linux; U; Android 11) gzip",
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: "ANDROID",
            clientVersion: "19.09.37",
            androidSdkVersion: 30,
            hl: "en",
            gl: "US",
          },
        },
        videoId,
      }),
    });

    if (!playerRes.ok) {
      throw new TranscriptError("FETCH_FAILED", `youtubei returned ${playerRes.status}`);
    }

    const player = await playerRes.json();
    const status = player?.playabilityStatus?.status;
    if (status && status !== "OK") {
      throw new TranscriptError(
        "VIDEO_UNAVAILABLE",
        `Video not playable (${status}). It may be private, age-restricted, or region-blocked.`
      );
    }

    const tracks: CaptionTrack[] | undefined =
      player?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    if (!tracks || tracks.length === 0) {
      throw new TranscriptError("NO_CAPTIONS", "No caption tracks found for this video.");
    }

    const track = pickTrack(tracks);
    const title: string =
      player?.videoDetails?.title || player?.videoDetails?.shortDescription?.slice(0, 80) || "YouTube video";

    // 2) Download the timedtext XML (default format is transcript XML)
    const xmlRes = await fetch(track.baseUrl, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; StampChapters/1.0)" },
    });
    if (!xmlRes.ok) {
      throw new TranscriptError("FETCH_FAILED", `Caption download returned ${xmlRes.status}`);
    }
    const xml = await xmlRes.text();
    const segments = parseTimedText(xml);
    if (segments.length === 0) {
      throw new TranscriptError("NO_CAPTIONS", "Caption track was empty or unparsable.");
    }

    return {
      videoId,
      title,
      language: track.languageCode || "unknown",
      segments,
    };
  } catch (e) {
    if (e instanceof TranscriptError) throw e;
    if ((e as Error).name === "AbortError") {
      throw new TranscriptError("FETCH_FAILED", "Timed out talking to YouTube.");
    }
    throw new TranscriptError("FETCH_FAILED", (e as Error).message || "Unknown fetch error");
  } finally {
    clearTimeout(timeout);
  }
}
