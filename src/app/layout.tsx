import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "In Loving Memory of Adekunle Stephen Adeola (Baba White) — 1970–2026",
  description:
    "A tribute to the life and legacy of Adekunle Stephen Adeola, fondly known as Baba White. August 24, 1970 – September 9, 2026. Celebrating a life of grace.",
  keywords: [
    "Adekunle Stephen Adeola",
    "Baba White",
    "memorial",
    "tribute",
    "funeral",
    "Abeokuta",
  ],
  openGraph: {
    title: "In Loving Memory of Adekunle Stephen Adeola (Baba White)",
    description:
      "Celebrating a life of grace — August 24, 1970 – September 9, 2026",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
