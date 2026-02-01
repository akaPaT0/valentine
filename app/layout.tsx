// app/layout.tsx
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
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
    type: "website",
    images: [
      {
        url: "/og.png",
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
