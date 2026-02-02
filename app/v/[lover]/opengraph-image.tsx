// app/v/[lover]/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function prettyName(slug: string) {
  const name = decodeURIComponent(slug || "").replace(/-/g, " ").trim();
  return name || "love";
}

export default function OgImage({
  params,
}: {
  params: { lover: string };
}) {
  const lover = prettyName(params.lover);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "linear-gradient(135deg, #000 0%, #12040a 60%, #000 100%)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.85 }}>Valentine 💘</div>
        <div style={{ fontSize: 86, fontWeight: 800, marginTop: 18 }}>
          Hey {lover}
        </div>
        <div style={{ fontSize: 44, marginTop: 16, opacity: 0.9 }}>
          Will you be my Valentine?
        </div>
      </div>
    ),
    size
  );
}
