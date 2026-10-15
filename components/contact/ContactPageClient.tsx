"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ContactContent } from "@/components/contact/ContactContent";

function ContactContentWithParams() {
  const searchParams = useSearchParams();
  const pkg = searchParams.get("package");
  const prefilledService = pkg ? decodeURIComponent(pkg) : "";

  return <ContactContent prefilledService={prefilledService} />;
}

export function ContactPageClient() {
  return (
    <Suspense fallback={<ContactContent />}>
      <ContactContentWithParams />
    </Suspense>
  );
}

