"use client";

import { motion } from "framer-motion";
import { Film } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function CtaBanner() {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 overflow-hidden rounded-3xl p-6 sm:p-10 md:p-16 text-center border border-gold-400/35 shadow-[0_15px_60px_rgba(219,168,53,0.18)]"
      >
        <div className="absolute inset-0 bg-surface" />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(219,168,53,0.18),transparent_60%)]" />
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gold-400/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-gold-400/15 blur-3xl pointer-events-none" />

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 text-gold-400 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-6 px-4 py-1.5 rounded-full border border-gold-400/30 bg-gold-400/10 backdrop-blur-sm"
          >
            <Film className="w-3.5 h-3.5" />
            {t.cta.badge}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-ink-50 font-bold mb-6 max-w-3xl mx-auto leading-tight break-words"
          >
            {t.cta.title1}{" "}
            <span className="gold-gradient">{t.cta.title2}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-ink-300 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-light"
          >
            {t.cta.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto"
          >
            <Button href="/contact" size="lg">
              {t.cta.getInTouch}
            </Button>
            <Button href="/packages" variant="outline" size="lg">
              {t.cta.viewPackages}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
