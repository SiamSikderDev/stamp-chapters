import AdUnit from "./AdUnit";
import { ADSENSE_CLIENT, isAdsLive } from "@/lib/ads";

interface AdSlotProps {
  /** Your AdSense ad-unit ID from the AdSense dashboard, e.g. "1234567890" */
  slot?: string;
  format?: "leaderboard" | "rectangle";
  className?: string;
}

/**
 * <AdSlot> — reserved ad placement.
 *
 * Renders nothing until NEXT_PUBLIC_ADSENSE_CLIENT and a real slot ID
 * are configured, so the live site never shows empty placeholder boxes.
 * Once live, the unit is styled in the site theme with a subtle
 * "Advertisement" label — no trashy-looking boxes.
 */
export default function AdSlot({ slot = "", format = "leaderboard", className = "" }: AdSlotProps) {
  if (!isAdsLive(slot)) return null;

  const size =
    format === "leaderboard" ? "mx-auto w-full max-w-[728px]" : "mx-auto w-full max-w-[336px]";

  return (
    <div className={`px-4 ${className}`} aria-label="Advertisement">
      <div className={size}>
        <AdUnit client={ADSENSE_CLIENT} slot={slot} />
      </div>
    </div>
  );
}
