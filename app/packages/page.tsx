"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Crown, ArrowRight, Sparkles, FileText, PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function PackagesPage() {
  const { t, lang } = useLanguage();
  const { packages, additionalServices, packageCategories } = useSiteContent();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...packageCategories.map((category) => category.name)];
  const categoryLabels: Record<string, string> = {
    All: lang === "am" ? "ሁሉም" : "All",
    "Studio & Landscape": t.packages.categoriesList.studio,
    "Ceremony Photo & Video": t.packages.categoriesList.ceremony,
    "Event Photography": t.packages.categoriesList.events,
    "Special Event": t.packages.categoriesList.special,
  };

  const filteredPackages =
      selectedCategory === "All"
      ? packages
      : packages.filter((p) => p.category === selectedCategory);

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      <SectionHeading
        eyebrow={t.packages.eyebrow}
        title={
          <>
            {t.packages.title1}{" "}
            <span className="gold-gradient">{t.packages.title2}</span>
          </>
        }
        subtitle={t.packages.subtitle}
      />

      {/* Category Filter Pills */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16"
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
                isActive
                  ? "gold-gradient-bg text-on-gold shadow-[0_0_20px_rgba(219,168,53,0.35)] scale-105"
                  : "border border-ink-800 bg-surface/80 text-ink-300 hover:border-gold-400/60 hover:text-gold-300"
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          );
        })}
      </motion.div>

      {/* Quick Link to Package Builder */}
      <div className="flex justify-center -mt-8 mb-12 sm:mb-16">
        <Link
          href="/packages/builder"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold-400/50 bg-gold-400/10 text-gold-300 hover:bg-gold-400 hover:text-on-gold font-semibold text-xs sm:text-sm shadow-md hover:shadow-[0_0_20px_rgba(219,168,53,0.3)] transition-all"
        >
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span>{lang === "am" ? "የፓኬጅ አበጅ (Package Builder) ይክፈቱ" : "Need Custom Selection? Open Package Builder"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-20">
        <AnimatePresence mode="popLayout">
          {filteredPackages.map((pkg, i) => {
            return (
              <motion.div
                key={pkg.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: pkg.popular ? 1.02 : 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 20 }}
                transition={{
                  duration: 0.45,
                  delay: (i % 3) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`relative z-10 rounded-3xl p-6 sm:p-8 border transition-all duration-500 flex flex-col justify-between h-full shadow-[0_4px_25px_rgba(0,0,0,0.25)] ${
                  pkg.popular
                    ? "border-gold-400/80 bg-surface shadow-[0_0_50px_rgba(219,168,53,0.22)]"
                    : "border-border bg-surface hover:border-gold-400/50 hover:shadow-[0_10px_35px_rgba(219,168,53,0.12)]"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 gold-gradient-bg text-on-gold px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-[0_4px_15px_rgba(219,168,53,0.4)]">
                      <Crown className="w-3.5 h-3.5" />
                      {t.packages.mostPopular}
                    </span>
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <span className="text-[11px] font-mono text-gold-400 uppercase tracking-widest block mb-2 font-semibold">
                      {pkg.category}
                    </span>
                    <h3 className="font-display text-2xl text-ink-50 font-bold mb-2">
                      {pkg.name}
                    </h3>
                    {pkg.duration && (
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase border border-gold-400/30 bg-gold-400/5 text-gold-400 mb-2">
                        {pkg.duration}
                      </span>
                    )}
                    <p className="text-ink-400 text-sm leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-ink-800/80">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-3xl sm:text-4xl font-extrabold text-ink-50 tracking-tight">
                        {pkg.price}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-gold-400/80 uppercase tracking-wider mt-1 block">
                      Inclusive Production Package
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span
                          className={`flex items-center justify-center w-5 h-5 rounded-full shrink-0 mt-0.5 ${
                            pkg.popular
                              ? "gold-gradient-bg text-on-gold"
                              : "bg-gold-400/20 text-gold-400"
                          }`}
                        >
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </span>
                        <span className="text-ink-200 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions: View Details & Book Now */}
                <div className="flex flex-col gap-2.5 pt-4 border-t border-ink-800/60">
                  <Link
                    href={`/contact?package=${encodeURIComponent(pkg.name)}`}
                    className={`block w-full text-center py-3 rounded-full font-semibold transition-all duration-300 text-sm ${
                      pkg.popular
                        ? "gold-gradient-bg text-on-gold hover:shadow-[0_0_30px_rgba(219,168,53,0.5)] hover:scale-[1.01]"
                        : "border border-gold-400/70 text-gold-300 hover:bg-gold-400 hover:text-on-gold"
                    }`}
                  >
                    {t.packages.bookNow}
                  </Link>

                  <Link
                    href={`/packages/detail?id=${encodeURIComponent(pkg.id)}`}
                    className="inline-flex items-center justify-center gap-1.5 text-xs text-ink-300 hover:text-gold-400 transition-colors py-1.5 font-medium group"
                  >
                    <span>{t.packages.viewDetails}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-gold-400" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Additional Services Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="mb-20 rounded-3xl p-6 sm:p-10 border border-border bg-surface shadow-xl"
      >
        <div className="flex items-center gap-2.5 mb-2">
          <Sparkles className="w-5 h-5 text-gold-400" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-50">
            {t.packages.categoriesList.additional}
          </h2>
        </div>
        <p className="text-ink-400 text-sm sm:text-base mb-8 max-w-2xl">
          Enhance your package with dedicated cinematic landscape video and outdoor day photoshoot add-ons.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {additionalServices.map((addon) => (
            <div
              key={addon.id}
              className="p-6 rounded-2xl border border-ink-800 bg-ink-900/40 hover:border-gold-400/50 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-ink-50 font-bold text-lg">{addon.name}</h3>
                  <span className="font-display text-xl font-extrabold gold-gradient">
                    {addon.price}
                  </span>
                </div>
                <p className="text-ink-400 text-sm leading-relaxed mb-6">
                  {addon.description}
                </p>
              </div>

              <Link
                href={`/contact?package=${encodeURIComponent(addon.name)}`}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gold-400/50 text-gold-300 hover:bg-gold-400 hover:text-on-gold font-semibold text-sm transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add to Package</span>
              </Link>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Build Your Quote Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65 }}
        className="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center border border-gold-400/40 bg-surface shadow-[0_15px_50px_rgba(219,168,53,0.15)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-surface to-ink-900 opacity-95 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(219,168,53,0.15),transparent_65%)] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl gold-gradient-bg mb-4 text-on-gold shadow-lg">
            <FileText className="w-6 h-6" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-50 mb-3">
            {t.packages.builderTitle}
          </h2>
          <p className="text-ink-300 text-base sm:text-lg mb-8 leading-relaxed font-light">
            {t.packages.builderSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/packages/builder"
              className="gold-gradient-bg text-on-gold px-8 py-3.5 rounded-full font-semibold shadow-lg hover:shadow-[0_0_35px_rgba(219,168,53,0.5)] hover:scale-105 transition-all text-sm sm:text-base inline-flex items-center gap-2"
            >
              <span>{t.packages.builderBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-full border border-gold-400/40 text-gold-300 hover:border-gold-400 hover:bg-gold-400/10 font-semibold text-sm sm:text-base transition-all"
            >
              {t.packages.getQuote}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
