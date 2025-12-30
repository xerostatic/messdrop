import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://messdrop.vercel.app";

export const metadata: Metadata = {
  title: "Drift — Anonymous Messages in the Void",
  description: "Drop an anonymous message into the digital abyss. Watch thoughts drift like bioluminescent creatures in an endless ocean. A peaceful space for sharing anonymous thoughts with strangers.",
  keywords: ["anonymous messages", "message board", "digital art", "anonymous thoughts", "message in a bottle", "zen", "peaceful", "void"],
  authors: [{ name: "Drift" }],
  creator: "Drift",
  publisher: "Drift",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Drift — Anonymous Messages in the Void",
    description: "Drop an anonymous message into the digital abyss. Watch thoughts drift like bioluminescent creatures.",
    url: siteUrl,
    siteName: "Drift",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Drift - Messages floating in a dark bioluminescent void",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Drift — Anonymous Messages in the Void",
    description: "Drop an anonymous message into the digital abyss.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Drift",
    description: "Drop an anonymous message into the digital abyss. Watch thoughts drift like bioluminescent creatures in an endless ocean.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://messdrop.vercel.app",
    applicationCategory: "SocialNetworkingApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;1,300;1,400&family=JetBrains+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-void-950 text-white antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}

