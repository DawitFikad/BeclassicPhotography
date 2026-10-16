"use client";

import { PackageDetailView } from "@/components/packages/PackageDetailView";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

export function PackageDetailDynamic({ slug }: { slug: string }) {
  const { packages, loading } = useSiteContent();
  const pkg = packages.find((item) => item.id === slug);
  if (loading && !pkg) return <div className="pt-40 text-center text-ink-300">Loading package…</div>;
  if (!pkg) return <div className="pt-40 pb-24 text-center text-ink-300">Package not found.</div>;
  const relatedPackages = (pkg.related || [])
    .map((id) => packages.find((item) => item.id === id))
    .filter((item): item is (typeof packages)[number] => Boolean(item));
  return <PackageDetailView pkg={pkg} relatedPackages={relatedPackages} />;
}
