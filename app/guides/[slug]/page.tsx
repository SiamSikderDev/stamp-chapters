import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideArticle from "@/components/GuideArticle";
import { guides } from "@/lib/guides";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const guide = guides.find((g) => g.slug === params.slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.excerpt,
    alternates: { canonical: `https://stampchapters.com/guides/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: "article",
      publishedTime: "2026-09-29",
    },
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = guides.find((g) => g.slug === params.slug);
  if (!guide) notFound();
  return <GuideArticle guide={guide} />;
}
