"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Award, Crown, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { storyMilestones } from "@/lib/data";

export function CompanyTimeline() {
  const { t } = useLanguage();
  const timelineData = t.about.timeline || [];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-gold-400 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-4 px-4 py-1.5 rounded-full border border-gold-400/30 bg-gold-400/5 backdrop-blur-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            {t.about.timelineEyebrow}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ink-50 mb-5 tracking-tight"
          >
            {t.about.timelineTitle1}{" "}
            <span className="gold-gradient">{t.about.timelineTitle2}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-ink-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            {t.about.timelineSubtitle}
          </motion.p>
        </div>

        {/* Timeline Line & Items */}
        <div className="relative">
          {/* Vertical central illuminated line */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-12 -translate-x-1/2 w-0.5 bg-gradient-to-b from-gold-400/20 via-gold-400/60 to-gold-400/20" />

          <div className="space-y-12 lg:space-y-24">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              const isLatest = index === timelineData.length - 1;
              const defaultMilestone = storyMilestones[index] || storyMilestones[0];
              const imageSrc = defaultMilestone.image;

              return (
                <div
                  key={item.year}
                  className={`relative flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-8 lg:gap-16`}
                >
                  {/* Content Card */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: isEven ? -60 : 60,
                      scale: 0.9,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      y: 0,
                    }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="w-full lg:w-1/2"
                  >
                    <div
                      className={`relative z-10 rounded-3xl p-6 sm:p-8 border transition-all duration-500 overflow-hidden group shadow-[0_4px_25px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_45px_rgba(219,168,53,0.18)] ${
                        isLatest
                          ? "border-gold-400/80 bg-surface shadow-[0_0_50px_rgba(219,168,53,0.22)]"
                          : "border-border bg-surface hover:border-gold-400/50"
                      }`}
                    >
                      {/* Ambient background shimmer */}
                      <div className="absolute top-0 right-0 w-36 h-36 bg-gold-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                      {/* Header bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase gold-gradient-bg text-on-gold shadow-sm">
                          {isLatest ? (
                            <>
                              <Crown className="w-3.5 h-3.5" />
                              {item.badge}
                            </>
                          ) : (
                            <>
                              <Award className="w-3.5 h-3.5" />
                              {item.badge}
                            </>
                          )}
                        </span>

                        <span className="font-mono text-2xl sm:text-3xl font-extrabold gold-gradient tracking-tight">
                          {item.year}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-ink-50 mb-3 group-hover:text-gold-300 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-ink-300 text-sm sm:text-base leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Image Preview & Highlight */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-4 border-t border-ink-800/80">
                        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-ink-800 group-hover:border-gold-400/30 transition-colors">
                          <Image
                            src={imageSrc}
                            alt={`${item.year} milestone preview`}
                            fill
                            sizes="(max-width: 768px) 100vw, 300px"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>

                        <div className="flex flex-col gap-2">
                          <span className="text-[11px] font-semibold text-gold-400 uppercase tracking-widest">
                            Key Milestone
                          </span>
                          <div className="flex items-start gap-2 text-ink-100 text-sm font-medium">
                            <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                            <span>{item.highlight}</span>
                          </div>
                        </div>
                      </div>

                      {isLatest && (
                        <div className="mt-5 pt-3 flex items-center justify-between text-xs text-gold-400 font-semibold border-t border-gold-400/20">
                          <span className="flex items-center gap-1.5">
                            <Award className="w-4 h-4" />
                            Beclassic Photography Legacy
                          </span>
                          <span className="animate-pulse">● Present</span>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Center Node (on large screens) */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.15,
                    }}
                    className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-2 border-gold-400 items-center justify-center bg-ink-950 shadow-[0_0_25px_rgba(219,168,53,0.5)] z-10"
                  >
                    <span className="font-mono text-xs font-bold text-gold-400">
                      {item.year.slice(2)}
                    </span>
                    {isLatest && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full gold-gradient-bg flex items-center justify-center animate-ping" />
                    )}
                  </motion.div>

                  {/* Spacer for other side on desktop */}
                  <div className="hidden lg:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

