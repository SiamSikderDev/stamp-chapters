import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE = "https://stampchapters.com"; // TODO: replace with the real domain

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Stamp Chapters — Free YouTube Chapter & Hook Generator",
    template: "%s · Stamp Chapters",
  },
  description:
    "Paste a YouTube link or transcript and get perfect video chapters plus a hook score — free forever, no signup. The chapter generator creators actually use.",
  keywords: [
    "youtube chapter generator",
    "add chapters to youtube video",
    "youtube timestamp generator",
    "youtube hook analyzer",
    "video chapter maker",
    "youtube description chapters",
    "free youtube tools for creators",
  ],
  authors: [{ name: "Stamp Chapters" }],
  openGraph: {
    type: "website",
    url: SITE,
    title: "Stamp Chapters — Free YouTube Chapter & Hook Generator",
    description:
      "Turn any YouTube video into perfectly-timed chapters + get a hook score. Free, no signup.",
    siteName: "Stamp Chapters",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Stamp Chapters" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stamp Chapters — Free YouTube Chapter & Hook Generator",
    description: "Chapters + hook score for any YouTube video. Free, no signup.",
    images: ["/og-image.png"],
  },
  icons: { icon: "/favicon.png", apple: "/apple-touch-icon.png" },
  manifest: "/site.webmanifest",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#EDF5B4",
};

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Stamp Chapters",
  url: SITE,
  description:
    "Free YouTube chapter generator and hook scorer. Paste a link or transcript and get perfectly-timed chapters plus an opening-hook score — no signup.",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "All",
  browserRequirements: "Requires JavaScript",
  author: { "@type": "Organization", name: "Stamp Chapters" },
  offers: { "@type": "Offer", price: "0.00", priceCurrency: "USD" },
  featureList: [
    "YouTube chapter generator from link or pasted transcript",
    "One-click copy-paste output for video descriptions",
    "Opening-hook score with curiosity, clarity, pacing and payoff metrics",
    "Editable chapters with smart title cleanup",
    "Free forever, no signup",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {ADSENSE_CLIENT.startsWith("ca-pub-") && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className={`${fraunces.variable} ${inter.variable} font-sans bg-paper text-ink antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
