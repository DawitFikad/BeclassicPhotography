import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio & Gallery | Beclassic Photography",
  description:
    "Explore the portfolio of Beclassic Photography. Authentic wedding moments, elegant compositions, ceremony highlights, and timeless love stories.",
  keywords: [
    "wedding photography portfolio",
    "wedding gallery Addis Ababa",
    "Beclassic Photography",
    "Ethiopian wedding photos",
    "ceremony photography",
    "landscape wedding photos",
  ],
  openGraph: {
    title: "Portfolio & Gallery | Beclassic Photography",
    description:
      "A curated collection of authentic, timeless wedding moments by Beclassic Photography.",
    type: "website",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
