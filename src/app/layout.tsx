import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mradeola.vercel.app"),
  title: "In Loving Memory of Adekunle Stephen Adeola (Baba White) — 1970–2026",
  description:
    "Celebrating a life of grace — August 24, 1970 – September 9, 2026. A tribute to the cherished memories and enduring legacy of Baba White.",
  keywords: [
    "Adekunle Stephen Adeola",
    "Baba White",
    "memorial",
    "tribute",
    "funeral",
    "Abeokuta",
  ],
  icons: {
    icon: "/images/baba-white-regal-navy.jpg",
    apple: "/images/baba-white-regal-navy.jpg",
  },
  openGraph: {
    title: "In Loving Memory of Adekunle Stephen Adeola (Baba White)",
    description:
      "Celebrating a life of grace — August 24, 1970 – September 9, 2026",
    url: "https://mradeola.vercel.app",
    siteName: "Baba White Memorial",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://mradeola.vercel.app/images/baba-white-regal-navy.jpg",
        secureUrl: "https://mradeola.vercel.app/images/baba-white-regal-navy.jpg",
        width: 800,
        height: 1000,
        type: "image/jpeg",
        alt: "Adekunle Stephen Adeola (Baba White)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "In Loving Memory of Adekunle Stephen Adeola (Baba White)",
    description:
      "Celebrating a life of grace — August 24, 1970 – September 9, 2026",
    images: ["https://mradeola.vercel.app/images/baba-white-regal-navy.jpg"],
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
        {/* Favicons */}
        <link rel="icon" href="/images/baba-white-regal-navy.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/baba-white-regal-navy.jpg" />

        {/* WhatsApp & Social Media Preview Meta Tags */}
        <meta property="og:title" content="In Loving Memory of Adekunle Stephen Adeola (Baba White)" />
        <meta property="og:description" content="Celebrating a life of grace — August 24, 1970 – September 9, 2026" />
        <meta property="og:image" content="https://mradeola.vercel.app/images/baba-white-regal-navy.jpg" />
        <meta property="og:image:secure_url" content="https://mradeola.vercel.app/images/baba-white-regal-navy.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="1000" />
        <meta property="og:url" content="https://mradeola.vercel.app" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://mradeola.vercel.app/images/baba-white-regal-navy.jpg" />
        <link rel="image_src" href="https://mradeola.vercel.app/images/baba-white-regal-navy.jpg" />

        {/* Google Fonts */}
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
