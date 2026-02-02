// app/v/[lover]/layout.tsx
import type { Metadata } from "next";

const SITE_URL = "https://valentine-one-zeta.vercel.app";

function prettyName(slug: string) {
  const name = decodeURIComponent(slug || "")
    .replace(/-/g, " ")
    .trim();
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
  searchParams: { from?: string | string[] };
}): Metadata {
  const lover = prettyName(params.lover);
  const from = (first(searchParams.from) || "").trim();

  const title = `Hey ${lover} 💘`;
  const description = `Will you be my Valentine${from ? `, from ${from}` : ""}?`;

  // ✅ absolute URLs for scrapers (mobile WhatsApp likes this more)
  const canonical = `${SITE_URL}/v/${encodeURIComponent(params.lover)}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Valentine",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/og.png`,
          width: 1200,
          height: 630,
          alt: "Valentine?",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og.png`],
    },
  };
}

export default function LoverLayout({ children }: { children: React.ReactNode }) {
  return children;
}
