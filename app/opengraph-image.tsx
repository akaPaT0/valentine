// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
        <div style={{ fontSize: 28, opacity: 0.85 }}>Valentine 💌</div>
        <div style={{ fontSize: 80, fontWeight: 700, marginTop: 18 }}>
          Will you be my
          <br />
          Valentine?
        </div>
        <div style={{ fontSize: 30, marginTop: 24, opacity: 0.75 }}>
          One question. One button.
        </div>
      </div>
    ),
    size
  );
}
