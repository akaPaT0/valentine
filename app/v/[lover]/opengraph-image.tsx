// app/v/[lover]/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function prettyName(slug: string) {
  const name = decodeURIComponent(slug || "").replace(/-/g, " ").trim();
  return name || "love";
}

export default function OgImage({ params }: { params: { lover: string } }) {
  const lover = prettyName(params.lover);

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "linear-gradient(135deg, #000 0%, #12040a 60%, #000 100%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex" }}>
          <span style={{ fontSize: 28, opacity: 0.85 }}>Valentine 💘</span>
        </div>

        <div style={{ display: "flex", marginTop: 18 }}>
          <span style={{ fontSize: 86, fontWeight: 800 }}>Hey {lover}</span>
        </div>

        <div style={{ display: "flex", marginTop: 16 }}>
          <span style={{ fontSize: 44, opacity: 0.9 }}>
            Will you be my Valentine?
          </span>
        </div>
      </div>
    ),
    size
  );
}
