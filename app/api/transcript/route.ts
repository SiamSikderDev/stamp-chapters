import { NextRequest, NextResponse } from "next/server";
import { extractVideoId, fetchTranscript, TranscriptError } from "@/lib/youtube";

/**
 * GET /api/transcript?input=<youtube url or id>
 * Returns { videoId, title, language, segments: [{start, dur, text}] }.
 */
export async function GET(req: NextRequest) {
  const input =
    req.nextUrl.searchParams.get("input") ||
    req.nextUrl.searchParams.get("url") ||
    "";

  const videoId = extractVideoId(input);
  if (!videoId) {
    return NextResponse.json(
      {
        error: "Couldn't find a YouTube video ID in that input.",
        hint: "Paste a full youtube.com or youtu.be link (or the 11-character video ID).",
      },
      { status: 400 }
    );
  }

  try {
    const data = await fetchTranscript(videoId);
    return NextResponse.json(data);
  } catch (e) {
    if (e instanceof TranscriptError) {
      if (e.code === "NO_CAPTIONS") {
        return NextResponse.json(
          {
            error: "This video has no captions to work with.",
            hint: "Use the “Paste transcript” tab and drop your script in manually.",
          },
          { status: 404 }
        );
      }
      return NextResponse.json(
        {
          error: "Couldn't fetch captions for this video.",
          hint: "It may be private, age-restricted, or YouTube blocked the request — try pasting the transcript manually.",
        },
        { status: 502 }
      );
    }
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
