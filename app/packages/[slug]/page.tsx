import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { packages, getPackageById } from "@/lib/data";
import { PackageDetailView } from "@/components/packages/PackageDetailView";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return packages.map((pkg) => ({
    slug: pkg.id,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const pkg = getPackageById(params.slug);

  if (!pkg) {
    return {
      title: "Package Not Found | BeclassicPhotography",
      description: "The requested photography package could not be found.",
    };
  }

  return {
    title: `${pkg.name} | ${pkg.price} | BeclassicPhotography`,
    description: `${pkg.description} Includes ${pkg.whatsIncluded.slice(0, 3).join(", ")}.`,
    openGraph: {
      title: `${pkg.name} | BeclassicPhotography`,
      description: pkg.description,
      images: pkg.gallery[0] ? [{ url: pkg.gallery[0] }] : undefined,
    },
  };
}

export default function PackageDetailPage({ params }: PageProps) {
  const pkg = getPackageById(params.slug);

  if (!pkg) {
    notFound();
  }

  const relatedPackages = (pkg.related || [])
    .map((id) => packages.find((p) => p.id === id))
    .filter(Boolean) as typeof packages;

  return <PackageDetailView pkg={pkg} relatedPackages={relatedPackages} />;
}

