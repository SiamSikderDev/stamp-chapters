/**
 * Creator Toolkit — affiliate recommendations.
 *
 * HOW TO GO LIVE (2 minutes):
 *   1. Join each affiliate program (signup links in the comments below).
 *   2. Paste your personal affiliate link into the `href` field.
 *   3. Redeploy.
 *
 * Cards with an empty `href` are hidden automatically, so the section
 * only appears once you've added at least one link.
 */

export interface AffiliateTool {
  name: string;
  tagline: string;
  badge: string;
  cta: string;
  href: string;
}

export const AFFILIATE_TOOLS: AffiliateTool[] = [
  {
    name: "TubeBuddy",
    tagline:
      "Keyword research, A/B thumbnail tests and bulk processing — the toolkit serious YouTubers grow with.",
    badge: "Grow faster",
    cta: "Try TubeBuddy",
    href: "",
    // Join: https://www.tubebuddy.com/affiliate
  },
  {
    name: "vidIQ",
    tagline:
      "Daily video ideas, trending keywords and a real-time stats bar that shows what your niche wants next.",
    badge: "Never run dry",
    cta: "Try vidIQ",
    href: "",
    // Join: https://vidiq.com/affiliates
  },
  {
    name: "Epidemic Sound",
    tagline:
      "Copyright-safe music and SFX for creators. No claims, no strikes — just publish and monetize.",
    badge: "Stay claim-free",
    cta: "Try Epidemic Sound",
    href: "",
    // Join: https://www.epidemicsound.com/affiliates
  },
];

export const hasAffiliates = AFFILIATE_TOOLS.some((t) => t.href.trim().length > 0);
