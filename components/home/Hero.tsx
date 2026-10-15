
"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import BlurText from "@/components/ui/BlurText";
import { PixelSwap, type PixelSwapPattern } from "@/components/ui/PixelSwap";

// Authentic studio wedding and hero slide collection
const slides = [
  {
    src: "/images/hero/hero-1.jpg",
    alt: "Ethiopian Wedding Romance & Royal Ceremony",
    label: "Royal Romance",
  },
  {
    src: "/images/hero/hero-2.jpg",
    alt: "Golden Hour Studio & Landscape Masterpiece",
    label: "Golden Hour",
  },
  {
    src: "/images/hero/hero-3.jpg",
    alt: "Radiant Bride & Groom Picture Perfect",
    label: "Timeless Vows",
  },
  {
    src: "/images/hero/hero-4.jpg",
    alt: "Cinematic Beclassic Photography Visual Story",
    label: "Cinematic Film",
  },
  {
    src: "/images/wedding/wedding-1.jpg",
    alt: "Ethiopian Cultural Wedding & Heritage",
    label: "Cultural Heritage",
  },
];

const PATTERNS: PixelSwapPattern[] = [
  "random",
  "center",
  "diagonal",
  "spiral",
  "edges",
  "left-to-right",
];

export function Hero() {
  const [firstSlideIndex, setFirstSlideIndex] = useState(0);
  const [secondSlideIndex, setSecondSlideIndex] = useState(1);
  const [isSecondActive, setIsSecondActive] = useState(false);
  const [patternIndex, setPatternIndex] = useState(0);

  const { t, lang } = useLanguage();
  const { scrollY } = useScroll();

  const currentSlideIndex = isSecondActive ? secondSlideIndex : firstSlideIndex;

  // Gentle parallax and opacity fade when scrolling down away from hero
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.2]);
  const heroTranslateY = useTransform(scrollY, [0, 500], [0, 80]);
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 90], [1, 0]);

  // Preload all slides in background for glitch-free transitions
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.src;
    });
  }, []);

  const goToSlide = useCallback(
    (targetIndex: number) => {
      if (targetIndex === currentSlideIndex) return;

      if (!isSecondActive) {
        setSecondSlideIndex(targetIndex);
        setIsSecondActive(true);
      } else {
        setFirstSlideIndex(targetIndex);
        setIsSecondActive(false);
      }
      setPatternIndex((p) => (p + 1) % PATTERNS.length);
    },
    [currentSlideIndex, isSecondActive]
  );

  const nextSlide = useCallback(() => {
    const next = (currentSlideIndex + 1) % slides.length;
    goToSlide(next);
  }, [currentSlideIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    const prev = (currentSlideIndex - 1 + slides.length) % slides.length;
    goToSlide(prev);
  }, [currentSlideIndex, goToSlide]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative min-h-[100svh] min-h-[620px] w-full overflow-hidden flex flex-col justify-between">
      {/* Background PixelSwap Component from React Bits */}
      <div
        className="absolute inset-0 will-change-transform cursor-pointer"
        onClick={nextSlide}
        title="Click anywhere to pixel swap photo"
      >
        <PixelSwap
          firstContent={
            <div className="relative w-full h-full">
              <Image
                src={slides[firstSlideIndex].src}
                alt={slides[firstSlideIndex].alt}
                fill
                priority={firstSlideIndex === 0}
                sizes="100vw"
                quality={85}
                className="object-cover object-center select-none"
              />
            </div>
          }
          secondContent={
            <div className="relative w-full h-full">
              <Image
                src={slides[secondSlideIndex].src}
                alt={slides[secondSlideIndex].alt}
                fill
                priority
                sizes="100vw"
                quality={85}
                className="object-cover object-center select-none"
              />
            </div>
          }
          pixelSize={64}
          gap={0}
          pixelRadius={0}
          pixelSpin={0}
          pixelScale={0.35}
          duration={1400}
          pixelDuration={450}
          pattern={PATTERNS[patternIndex]}
          randomness={0}
          fade={true}
          trigger="manual"
          active={isSecondActive}
          onComplete={(newActive) => {
            if (newActive) {
              setFirstSlideIndex((secondSlideIndex + 1) % slides.length);
            } else {
              setSecondSlideIndex((firstSlideIndex + 1) % slides.length);
            }
          }}
          aspectRatio="none"
          className="w-full h-full pointer-events-none"
          style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
        />
      </div>

      {/* Luminous & radiant overlays: Soft, subtle vignette that keeps photos bright and vivid */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/65 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />

      {/* Subtle animated glass sheen across hero banner */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 z-[1] pointer-events-none opacity-15"
        style={{
          background:
            "linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Main Hero Content - Centered optical alignment for all devices including Samsung A15 */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroTranslateY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center pt-24 pb-14 sm:pt-28 sm:pb-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Trust & Heritage Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-400/40 bg-black/45 backdrop-blur-md mb-3 sm:mb-5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse shrink-0" />
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-gold-300 font-semibold truncate">
              {lang === "am"
                ? "ከ10+ ዓመታት ልምድ • 500+ ደስተኛ ጥንዶች"
                : "10+ Years • 500+ Couples • Timeless Elegance"}
            </span>
          </div>

          {/* Fluid Responsive Typography for Samsung A15 and All Screens */}
          <h1 className="font-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.14] sm:leading-[1.08] mb-3 sm:mb-5 tracking-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)] flex flex-col items-start gap-1">
            <BlurText
              key={`hero-title-1-${t.hero.title1}-${lang}`}
              text={`${t.hero.title1} ${t.hero.title2}`}
              delay={130}
              animateBy="words"
              direction="top"
              stepDuration={0.35}
              startDelay={0.1}
              as="span"
              spanClassName={(segment) =>
                t.hero.title2.includes(segment) ? "gold-gradient italic" : ""
              }
              className="inline-flex flex-wrap items-baseline gap-x-2 sm:gap-x-4"
            />
            <BlurText
              key={`hero-title-2-${t.hero.title3}-${lang}`}
              text={`${t.hero.title3} ${t.hero.title4}`}
              delay={130}
              animateBy="words"
              direction="top"
              stepDuration={0.35}
              startDelay={0.35}
              as="span"
              spanClassName={(segment) =>
                t.hero.title4.includes(segment) ? "gold-gradient italic" : ""
              }
              className="inline-flex flex-wrap items-baseline gap-x-2 sm:gap-x-4"
            />
          </h1>

          <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-xl mb-6 sm:mb-8 leading-relaxed font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {t.hero.subtitle}
          </p>

          {/* Responsive Action Buttons (Side-by-side or stacked cleanly) */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full max-w-md sm:max-w-none">
            <Link href="/gallery" className="w-full sm:w-auto">
              <InteractiveHoverButton
                text={t.hero.viewPortfolio}
                className="w-full sm:w-52 h-11 sm:h-12 py-2 px-5 text-xs sm:text-sm border-gold-400/50 bg-black/65 text-white backdrop-blur-md shadow-[0_4px_25px_rgba(219,168,53,0.3)] hover:border-gold-400 hover:shadow-[0_0_30px_rgba(219,168,53,0.6)]"
              />
            </Link>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-11 sm:h-12 text-xs sm:text-sm border-white/30 text-white hover:bg-white/10 backdrop-blur-sm shadow-md"
            >
              <Play className="w-4 h-4 text-gold-400" />
              {t.hero.bookSession}
            </Button>
          </div>
        </motion.div>
      </motion.div>



      {/* Bottom Controls Bar: Slide Indicators & Counter & Arrows */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5 sm:pb-8 flex items-center justify-between gap-4">
        {/* Slide Indicators Pill */}
        <div className="flex items-center gap-3 bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-lg">
          <span className="text-[11px] font-mono text-white/90 font-semibold tracking-wider">
            {String(currentSlideIndex + 1).padStart(2, "0")} <span className="text-gold-400">/</span> {String(slides.length).padStart(2, "0")}
          </span>

          <div className="h-3 w-px bg-white/20" />

          <div className="flex items-center gap-1.5 sm:gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(i);
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === currentSlideIndex
                    ? "w-7 sm:w-9 bg-gold-400 shadow-[0_0_12px_rgba(219,168,53,0.9)]"
                    : "w-2.5 sm:w-3.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <div className="hidden xs:flex items-center gap-1 ml-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              aria-label="Previous slide"
              className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              aria-label="Next slide"
              className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="hidden sm:flex items-center gap-2 text-white/80 pointer-events-none drop-shadow-sm bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10"
        >
          <span className="text-[10px] uppercase font-mono tracking-[0.2em] font-medium text-white/80">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-3.5 h-3.5 text-gold-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
