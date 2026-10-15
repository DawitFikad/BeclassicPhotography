"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Camera, Sun, Moon, Languages } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import GooeyNav from "@/components/ui/GooeyNav";
import StaggeredMenu from "@/components/ui/StaggeredMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { lang, t, toggleLang } = useLanguage();
  const { theme, mounted: themeMounted, toggleTheme } = useTheme();

  const isHome = pathname === "/";
  // When at top of homepage, the background is the dark hero banner
  const isTopHome = isHome && !scrolled;

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/gallery", label: t.nav.portfolio },
    { href: "/packages", label: t.nav.packages },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  const routeIndex = navItems.findIndex(
    (item) => item.href === pathname || (item.href !== "/" && pathname.startsWith(item.href))
  );
  const activeIndex = routeIndex >= 0 ? routeIndex : 0;

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const staggeredItems = navItems.map((item) => ({
    label: item.label,
    link: item.href,
    ariaLabel: item.label,
  }));

  const socialItems = [
    { label: "Instagram", link: "https://www.instagram.com/be__classic_photography/" },
    { label: "Facebook", link: "https://www.facebook.com/be.classic.photography" },
    { label: "WhatsApp", link: "https://wa.me/251932512720" },
    { label: "Phone", link: "tel:251932512720" },
  ];

  const mobilePanelBottom = (
    <div className="flex flex-col gap-4 pt-4 border-t border-gold-400/20">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={toggleLang}
          aria-label={t.language.switch}
          className="flex-1 flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-gold-400/40 bg-gold-400/10 text-current hover:border-gold-400 hover:text-gold-300 transition-colors"
        >
          <Languages className="w-4 h-4 text-gold-400" />
          <span className="text-sm font-semibold">
            {lang === "en" ? "English" : "አማርኛ (Amharic)"}
          </span>
        </button>

        <button
          onClick={toggleTheme}
          aria-label={
            themeMounted && theme === "dark"
              ? t.theme.toggleLight
              : t.theme.toggleDark
          }
          className="flex items-center justify-center w-11 h-11 rounded-xl border border-gold-400/40 bg-gold-400/10 text-current hover:border-gold-400 hover:text-gold-300 transition-colors"
        >
          {themeMounted && theme === "dark" ? (
            <Sun className="w-5 h-5 text-gold-400" />
          ) : (
            <Moon className="w-5 h-5 text-gold-400" />
          )}
        </button>
      </div>

      <Link
        href="/contact"
        className="w-full text-center gold-gradient-bg text-on-gold py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-[0_0_25px_rgba(219,168,53,0.4)] transition-all"
      >
        {t.nav.bookNow}
      </Link>
    </div>
  );

  return (
    <motion.header
      animate={{
        // Submerge when at top-most (scrollY <= 20): completely transparent background
        // When scrolled: frosted glass in dark or light mode
        backgroundColor: scrolled
          ? theme === "dark"
            ? "rgba(11, 12, 14, 0.82)"
            : "rgba(255, 255, 255, 0.85)"
          : "rgba(0, 0, 0, 0)",
        backdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
        WebkitBackdropFilter: scrolled ? "blur(18px)" : "blur(0px)",
        borderBottomColor: scrolled
          ? theme === "dark"
            ? "rgba(219, 168, 53, 0.18)"
            : "rgba(219, 168, 53, 0.25)"
          : "rgba(219, 168, 53, 0)",
        boxShadow: scrolled
          ? theme === "dark"
            ? "0 10px 35px -10px rgba(0, 0, 0, 0.7)"
            : "0 10px 30px -10px rgba(0, 0, 0, 0.08)"
          : "0 0 0 0 rgba(0, 0, 0, 0)",
        paddingTop: scrolled ? "0.75rem" : "1.25rem",
        paddingBottom: scrolled ? "0.75rem" : "1.25rem",
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b transition-colors"
    >
      {/* Submerged sheen ripple line that emerges when scrolling */}
      <motion.div
        animate={{
          opacity: scrolled ? 1 : 0,
          scaleX: scrolled ? 1 : 0.4,
        }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent pointer-events-none"
      />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="relative flex items-center justify-center w-9 h-9 rounded-lg gold-gradient-bg shadow-[0_0_15px_rgba(219,168,53,0.3)] group-hover:scale-105 transition-transform">
            <Camera className="w-5 h-5 text-on-gold" />
          </span>
          <span
            className={`font-display text-lg sm:text-xl font-bold tracking-wide shrink-0 transition-colors duration-300 ${
              isTopHome ? "text-white" : "text-ink-50"
            }`}
          >
            {lang === "am" ? (
              <>
                ቢክላሲክ <span className="gold-gradient">ፎቶግራፊ</span>
              </>
            ) : (
              <>
                Beclassic<span className="gold-gradient">Photography</span>
              </>
            )}
          </span>
        </Link>

        {/* Desktop Gooey Nav from React Bits */}
        <div className="hidden lg:flex items-center">
          <GooeyNav
            items={navItems}
            activeIndex={activeIndex}
            theme={theme === "light" ? "light" : "dark"}
            color="#dba835"
            activeTextColor="#0b0c0e"
            size="sm"
            frame={true}
            particleCount={15}
            spread={56}
            animationTime={600}
            timeVariance={300}
            gooeyness={0.5}
            wobble={0.5}
            hoverEffect={true}
          />
        </div>

        {/* Controls and Book Button (Desktop lg+) */}
        <div className="hidden lg:flex items-center gap-2.5">
          <button
            onClick={toggleLang}
            aria-label={t.language.switch}
            className={`flex items-center gap-1.5 h-9 px-3 rounded-full border transition-all duration-300 ${
              isTopHome
                ? "border-white/20 text-white hover:border-gold-400/80 hover:text-gold-300 bg-black/20 backdrop-blur-sm"
                : "border-ink-700 text-ink-100 hover:border-gold-400/60 hover:text-gold-300"
            }`}
          >
            <Languages className="w-4 h-4" />
            <span className="text-xs font-semibold">
              {lang === "en" ? "EN" : "አማ"}
            </span>
          </button>

          <button
            onClick={toggleTheme}
            aria-label={
              themeMounted && theme === "dark"
                ? t.theme.toggleLight
                : t.theme.toggleDark
            }
            className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 ${
              isTopHome
                ? "border-white/20 text-white hover:border-gold-400/80 hover:text-gold-300 bg-black/20 backdrop-blur-sm"
                : "border-ink-700 text-ink-100 hover:border-gold-400/60 hover:text-gold-300"
            }`}
          >
            {themeMounted && theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          <Link
            href="/contact"
            className="gold-gradient-bg text-on-gold px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_25px_rgba(219,168,53,0.45)] hover:scale-105"
          >
            {t.nav.bookNow}
          </Link>
        </div>

        {/* Mobile 3-Bar Menu using StaggeredMenu from React Bits */}
        <div className="lg:hidden flex items-center">
          <StaggeredMenu
            className={isTopHome ? "top-home-menu" : ""}
            position="right"
            logo={null}
            items={staggeredItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            colors={
              theme === "light"
                ? ["#dba835", "#e2e4e8", "#ffffff"]
                : ["#dba835", "#24252a", "#0b0c0e"]
            }
            accentColor="#dba835"
            menuButtonColor={
              isTopHome ? "#ffffff" : theme === "dark" ? "#ffffff" : "#0b0c0e"
            }
            openMenuButtonColor="#ffffff"
            panelBottom={mobilePanelBottom}
          />
        </div>
      </nav>
    </motion.header>
  );
}
