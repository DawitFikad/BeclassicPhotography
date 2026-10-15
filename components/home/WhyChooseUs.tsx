"use client";

import { motion } from "framer-motion";
import { Camera, Film, Users, Zap, Award, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/components/providers/LanguageProvider";

const whyIcons = [Camera, Users, Zap, Award, Film, Clock];

export function WhyChooseUs() {
  const { t } = useLanguage();
  const items = Object.values(t.why.items);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(219,168,53,0.06),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.why.eyebrow}
          title={
            <>
              {t.why.title1} <span className="gold-gradient">{t.why.title2}</span> {t.why.title3}
            </>
          }
          subtitle={t.why.subtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const Icon = whyIcons[i];
            const col = i % 3;
            // col 0: slide in from left
            // col 1: immerge from center
            // col 2: slide in from right
            const initialPos =
              col === 0
                ? { opacity: 0, x: -50, scale: 0.95 }
                : col === 2
                ? { opacity: 0, x: 50, scale: 0.95 }
                : { opacity: 0, y: 35, scale: 0.9 };

            return (
              <motion.div
                key={item.title}
                initial={initialPos}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{
                  duration: 0.65,
                  delay: (i % 3) * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative z-10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-border bg-surface hover:border-gold-400/50 transition-all duration-500 shadow-[0_4px_25px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_40px_rgba(219,168,53,0.15)]"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl gold-gradient-bg mb-6 group-hover:scale-110 shadow-[0_0_20px_rgba(219,168,53,0.3)] transition-transform duration-500">
                  <Icon className="w-7 h-7 text-on-gold" />
                </div>

                <h3 className="text-ink-50 text-xl font-semibold mb-3 group-hover:text-gold-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-ink-400 leading-relaxed text-sm">
                  {item.description}
                </p>

                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
