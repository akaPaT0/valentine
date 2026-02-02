// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import BgMusic from "./components/bg-music";

export const metadata: Metadata = {
  metadataBase: new URL("https://valentine-one-zeta.vercel.app"),
  title: "Valentine?",
  description: "Will you be my Valentine? 💘",
  icons: {
    icon: "/valentine.ico",
    shortcut: "/valentine.ico",
    apple: "/valentine.ico",
  },
  openGraph: {
    title: "Valentine?",
    description: "Will you be my Valentine? 💘",
    url: "https://valentine-one-zeta.vercel.app",
    siteName: "Valentine",
    type: "website",
    images: [
      {
        url: "/og.png", // will become absolute because of metadataBase
        width: 1200,
        height: 630,
        alt: "Valentine?",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Valentine?",
    description: "Will you be my Valentine? 💘",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <BgMusic />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
