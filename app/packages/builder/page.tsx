import type { Metadata } from "next";
import { PackageBuilder } from "@/components/packages/PackageBuilder";

export const metadata: Metadata = {
  title: "Package Builder | BeclassicPhotography",
  description:
    "Build your custom wedding and event photography package. Choose quote style (Classic, Romance, Olive), view real-time visual collage, calculate total birr, download PDF quote, and submit to Beclassic Photography.",
  openGraph: {
    title: "Package Builder | BeclassicPhotography",
    description:
      "Select packages, view visual collage, download PDF quote, and send your selection directly to Beclassic Photography.",
    type: "website",
  },
};

export default function PackageBuilderPage() {
  return <PackageBuilder />;
}

