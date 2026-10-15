import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CtaBanner } from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "Classic Photography Capturing Elegant Love Stories",
  description:
    "Beclassic Photography captures your special moments with elegant sophistication. We believe in creating timeless memories that will be cherished for generations to come.",
  keywords: [
    "Beclassic Photography",
    "BeclassicPhotography",
    "wedding photography",
    "wedding videography",
    "commercial photography",
    "portrait photography",
    "music videos",
    "Addis Ababa photographer",
    "Ethiopian wedding photography",
  ],
  openGraph: {
    title: "Classic Photography Capturing Elegant Love Stories",
    description:
      "Capturing moments, creating masterpieces. Beclassic Photography captures your special moments with elegant sophistication.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturedWork />
      <WhyChooseUs />
      <CtaBanner />
    </>
  );
}
