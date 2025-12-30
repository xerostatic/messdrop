import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Drift — Messages in the Void",
  description: "Drop a message into the digital abyss. Watch thoughts drift like bioluminescent creatures in an endless ocean.",
  openGraph: {
    title: "Drift — Messages in the Void",
    description: "Drop a message into the digital abyss.",
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;1,300;1,400&family=JetBrains+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-void-950 text-white antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}

