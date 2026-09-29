export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  content: string;
}

export const guides: Guide[] = [
  {
    slug: "how-to-add-chapters-to-youtube-videos",
    title: "How to Add Chapters to YouTube Videos (The Complete Guide)",
    excerpt:
      "Chapters make your videos easier to watch and more likely to be clicked. Here's exactly how to add them — manually or automatically — in under 5 minutes.",
    date: "September 29, 2026",
    readTime: 7,
    content: `
YouTube chapters are the clickable timestamps you see under videos — the little segments on the progress bar that let viewers jump straight to the part they care about. They take minutes to add, and they quietly improve almost every metric that matters: watch time, click-through rate, and even Google search visibility.

This guide covers everything: the rules YouTube enforces, how to add chapters manually, and how to generate them automatically.

## Why chapters are worth the effort

Most viewers don't watch videos start to finish. They skim, they skip, they hunt for the one answer they came for. Chapters turn that behavior from a problem into a feature:

- **Higher retention.** A viewer who can jump to the relevant section stays instead of bouncing to a competitor's video.
- **Better click-through.** YouTube sometimes shows "key moments" from your chapters directly in search results, which makes your listing bigger and more clickable.
- **More professional feel.** Chapters signal that a video is structured and respects the viewer's time — especially important for tutorials, reviews, and long-form content.
- **Google Search visibility.** Google can feature your video's key moments in web search results, pulling in viewers who never opened YouTube at all.

## YouTube's chapter rules (they're strict about these)

Before you write a single timestamp, know the requirements. If you break them, YouTube silently ignores your chapters:

1. **The first timestamp must be 00:00.** Always. Even if your intro is 20 seconds of branding, chapter one starts at zero.
2. **You need at least 3 timestamps.** Two chapters isn't enough — YouTube wants a minimum of three segments.
3. **Each chapter must be at least 10 seconds long.** Timestamps closer together than that get rejected.
4. **Timestamps go in the video description**, starting on their own lines, in chronological order.
5. **Format is MM:SS or HH:MM:SS** followed by a space and the chapter title. For videos over an hour, use hours: 1:02:30, not 62:30.

Get any of these wrong and your chapters simply won't appear — no error message, no warning. Double-check the list before you publish.

## How to add chapters manually

1. Open **YouTube Studio** and select your video.
2. Under **Details**, find the **Description** box.
3. At the top of the description (this matters — put them first, before any links or promo text), type your chapters, one per line:

\`\`\`
00:00 Intro
02:14 What chapters actually do
05:40 The 10-second rule explained
09:03 Adding chapters in YouTube Studio
12:47 Common mistakes
\`\`\`

4. Click **Save**. That's it — chapters appear on the video within a few minutes.

**Pro tip:** keep chapter titles short and descriptive (under 40 characters). They're mini-headlines: "The 10-second rule" beats "Some important information about rules."

## How to generate chapters automatically

Writing timestamps by hand for a 20-minute video is tedious — scrubbing back and forth, noting where each topic starts. The faster way:

1. **Get your transcript.** On desktop, open the video, click the **...** menu below it, then **Open transcript**. Copy the text. (Our full walkthrough: [How to Get a YouTube Transcript](/guides/how-to-get-youtube-transcript).)
2. **Paste it into a chapter generator** like the free tool on this site. It detects topic shifts and assigns timestamps for you.
3. **Review and tweak.** Automatic chapters are a draft, not a final. Rename anything vague, merge tiny segments, and make sure the first timestamp is 00:00.
4. **Paste into your description** and save.

The review step matters. A generator can find *where* topics change, but only you know what to *call* each section so viewers want to click it.

## Where exactly to put them in the description

Put chapters at the very top of the description, above everything else. Two reasons: viewers see them without clicking "show more," and YouTube's systems parse the first lines most reliably. Your affiliate links, socials, and hashtags go below.

## Chapters vs. key moments: what's the difference?

**Chapters** are the segments on your video's own progress bar — for viewers already watching. **Key moments** are what Google and YouTube search show to people who haven't clicked yet: your chapter titles appearing as expandable links under your video in results. Same timestamps power both. Good chapter titles therefore do double duty: they guide watchers *and* attract searchers.

## Quick checklist before you publish

- First timestamp is 00:00
- At least 3 chapters, each 10+ seconds
- Timestamps in chronological order, one per line
- Chapters at the top of the description
- Titles are short, specific, and honest about what's in each section

Follow that list and your chapters will work every time. For the finer points — title wording, chapter length strategy, and what to do with intros and sponsors — read [YouTube Chapters Best Practices](/guides/youtube-chapters-best-practices).
`.trim(),
  },
  {
    slug: "youtube-chapters-best-practices",
    title: "YouTube Chapters Best Practices: Titles, Length & Strategy",
    excerpt:
      "Adding chapters is easy — adding good chapters is a skill. Title formulas, ideal lengths, and the mistakes that make viewers skip.",
    date: "September 29, 2026",
    readTime: 6,
    content: `
Anyone can paste timestamps into a description. But there's a real difference between chapters that exist and chapters that *work* — ones that keep viewers watching instead of giving them excuses to leave. Here's how to write chapters strategically.

## Write titles like headlines, not labels

Your chapter titles appear in three high-stakes places: the video progress bar, YouTube search key moments, and Google web results. In all three, they're competing for a click. So write them like headlines:

- **Be specific.** "Fixing the audio sync bug" beats "Technical stuff." Specificity tells the viewer exactly what they'll get.
- **Promise a payoff.** "The setting that doubled my CTR" is irresistible; "Settings overview" is not.
- **Keep them under 40 characters.** Long titles get truncated on mobile, which is where most of your viewers are.
- **Use the viewer's language.** If your audience says "thumbnail," don't write "creative asset."

A good test: read only your chapter list. Does it read like a compelling outline of the video? If yes, you've nailed it.

## How long should each chapter be?

There's no single right answer, but these ranges work well:

- **Tutorials and how-tos:** 1–3 minutes per chapter. Each chapter = one step or concept. Viewers rewatch individual steps, so make them easy to find.
- **Reviews and comparisons:** 2–4 minutes. One chapter per product or per comparison criterion.
- **Vlogs and entertainment:** 3–6 minutes. Shorter chapters here can feel choppy; you're marking beats, not steps.
- **Podcasts and interviews:** 4–10 minutes. One chapter per question or topic shift.

Remember the hard floor: **10 seconds minimum**, or YouTube ignores the chapter entirely. And avoid the opposite extreme — a single 15-minute "main content" chapter is barely better than no chapters at all.

## How many chapters is too many?

For most videos, **5–12 chapters** is the sweet spot. Fewer than 3 and YouTube won't show them at all. More than ~15 and the progress bar becomes visual noise — viewers stop reading and the chapters lose their guiding power.

If your video genuinely has 25 distinct sections, consider whether some should be merged. Chapters are a map, not a transcript.

## What to do with intros, sponsorships, and outros

- **Intro (00:00):** Always label it. "Intro" is fine; "Why I made this video" is better. Never skip the 00:00 chapter — it's required.
- **Sponsor segments:** Label them honestly ("Sponsor: today's video partner"). Paradoxically, labeled sponsor chapters *increase* trust — viewers appreciate not being tricked, and many will sit through a 60-second read from a creator they trust.
- **Outro/CTA:** Give it a chapter ("What to watch next"). It converts end-of-video drift into another click.

## Match chapters to search intent

Think about what someone would Google to find each section. If a chapter answers "how to fix audio sync in Premiere," title it close to that phrasing. This is how chapters become **key moments** in Google search — each chapter is a tiny SEO asset pulling in viewers from web search, not just YouTube.

## The review pass (do this every time)

Before publishing, read your chapter list top to bottom and ask:

1. Does the first timestamp say 00:00?
2. Is every chapter at least 10 seconds?
3. Are titles specific and click-worthy?
4. Would a stranger understand the video's structure from this list alone?
5. Is there any chapter I'd skip as a viewer? If so, that's a signal about the *video*, not just the chapters.

Chapters are one of the highest-ROI minutes you'll spend on a video. Five minutes of thoughtful timestamps can lift retention, search visibility, and perceived quality all at once — which is exactly why we built a [free tool](/) that drafts them for you in seconds.
`.trim(),
  },
  {
    slug: "how-to-write-youtube-hook",
    title: "How to Write a YouTube Hook That Keeps Viewers Watching",
    excerpt:
      "You have about 30 seconds before a viewer decides to stay or leave. Here's the anatomy of a strong opening hook — with formulas you can steal.",
    date: "September 29, 2026",
    readTime: 7,
    content: `
YouTube shows you exactly where viewers leave: the audience retention graph. And for most videos, the steepest cliff is the first 30 seconds. That's your hook — the opening stretch where a viewer decides, consciously or not, whether this video is worth their time.

The good news: hooks are a learnable skill, not a talent. Here's the anatomy.

## What a hook actually has to do

A hook has exactly one job: **earn the next 30 seconds**. Not the whole video — just the next chunk. It does that with four ingredients:

1. **Curiosity** — an open loop the viewer wants closed. A question, a surprising claim, a mystery.
2. **Clarity** — the viewer must instantly understand what this video is about and who it's for. Confusion kills faster than boredom.
3. **Pacing** — energy and momentum. No rambling, no throat-clearing, no "hey guys welcome back to my channel."
4. **Payoff promise** — a reason to believe staying will be worth it. What's in it for them?

Score your own openings against those four. Most weak hooks fail on clarity (the viewer doesn't know what they're watching) or pacing (30 seconds of preamble before anything happens).

## The 5-second rule

State the video's payoff **within the first 5 seconds**. Not your name, not your channel trailer — the payoff. Compare:

- Weak: "Hey guys, welcome back to the channel, today I wanted to talk a little bit about something I've been meaning to cover…"
- Strong: "I'm going to show you the exact chapter strategy that took my average view duration from 3 minutes to 9."

The strong version delivers clarity (chapter strategy), curiosity (how did it triple?), and payoff promise (I can do this too) in one breath.

## Hook formulas that work

Steal these structures and fill in your own topic:

**The bold claim:** "Everything you know about [topic] is wrong — here's what actually works." Curiosity does the heavy lifting.

**The before/after:** "My videos averaged 2-minute retention. Then I changed my openings, and now they average 7." The gap between before and after is the open loop.

**The direct question:** "Why do 90% of viewers leave in the first 30 seconds?" Questions demand answers — viewers stick around for them.

**The cold open:** Start mid-action, then rewind. Show the result first ("Here's the finished edit"), then "here's how I got there." Works brilliantly for tutorials and transformations.

**The myth-bust:** "You've been told to [common advice]. It's costing you views." Challenging received wisdom creates instant engagement — just make sure you can back it up.

## What to cut from every opening

- **Channel intros and logos.** Nobody subscribed to watch your animation. Get to value in under 5 seconds; branding can come later.
- **"In this video…" throat-clearing.** "In this video I'm going to show you…" — just show them.
- **Apologies and meta-commentary.** "Sorry the audio is a bit off today" tells viewers to expect low quality. Fix it or don't mention it.
- **Asking for likes/subs in the first 30 seconds.** You haven't earned it yet. Put the CTA after you've delivered value.

## Match the hook to the title and thumbnail

Your title and thumbnail made a promise. Your hook's job is to **confirm that promise immediately** — then raise the stakes. If your title says "I tried X for 30 days," your first line should be about day 1 or day 30, not your morning routine. Mismatch between packaging and opening is one of the most common causes of instant click-off.

## Test your hook before you publish

Read your first 30 seconds out loud and ask:

1. Would a stranger know what this video is about by second 5?
2. Is there an unanswered question pulling them forward?
3. Did I say anything that could be cut without losing meaning? (Cut it.)
4. Does the energy match the topic? (A calm tutorial doesn't need hype; a challenge video does.)

Better yet, score it: our [free hook scorer](/#tool) rates your opening on curiosity, clarity, pacing, and payoff promise, and tells you exactly what to fix. Use it on every script before you hit record — it's the cheapest retention boost in existence.
`.trim(),
  },
  {
    slug: "how-to-get-youtube-transcript",
    title: "How to Get a YouTube Transcript (Desktop & Mobile)",
    excerpt:
      "Every YouTube video with captions has a transcript you can copy in seconds. Here's where the button hides on desktop and mobile.",
    date: "September 29, 2026",
    readTime: 5,
    content: `
YouTube auto-generates transcripts for most videos — a full text version with timestamps, sitting one click away. It's incredibly useful: repurposing content, quoting accurately, and (our favorite) generating chapters without rewatching the whole video.

Here's exactly where to find it.

## On desktop (easiest)

1. Open the YouTube video in your browser.
2. Below the video player, click the **...** (three dots) menu next to Share and Download.
3. Click **Show transcript** (sometimes labeled "Open transcript").
4. A transcript panel opens on the right side, with timestamps and text.
5. **To copy it:** click the timestamps toggle (the clock icon) to hide timestamps if you want clean text, then select and copy.

That's it — about 20 seconds, start to finish.

## On mobile (Android & iPhone)

1. Open the video in the YouTube app.
2. Tap the video title area to expand the description.
3. Scroll down and tap **Show transcript**.
4. The full transcript appears with timestamps.

Note: on some videos the transcript option only appears if the creator enabled captions or YouTube auto-generated them. The vast majority of videos qualify.

## What if there's no transcript button?

A few reasons it might be missing:

- **Captions are disabled** for that video. Some creators turn them off, though this is rare.
- **It's a very new upload.** Auto-captions can take a few hours to generate after publishing.
- **YouTube Music or age-restricted content** sometimes hides the transcript option.

If the button is missing, try again in a few hours — or ask the creator to enable captions.

## Transcript vs. captions vs. subtitles: quick glossary

- **Captions/subtitles:** the text overlay on the video itself, synced to the audio. (Same thing, mostly — "captions" usually includes sound descriptions.)
- **Transcript:** the full text of those captions in a readable panel, with timestamps, that you can scroll and copy.

The transcript is just the captions laid out as a document. Same words, friendlier format.

## What to do with a transcript once you have it

This is where it gets useful for creators:

- **Generate chapters.** Paste the transcript into a [chapter generator](/) and get timestamped sections in seconds — no scrubbing through the timeline.
- **Write descriptions and show notes.** The transcript is a first draft of both.
- **Repurpose content.** Turn a video into a blog post, newsletter, or thread by editing the transcript down.
- **Find quotable moments.** Search the text (Ctrl+F) for the line you half-remember instead of rewatching.
- **Accessibility review.** Reading your own transcript reveals filler words, unclear explanations, and pacing problems you'd never catch by watching.

## Transcript languages and translation

Many videos have transcripts in multiple languages — either uploaded by the creator or auto-translated by YouTube. In the transcript panel, look for a language dropdown at the top. Auto-translated transcripts are handy for understanding foreign-language videos, but treat them as rough: idioms and technical terms often translate badly. If you're quoting a translated transcript, verify against the audio.

## Downloading transcripts for your own videos in bulk

If you're a creator and want transcripts for your whole back catalog (for repurposing or accessibility), YouTube Studio is faster than copying them one by one:

1. Go to **YouTube Studio → Subtitles** in the left menu.
2. Click the three-dot menu next to any video and choose **Download**.
3. Pick your format (.srt with timestamps, or plain text).

Do this for your top 10 videos and you have a content goldmine: blog posts, newsletters, and quote graphics, all from words you already spoke.

## A note on accuracy

Auto-generated transcripts are good but not perfect — expect 85–95% accuracy depending on audio quality, accents, and jargon. Always skim for errors before publishing anything based on a transcript, especially names, numbers, and technical terms.

Now that you know where transcripts live, put them to work: copy your latest video's transcript and [turn it into chapters](/guides/how-to-add-chapters-to-youtube-videos) in under a minute.
`.trim(),
  },
  {
    slug: "do-youtube-chapters-help-seo",
    title: "Do YouTube Chapters Help SEO? What the Data Actually Says",
    excerpt:
      "Chapters power key moments in Google and YouTube search. Here's how they affect discovery — and how to squeeze the most search value from them.",
    date: "September 29, 2026",
    readTime: 6,
    content: `
"Do chapters help SEO?" is one of the most-asked questions in creator communities — and the answer is a qualified yes. Chapters don't directly boost your ranking the way watch time does, but they unlock discovery surfaces that chapters-less videos simply can't access. Let's break down what's real and what's myth.

## What chapters actually do for discovery

**Key moments in search.** This is the big one. When your video has chapters, Google and YouTube can display them as expandable "key moments" under your video in search results — your listing gets taller, more informative, and more clickable than a plain result. More clicks from the same ranking position is effectively free traffic.

**Google web search.** Google indexes video key moments for regular web searches too, not just video search. A well-titled chapter can rank for a query your video title never targeted — each chapter is a small, specific search asset.

**Suggested clips.** YouTube sometimes surfaces specific chapters as "suggested clips" to viewers, pulling people into the middle of your video from browse surfaces.

What chapters do *not* do: there is no evidence of a direct ranking boost just for having chapters. YouTube has never said "videos with chapters rank higher." The SEO value is indirect — more surfaces, more clicks, better user signals — which is still very real traffic.

## How to maximize the search value of chapters

**Title chapters like search queries.** Ask: what would someone type into Google to find this section? "How to fix audio sync in Premiere Pro" will pull search traffic; "Fixing stuff" will not. This is the single highest-leverage thing you can do.

**Front-load keywords naturally.** "Premiere Pro audio sync fix (2 methods)" reads fine to humans and matches query language. Don't keyword-stuff — "audio sync fix premiere pro tutorial 2026" looks spammy and gets truncated.

**Cover distinct subtopics.** Each chapter is a chance to capture a different long-tail query. A 15-minute tutorial with 8 specific chapters has 8 shots at search traffic; the same video with 3 vague chapters has far fewer.

**Keep titles honest.** Clickbait chapter titles backfire: a searcher who clicks "the secret setting" and finds nothing secret bounces, and that negative signal hurts more than the click helped.

## Chapters vs. video SEO fundamentals

Keep perspective: chapters are a multiplier, not a foundation. They amplify a video that's already solid. The fundamentals still dominate:

1. **Topic selection** — make videos people actually search for.
2. **Packaging** — title and thumbnail earn the click.
3. **Retention** — watch time remains the core ranking signal.
4. **Then** chapters, descriptions, tags, and other optimizations.

A video nobody clicks doesn't benefit from key moments. But a video that *does* get clicked benefits enormously from them — which is why chapters belong in every upload checklist.

## Measuring whether chapters are working

In YouTube Studio, check:

- **Traffic source: Google search / YouTube search** — rising search traffic after adding chapters is a good sign.
- **Key moments clicks** — visible in analytics for eligible videos, showing which chapters pull viewers in.
- **Audience retention by chapter** — the engagement graph overlaid with your chapters shows which sections hold attention and which bleed viewers. Use it to improve the *video*, not just the timestamps.

## The bottom line

Chapters won't save a video nobody wants to watch. But for content worth making, they're one of the cheapest SEO wins available: five minutes of timestamps buys you key moments in two search engines, better click-through, and richer analytics. There is no good reason to skip them — and with a [free generator](/) the "it takes too long" excuse is gone too.
`.trim(),
  },
  {
    slug: "youtube-chapter-mistakes",
    title: "7 YouTube Chapter Mistakes That Hurt Watch Time",
    excerpt:
      "Chapters can backfire when done badly — vague titles, skipped 00:00s, and 40-chapter monstrosities. Here are the mistakes to avoid.",
    date: "September 29, 2026",
    readTime: 6,
    content: `
Chapters are supposed to help viewers navigate your video. Done badly, they do the opposite: they confuse, they spoil, and they hand viewers a menu of reasons to leave. Here are the seven mistakes I see most often — and how to fix each one.

## 1. Skipping the 00:00 timestamp

The most common technical mistake, full stop. YouTube **requires** the first chapter to start at 00:00 — without it, none of your chapters appear. No error, no warning; they just silently don't render. Every chapter list starts with 00:00, even if your first 15 seconds are a branded intro. Label it "Intro" and move on.

## 2. Vague, lazy titles

- "Part 1", "Part 2", "Part 3" — tells the viewer nothing.
- "Some thoughts" — about what?
- "Interesting stuff" — the fastest way to guarantee nobody clicks it.

Every chapter title should answer: *what will I get from this section?* "Part 1" becomes "Setting up your project"; "Some thoughts" becomes "Why I switched to this method." Specificity is what turns a chapter list into a reason to stay.

## 3. Spoiling the payoff in the title

There's a fine line between specific and spoiler. If your video builds to a reveal — a transformation, a test result, a final verdict — don't put the answer in the chapter title. "The winner: Product X" at chapter 4 of 6 gives viewers permission to skip chapters 5 and 6. Tease instead: "The final verdict." Curiosity retains; spoilers release.

## 4. Chapters shorter than 10 seconds

YouTube ignores any chapter under 10 seconds long — and worse, a too-short chapter can break the rendering of the chapters around it. If two topics are only seconds apart, merge them into one chapter. When in doubt, fewer, meatier chapters beat many tiny ones.

## 5. The 40-chapter monstrosity

Yes, I've seen it: a 12-minute video with 40 chapters. The progress bar becomes an unreadable barcode, and the chapter list reads like a court transcript. Chapters are a map, not a transcript. Aim for **5–12 chapters** for most videos. If you have more genuine sections than that, merge the minor ones — your viewers will thank you.

## 6. Burying chapters at the bottom of the description

Chapters work best at the **top** of the description, above links, sponsors, and hashtags. Viewers rarely expand descriptions fully, and YouTube parses the first lines most reliably. Your affiliate links can wait — chapters go first.

## 7. "Set and forget" — never reviewing analytics

Your chapters generate data: which sections retain viewers, which ones bleed them, which key moments get clicked in search. That data is a free content audit. If chapter 6 loses 40% of viewers every time, the problem might be the chapter — or the section itself. Creators who read their chapter-level retention improve faster than those who don't.

## Why these mistakes compound

Here's what makes chapter mistakes sneaky: they rarely hurt in isolation. A missing 00:00 just means no chapters render — annoying, but obvious. The real damage comes from combinations. Vague titles *plus* buried placement means nobody ever sees your chapter list. Spoiler titles *plus* 40 chapters means viewers cherry-pick the payoff and leave. Each mistake hands the viewer one more small reason to click away, and small reasons add up to a retention graph that slopes down all the way.

The fix is cheap, though. Chapters are the rare optimization that's both high-impact and five minutes of work. Run the audit below on your last three uploads — most creators find at least two of these seven mistakes waiting there.

## The 60-second pre-publish audit

Before you hit publish on any video, run this checklist:

1. First timestamp is 00:00.
2. At least 3 chapters, each 10+ seconds.
3. Every title is specific — no "Part 1"s.
4. No spoilers in titles for payoff moments.
5. Chapters sit at the top of the description.
6. Total count is sane (5–12 for most videos).

Pass all six and your chapters are doing their job: guiding viewers deeper into your video instead of handing them exits. Want to skip the manual work? [Generate your chapters free](/) and spend the saved time on the titles — that's the part only you can do well.
`.trim(),
  },
];
