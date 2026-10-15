import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Beclassic Photography",
  description:
    "Meet the team behind Beclassic Photography. Founded in 2011, capturing authentic moments that tell your unique love story with elegant, timeless compositions.",
  keywords: [
    "about Beclassic Photography",
    "wedding photography team Addis Ababa",
    "Timeless Moments",
    "authentic wedding photography",
    "our journey",
  ],
  openGraph: {
    title: "About Us | Beclassic Photography",
    description:
      "The story, journey, and dedicated team of Beclassic Photography.",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
