"use client";

import { motion } from "framer-motion";
import { Camera, Award, HeartHandshake, Clock } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useLanguage } from "@/components/providers/LanguageProvider";

const statIcons = [Camera, Award, HeartHandshake, Clock];

interface StatsSectionProps {
  className?: string;
  showHeading?: boolean;
}

export function StatsSection({
  className = "",
  showHeading = true,
}: StatsSectionProps) {
  const { t } = useLanguage();
  const items = t.stats.items;

  return (
    <section className={`relative py-16 md:py-24 overflow-hidden ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(219,168,53,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 text-gold-400 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-4 px-4 py-1.5 rounded-full border border-gold-400/30 bg-gold-400/5 backdrop-blur-sm"
            >
              <Award className="w-3.5 h-3.5" />
              {t.stats.eyebrow}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink-50 mb-4"
            >
              {t.stats.title1}{" "}
              <span className="gold-gradient">{t.stats.title2}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-ink-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            >
              {t.stats.subtitle}
            </motion.p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((stat, i) => {
            const Icon = statIcons[i % statIcons.length];
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  x: isLeft ? -40 : 40,
                  y: 30,
                  scale: 0.95,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative z-10 p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-border bg-surface hover:border-gold-400/50 transition-colors shadow-[0_4px_25px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_40px_rgba(219,168,53,0.15)] flex flex-col justify-between"
              >
                {/* Top card ambient line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="flex items-center justify-center w-12 h-12 rounded-2xl gold-gradient-bg shadow-[0_0_20px_rgba(219,168,53,0.3)] group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-on-gold" />
                    </span>
                    <span className="text-[11px] font-mono text-gold-400/70 uppercase tracking-widest px-2.5 py-1 rounded-full border border-gold-400/20 bg-gold-400/5">
                      0{i + 1}
                    </span>
                  </div>

                  <div className="font-display text-4xl sm:text-5xl font-extrabold text-ink-50 mb-2 tracking-tight flex items-baseline">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={2.2}
                      className="gold-gradient inline-block"
                    />
                  </div>

                  <h3 className="text-ink-50 font-semibold text-lg mb-2">
                    {stat.label}
                  </h3>

                  <p className="text-ink-400 text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-ink-800/60 flex items-center justify-between text-xs text-gold-400/80">
                  <span className="font-medium tracking-wide">Beclassic Metric</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 group-hover:scale-150 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

