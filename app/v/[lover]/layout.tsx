// app/v/[lover]/layout.tsx
import type { Metadata } from "next";

const SITE_URL = "https://valentine-one-zeta.vercel.app";

function prettyName(slug: string) {
  const name = decodeURIComponent(slug || "").replace(/-/g, " ").trim();
  return name || "love";
}

function first(v?: string | string[]) {
  return Array.isArray(v) ? v[0] : v;
}

export function generateMetadata({
  params,
  searchParams,
}: {
  params: { lover: string };
  searchParams?: { from?: string | string[] };
}): Metadata {
  const lover = prettyName(params.lover);

  // ✅ SAFE: searchParams may be undefined in layout metadata
  const from = (first(searchParams?.from) || "").trim();

  const title = `Hey ${lover} 💘`;
  const description = `Will you be my Valentine${from ? `, from ${from}` : ""}?`;

  const pageUrl = `${SITE_URL}/v/${encodeURIComponent(params.lover)}`;
  const ogUrl = `${pageUrl}/opengraph-image`;

  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Valentine",
      type: "website",
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: `Hey ${lover}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl],
    },
  };
}

export default function LoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
