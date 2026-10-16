"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PackageDetailView } from "@/components/packages/PackageDetailView";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

function PackageDetailContent() {
  const params = useSearchParams();
  const id = params.get("id");
  const { packages, loading } = useSiteContent();
  const pkg = packages.find((item) => item.id === id);

  if (loading && !pkg) {
    return <div className="pt-40 text-center text-ink-300">Loading package…</div>;
  }
  if (!pkg) {
    return <div className="pt-40 pb-24 text-center text-ink-300">Package not found.</div>;
  }

  const relatedPackages = (pkg.related || [])
    .map((relatedId) => packages.find((item) => item.id === relatedId))
    .filter((item): item is (typeof packages)[number] => Boolean(item));

  return <PackageDetailView pkg={pkg} relatedPackages={relatedPackages} />;
}

export default function PackageDetailPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center text-ink-300">Loading package…</div>}>
      <PackageDetailContent />
    </Suspense>
  );
}
