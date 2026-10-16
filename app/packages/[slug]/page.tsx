import type { Metadata } from "next";
import { packages, getPackageById } from "@/lib/data";
import { PackageDetailDynamic } from "@/components/packages/PackageDetailDynamic";

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
  return <PackageDetailDynamic slug={params.slug} />;
}

