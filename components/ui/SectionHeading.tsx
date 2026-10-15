"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div
      className={`flex flex-col ${alignment} gap-4 max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-20 overflow-hidden`}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: -15, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 text-gold-400 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase px-3.5 py-1 rounded-full border border-gold-400/25 bg-gold-400/5 backdrop-blur-sm"
        >
          <span className="w-4 h-px bg-gold-400" />
          {eyebrow}
          <span className="w-4 h-px bg-gold-400" />
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-3xl sm:text-5xl lg:text-6xl text-ink-50 leading-[1.15] font-bold tracking-tight break-words"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-ink-400 text-base sm:text-lg max-w-2xl leading-relaxed font-light"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
