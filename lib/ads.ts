/**
 * Ad configuration — everything reads from environment variables.
 *
 * Set these in Vercel (Project → Settings → Environment Variables),
 * then redeploy:
 *   NEXT_PUBLIC_ADSENSE_CLIENT = ca-pub-XXXXXXXXXXXXXXXX
 *
 * Until the client ID is set, <AdSlot> renders nothing — the live
 * site stays clean with zero placeholder boxes.
 */
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";

export const isAdsLive = (slot: string | undefined) =>
  ADSENSE_CLIENT.startsWith("ca-pub-") && !!slot && slot !== "0000000000";
