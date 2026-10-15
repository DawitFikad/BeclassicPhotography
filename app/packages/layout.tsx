import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages & Pricing | Beclassic Photography",
  description:
    "Explore transparent wedding and event photography packages at Beclassic Photography. Studio & Landscape, Ceremony Photo & Video, and custom cultural celebration packages.",
  keywords: [
    "wedding photography pricing Ethiopia",
    "Beclassic Photography packages",
    "ceremony photo and video price",
    "studio landscape package birr",
    "wedding album pricing",
  ],
  openGraph: {
    title: "Packages & Pricing | Beclassic Photography",
    description:
      "Transparent pricing in birr for premium wedding and event photography services.",
    type: "website",
  },
};

export default function PackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
