"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function FeaturedWork() {
  const { t } = useLanguage();
  const { galleryItems } = useSiteContent();
  const featured = galleryItems.slice(0, 6);

  return (
    <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow={t.featured.eyebrow}
        title={
          <>
            {t.featured.title1} <span className="gold-gradient">{t.featured.title2}</span>
          </>
        }
        subtitle={t.featured.subtitle}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {featured.map((item, i) => {
          // Slide in left, right, or immerge based on position
          const isLeft = i === 0 || i === 3;
          const isRight = i === 1 || i === 5;

          const initialAnim = isLeft
            ? { opacity: 0, x: -50, scale: 0.95 }
            : isRight
            ? { opacity: 0, x: 50, scale: 0.95 }
            : { opacity: 0, y: 40, scale: 0.9 };

          return (
            <motion.div
              key={item.id}
              initial={initialAnim}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: (i % 3) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative z-10 overflow-hidden rounded-2xl cursor-pointer bg-surface border border-border shadow-md ${
                i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  i === 0 ? "aspect-[16/11] lg:aspect-[16/13]" : "aspect-[4/5]"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block text-gold-400 text-xs font-semibold tracking-widest uppercase mb-1">
                    {item.category}
                  </span>
                  <p className="text-white font-medium text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.alt}
                  </p>
                </div>

                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mt-12"
      >
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-gold-400 font-semibold hover:text-gold-300 transition-colors group px-6 py-3 rounded-full border border-gold-400/30 hover:border-gold-400/80 bg-gold-400/5 backdrop-blur-sm"
        >
          {t.featured.viewFull}
          <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </motion.div>
    </section>
  );
}
