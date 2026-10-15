"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, MessageCircle, ArrowUp, X } from "lucide-react";
import { studioInfo } from "@/lib/data";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { t } = useLanguage();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const current = window.scrollY;
          const scrollingDown = current > lastScrollY.current;
          lastScrollY.current = current;

          if (current > 300 && scrollingDown) {
            setShowTop(true);
          } else {
            setShowTop(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const whatsappUrl = `https://wa.me/${studioInfo.whatsapp}?text=${encodeURIComponent(
    "Hi Beclassic Photography, I'd like to inquire about your wedding and event services."
  )}`;

  return (
    <div className="fixed right-4 sm:right-6 bottom-6 z-40 flex flex-col items-end gap-3">
      {/* Quick Action Popup Menu (Call & WhatsApp) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col gap-2 items-end"
          >
            <a
              href={`tel:${studioInfo.phoneRaw}`}
              onClick={() => setMenuOpen(false)}
              className="group flex items-center gap-3"
            >
              <span className="glass-card px-3 py-1.5 rounded-full text-xs font-medium text-ink-100 shadow-md">
                {t.floating.call}
              </span>
              <span className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-ink-800 border border-gold-400/40 text-gold-300 hover:bg-gold-400 hover:text-on-gold transition-all duration-300 shadow-lg hover:scale-110">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center gap-3"
            >
              <span className="glass-card px-3 py-1.5 rounded-full text-xs font-medium text-ink-100 shadow-md">
                {t.floating.whatsapp}
              </span>
              <span className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(37,211,102,0.5)]">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Quick Action Button */}
      <button
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={t.floating.contactUs}
        className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full gold-gradient-bg text-on-gold hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(219,168,53,0.5)]"
      >
        {menuOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </button>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            aria-label={t.floating.scrollTop}
            className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-ink-900/90 border border-gold-400/40 text-gold-300 hover:bg-gold-400 hover:text-on-gold hover:scale-110 transition-all duration-300 shadow-xl backdrop-blur-md"
          >
            <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
