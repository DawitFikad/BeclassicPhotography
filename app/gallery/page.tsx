"use client";

import { Gallery } from "@/components/gallery/Gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function GalleryPage() {
  const { t } = useLanguage();
  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      <SectionHeading
        eyebrow={t.gallery.eyebrow}
        title={
          <>
            {t.gallery.title1} <span className="gold-gradient">{t.gallery.title2}</span>
          </>
        }
        subtitle={t.gallery.subtitle}
      />
      <Gallery />
    </div>
  );
}
