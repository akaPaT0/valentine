// app/layout.tsx
import "./globals.css";

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
        url: "/valentine.ico",
        width: 512,
        height: 512,
        alt: "Valentine?",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Valentine?",
    description: "Will you be my Valentine? 💘",
    images: ["/valentine.ico"],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
