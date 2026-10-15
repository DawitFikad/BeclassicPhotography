"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clapperboard, CheckCircle2 } from "lucide-react";
import { teamMembers } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CompanyTimeline } from "@/components/about/CompanyTimeline";
import { StatsSection } from "@/components/home/StatsSection";
import { useLanguage } from "@/components/providers/LanguageProvider";

const storyHighlights = [
  { key: "crafted" },
  { key: "cinematic" },
  { key: "vision" },
] as const;

const btsImages = [
  "/images/wedding/wedding-5.jpg",
  "/images/music-video/music-1.jpg",
  "/images/commercial/commercial-3.jpg",
  "/images/wedding/wedding-6.jpg",
];

export default function AboutPage() {
  const { t } = useLanguage();
  const highlights = storyHighlights.map((h) => t.about.highlights[h.key]);
  const team = teamMembers.map((m, i) => ({
    ...m,
    name: t.about.team[i].name,
    role: t.about.team[i].role,
    bio: t.about.team[i].bio,
  }));

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
      {/* 1. Our Story Intro with Left/Right Slide-in Animations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.about.eyebrow}
          title={
            <>
              {t.about.title1} <span className="gold-gradient">{t.about.title2}</span>
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          {/* Story Text - Sliding in from Left */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-ink-200 text-lg leading-relaxed mb-5 font-normal">
              {t.about.story1}
            </p>
            <p className="text-ink-400 leading-relaxed mb-8">
              {t.about.story2}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-5 rounded-2xl border border-ink-800 bg-ink-900/40 hover:border-gold-400/40 transition-colors"
                >
                  <h3 className="text-ink-50 font-semibold mb-1 text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                    {h.title}
                  </h3>
                  <p className="text-ink-500 text-xs leading-relaxed">{h.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Story Image - Sliding in from Right with Immerge */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-ink-800">
              <Image
                src="/images/wedding/wedding-1.jpg"
                alt="Beclassic Photography team on set"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-36 h-36 rounded-2xl gold-gradient-bg/25 blur-3xl pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* 2. Counting Animation Numbers on Scroll */}
      <StatsSection showHeading={true} className="border-t border-ink-800/80 bg-ink-900/20" />

      {/* 3. Company Story Timeline in Years with Scrolling Pop-up Animations to 2026 */}
      <CompanyTimeline />

      {/* 4. Meet The Team with Staggered Slide In / Immerge Animations */}
      <section className="py-24 bg-ink-900/30 border-y border-ink-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t.about.teamEyebrow}
            title={
              <>
                {t.about.teamTitle1}{" "}
                <span className="gold-gradient">{t.about.teamTitle2}</span>
              </>
            }
            subtitle={t.about.teamSubtitle}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={member.id}
                  initial={{
                    opacity: 0,
                    x: isEven ? -40 : 40,
                    y: 30,
                    scale: 0.95,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                  }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group relative z-10 rounded-3xl p-4 border border-border bg-surface hover:border-gold-400/50 transition-colors shadow-[0_4px_25px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_40px_rgba(219,168,53,0.15)]"
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-5">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                  <h3 className="text-ink-50 text-lg font-semibold group-hover:text-gold-300 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-gold-400 text-sm font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-ink-400 text-xs sm:text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Behind The Scenes with Pop-up Immerge Scale Animations */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.about.btsEyebrow}
          title={
            <>
              {t.about.btsTitle1}{" "}
              <span className="gold-gradient">{t.about.btsTitle2}</span>
            </>
          }
          subtitle={t.about.btsSubtitle}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {btsImages.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`relative z-10 aspect-square rounded-2xl overflow-hidden group border border-border bg-surface shadow-md ${
                i === 0 ? "col-span-2 row-span-2 aspect-square" : ""
              }`}
            >
              <Image
                src={src}
                alt={`Behind the scenes ${i + 1}`}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/10 transition-colors duration-500" />
              {i === 0 && (
                <div className="absolute bottom-5 left-5 flex items-center gap-2 text-white bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                  <Clapperboard className="w-4 h-4 text-gold-400" />
                  <span className="text-sm font-medium">{t.about.onLocation}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
