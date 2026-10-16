"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Crown,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  PhoneCall,
  MessageCircle,
  Calendar,
  Layers,
  Camera,
  X,
  Maximize2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Package } from "@/lib/data";
import { studioInfo } from "@/lib/data";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface PackageDetailViewProps {
  pkg: Package;
  relatedPackages: Package[];
}

export function PackageDetailView({
  pkg,
  relatedPackages,
}: PackageDetailViewProps) {
  const { lang } = useLanguage();
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const whatsappMessage = encodeURIComponent(
    `Hello Beclassic Photography, I am interested in booking the "${pkg.name}" (${pkg.price}). Could you please share availability and booking details?`
  );

  return (
    <div className="pt-24 sm:pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back to Packages Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <Link
          href="/packages"
          className="inline-flex items-center gap-2 text-sm text-ink-400 hover:text-gold-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-gold-400" />
          <span>{lang === "am" ? "ወደ ሁሉም ፓኬጆች ተመለስ" : "Back to All Packages"}</span>
        </Link>
      </nav>

      {/* Hero Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative overflow-hidden rounded-3xl p-6 sm:p-10 md:p-12 border shadow-2xl mb-14 ${
          pkg.popular
            ? "border-gold-400/70 bg-surface shadow-[0_0_60px_rgba(219,168,53,0.18)]"
            : "border-border bg-surface"
        }`}
      >
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-gold-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-3xl">
            {/* Category & Badge */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 rounded-full border border-gold-400/30 bg-gold-400/5">
                {pkg.category}
              </span>
              <span className="text-xs font-medium text-ink-300 px-3 py-1 rounded-full border border-ink-800 bg-ink-900/60">
                {pkg.serviceType}
              </span>
              {pkg.duration && (
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-300 px-3 py-1 rounded-full border border-gold-400/40 bg-gold-400/10">
                  {pkg.duration}
                </span>
              )}
              {pkg.popular && (
                <span className="inline-flex items-center gap-1 gold-gradient-bg text-on-gold text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  <Crown className="w-3.5 h-3.5" />
                  {lang === "am" ? "ተመራጭ" : "Best Seller"}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink-50 mb-4 tracking-tight leading-tight">
              {pkg.name}
            </h1>

            {/* Description */}
            <p className="text-ink-300 text-base sm:text-lg leading-relaxed mb-6 font-light">
              {pkg.description}
            </p>

            {/* Price Tag */}
            <div className="inline-flex flex-col sm:flex-row sm:items-baseline gap-2 pb-2">
              <span className="text-xs uppercase font-mono tracking-wider text-ink-400">
                {lang === "am" ? "የፓኬጅ ዋጋ" : "Package Investment"}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-ink-50 gold-gradient tracking-tight">
                  {pkg.price}
                </span>
                <span className="text-xs text-ink-400 font-medium">
                  {lang === "am" ? "ሁሉንም ያካተተ" : "All-Inclusive Production"}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[260px] shrink-0">
            <Link
              href={`/contact?package=${encodeURIComponent(pkg.name)}`}
              className="gold-gradient-bg text-on-gold px-6 py-4 rounded-full font-bold text-center text-sm sm:text-base shadow-lg hover:shadow-[0_0_35px_rgba(219,168,53,0.5)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{lang === "am" ? "ይህን ፓኬጅ ይያዙ" : "Book This Package"}</span>
            </Link>

            <a
              href={`https://wa.me/${studioInfo.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 font-semibold text-center text-sm transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{lang === "am" ? "በ WhatsApp ያነጋግሩን" : "Chat on WhatsApp"}</span>
            </a>

            <a
              href={`tel:${studioInfo.phoneRaw}`}
              className="px-6 py-3 rounded-full border border-ink-800 hover:border-gold-400/50 text-ink-300 hover:text-gold-300 font-medium text-center text-xs transition-colors flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{studioInfo.phone}</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Package Gallery */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center text-on-gold">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold">
              {lang === "am" ? "የስራዎች ናሙና" : "Visual Portfolio"}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-50">
              {lang === "am" ? "የፓኬጅ ጋለሪ" : "Package Gallery"}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {pkg.gallery.map((imageSrc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              onClick={() => setActiveImage(imageSrc)}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer border border-border bg-surface"
            >
              <Image
                src={imageSrc}
                alt={`${pkg.name} - image ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-xs text-white/90 font-medium flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-gold-400" />
                  <span>{pkg.name} - image {idx + 1}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Grid: What's Included & Package Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-start">
        {/* What's Included (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 rounded-3xl p-6 sm:p-8 md:p-10 border border-border bg-surface shadow-xl"
        >
          <div className="flex items-center gap-2.5 mb-2">
            <Layers className="w-5 h-5 text-gold-400" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-50">
              {lang === "am" ? "የተካተቱ አገልግሎቶች" : "What's Included"}
            </h2>
          </div>
          <p className="text-ink-400 text-sm mb-6">
            {lang === "am"
              ? "ይህ ፓኬጅ የሚያካትታቸው ዋና ዋና ግብአቶች እና የአገልግሎት ዝርዝሮች፦"
              : "Every essential element provided in this full-production package:"}
          </p>

          <ul className="space-y-3.5">
            {pkg.whatsIncluded.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3.5 p-3 rounded-xl border border-ink-800/80 bg-ink-900/40 hover:border-gold-400/40 transition-colors"
              >
                <span className="w-5 h-5 rounded-full gold-gradient-bg text-on-gold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </span>
                <span className="text-sm sm:text-base text-ink-100 font-medium leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Package Highlights (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 rounded-3xl p-6 sm:p-8 md:p-10 border border-gold-400/40 bg-surface shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-gold-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-2.5 mb-2">
            <Sparkles className="w-5 h-5 text-gold-400" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-50">
              {lang === "am" ? "የፓኬጁ ዋና መለያዎች" : "Package Highlights"}
            </h2>
          </div>
          <p className="text-ink-400 text-sm mb-6">
            {lang === "am" ? "ጥንዶች ይህንን ፓኬጅ የሚመርጡባቸው 4 ዋና ምክንያቶች፦" : "Key standout qualities of this offering:"}
          </p>

          <div className="space-y-4">
            {pkg.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 rounded-2xl border border-ink-800 bg-ink-900/60 hover:border-gold-400/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl gold-gradient-bg text-on-gold font-display text-lg font-black flex items-center justify-center shrink-0 shadow-md">
                  {idx + 1}
                </div>
                <div className="text-ink-100 text-sm sm:text-base font-semibold leading-snug">
                  {highlight}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* You Might Also Like (Related Packages) */}
      {relatedPackages.length > 0 && (
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold block mb-2">
              {lang === "am" ? "ተዛማጅ ምርጫዎች" : "Alternative Options"}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-ink-50">
              {lang === "am" ? "ይህም ሊስማማዎት ይችላል" : "You Might Also Like"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPackages.map((rel) => (
              <motion.div
                key={rel.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl p-6 sm:p-7 border border-border bg-surface flex flex-col justify-between hover:border-gold-400/60 hover:shadow-[0_10px_35px_rgba(219,168,53,0.15)] transition-all"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-ink-800">
                    <Image
                      src={rel.gallery[0] || "/images/hero/hero-1.jpg"}
                      alt={rel.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/70 backdrop-blur text-gold-300 font-semibold">
                        {rel.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-ink-50 mb-2">
                    {rel.name}
                  </h3>
                  <p className="text-ink-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
                    {rel.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-ink-800/80 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-ink-400 block">
                      Price
                    </span>
                    <span className="font-display text-xl font-extrabold text-ink-50 gold-gradient">
                      {rel.price}
                    </span>
                  </div>

                  <Link
          href={`/packages/detail?id=${encodeURIComponent(rel.id)}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gold-400/60 text-gold-300 hover:bg-gold-400 hover:text-on-gold font-semibold text-xs transition-all"
                  >
                    <span>{lang === "am" ? "ፓኬጁን ይመልከቱ" : "View Package"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Multi-package Booking Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl p-8 sm:p-12 text-center border border-gold-400/40 bg-surface shadow-2xl relative overflow-hidden"
      >
        <div className="max-w-2xl mx-auto relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold block mb-2">
            {lang === "am" ? "ብጁ የፓኬጅ ምርጫ" : "Multi-Package Selection"}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-ink-50 mb-4">
            {lang === "am"
              ? "ከአንድ በላይ ፓኬጆችን መምረጥ ይፈልጋሉ?"
              : "Need More Than One Package for Your Wedding?"}
          </h2>
          <p className="text-ink-300 text-sm sm:text-base mb-8 leading-relaxed font-light">
            {lang === "am"
              ? "የእኛን የቦታ ማስያዣ ቅጽ በመጠቀም ስቱዲዮ እና ላንድስኬፕ፣ የሙሉ ቀን ሰርግ፣ መልስ እና ሽምግልናን በአንድ ላይ መርጠው ፈጣን ግምታዊ ዋጋ ማግኘት ይችላሉ።"
              : "Combine Studio & Landscape with Ceremony Photo & Video, Melse, or Pre-Wedding shoots. Our contact form lets you select multiple packages with live estimates."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/contact?package=${encodeURIComponent(pkg.name)}`}
              className="gold-gradient-bg text-on-gold px-8 py-3.5 rounded-full font-bold text-sm sm:text-base shadow-lg hover:shadow-[0_0_35px_rgba(219,168,53,0.5)] hover:scale-105 transition-all inline-flex items-center gap-2"
            >
              <span>{lang === "am" ? "ፓኬጆችን ይምረጡ" : "Select Packages in Form"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/packages/builder"
              className="px-6 py-3.5 rounded-full border border-gold-400/50 bg-gold-400/10 text-gold-300 hover:bg-gold-400 hover:text-on-gold font-semibold text-sm sm:text-base transition-all"
            >
              {lang === "am" ? "የፓኬጅ አበጅ (Package Builder)" : "Open Package Builder"}
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] w-full h-[70vh] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={activeImage}
                alt="Enlarged view"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

