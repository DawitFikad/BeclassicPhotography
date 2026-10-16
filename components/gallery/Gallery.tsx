"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Eye, Grid3X3 } from "lucide-react";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import AccordionGallery from "@/components/ui/AccordionGallery";

type Filter = string;

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { galleryItems, galleryCategories } = useSiteContent();
  const categories = ["All", ...galleryCategories.map((category) => category.name)];

  const filtered = useMemo(
    () =>
      filter === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === filter),
    [filter, galleryItems]
  );

  // Map to AccordionGallery items format (curated top frames for active filter)
  const accordionItems = useMemo(
    () =>
      filtered.slice(0, 6).map((item) => ({
        image: item.src,
        label: item.title || item.alt,
        alt: item.alt,
      })),
    [filtered]
  );

  const categoryLabels: Record<string, string> = {
    All: t.gallery.categories.all,
    Wedding: t.gallery.categories.wedding,
    Commercial: t.gallery.categories.commercial,
    Portrait: t.gallery.categories.portrait,
    "Music Videos": t.gallery.categories.music,
  };

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      setLightboxIndex((i) => {
        if (i === null) return i;
        const next = (i + dir + filtered.length) % filtered.length;
        return next;
      });
    },
    [filtered.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, closeLightbox, navigate]);

  const current = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div>
      {/* Category Filter Pills */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10"
      >
        {categories.map((cat, ci) => {
          const active = filter === cat;
          return (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: ci * 0.05 }}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                active
                  ? "gold-gradient-bg text-on-gold shadow-[0_0_20px_rgba(219,168,53,0.35)] scale-105"
                  : "border border-ink-700/80 text-ink-300 hover:border-gold-400/60 hover:text-gold-300 hover:bg-gold-400/5"
              }`}
            >
            {categoryLabels[cat] || cat}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Interactive AccordionGallery Showcase from React Bits */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-20"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 px-2">
          <div className="flex items-center gap-2 text-xs font-mono text-gold-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full gold-gradient-bg animate-pulse" />
            <span>Interactive Featured Showcase</span>
          </div>

          <p className="text-xs text-ink-400 font-light">
            Hover or tap panels to expand • Click to enlarge
          </p>
        </div>

        <div className="relative z-10 w-full p-2 sm:p-3 rounded-3xl border border-gold-400/35 bg-surface shadow-[0_15px_50px_rgba(0,0,0,0.35)]">
          <AccordionGallery
            key={filter}
            items={accordionItems}
            defaultIndex={Math.min(2, Math.max(0, accordionItems.length - 1))}
            accentColor="#dba835"
            overlayColor="#0a0713"
            textColor="#ffffff"
            height={500}
            gap={12}
            radius={18}
            expandRatio={0.52}
            trigger="hover"
            grayscale={true}
            showLabels={true}
            onItemClick={(_, index) => openLightbox(index)}
          />
        </div>
      </motion.section>

      {/* Grid Portfolio Section Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-ink-800/80">
        <div className="flex items-center gap-2.5">
          <Grid3X3 className="w-4 h-4 text-gold-400" />
          <h2 className="font-display text-2xl font-bold text-ink-50">
            Curated Portfolio Grid
          </h2>
        </div>
        <span className="text-xs font-mono text-gold-400 px-3 py-1 rounded-full border border-gold-400/20 bg-gold-400/5">
          {filtered.length} Frames
        </span>
      </div>

      {/* Masonry Grid - Stable, Glitch-Free Rendering */}
      <div className="masonry columns-1 sm:columns-2 lg:columns-3">
        {filtered.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: Math.min((i % 6) * 0.04, 0.25) }}
            onClick={() => openLightbox(i)}
            className="group relative z-10 block w-full overflow-hidden rounded-2xl mb-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 border border-border bg-surface hover:border-gold-400/50 transition-colors shadow-md text-left"
            style={{
              breakInside: "avoid-column",
            }}
            aria-label={`Open ${item.alt}`}
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: `${item.width} / ${item.height}` }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gold-400 text-on-gold shadow-[0_0_20px_rgba(219,168,53,0.5)]">
                <ZoomIn className="w-5 h-5" />
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
              <span className="inline-block text-gold-400 text-[11px] font-semibold tracking-widest uppercase mb-1">
                {item.category}
              </span>
              <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {item.title || item.alt}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="absolute top-5 right-5 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-gold-400 hover:text-on-gold transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(-1);
              }}
              aria-label="Previous image"
              className="absolute left-3 sm:left-6 z-10 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 text-white hover:bg-gold-400 hover:text-on-gold transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(1);
              }}
              aria-label="Next image"
              className="absolute right-3 sm:right-6 z-10 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 text-white hover:bg-gold-400 hover:text-on-gold transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative mx-auto rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  maxWidth: "min(90vw, 1100px)",
                  aspectRatio: `${current.width} / ${current.height}`,
                  maxHeight: "85vh",
                }}
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="text-center mt-5">
                <span className="text-gold-400 text-xs font-semibold tracking-widest uppercase">
                  {current.category}
                </span>
                <p className="text-white text-lg font-medium mt-1">
                  {current.title || current.alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
