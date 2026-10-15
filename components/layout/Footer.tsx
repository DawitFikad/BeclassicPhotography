"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Camera,
  Instagram,
  Facebook,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { studioInfo } from "@/lib/data";
import { useLanguage } from "@/components/providers/LanguageProvider";

const socials = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/be__classic_photography/",
    label: "Instagram",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/be.classic.photography",
    label: "Facebook",
  },
  {
    icon: Phone,
    href: `tel:${studioInfo.phoneRaw}`,
    label: "Phone",
  },
];

export function Footer() {
  const { t, lang } = useLanguage();
  const [year, setYear] = useState(2026);

  useEffect(() => {
    const current = new Date().getFullYear();
    if (current > 2026) {
      setYear(current);
    }
  }, []);

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/gallery", label: t.nav.portfolio },
    { href: "/packages", label: t.nav.packages },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="relative z-10 border-t border-ink-800 bg-ink-950/85 backdrop-blur-md mt-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(219,168,53,0.08),transparent_60%)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg gold-gradient-bg">
                <Camera className="w-5 h-5 text-on-gold" />
              </span>
              <span className="font-display text-xl font-bold text-ink-50">
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
            <p className="text-ink-400 text-sm leading-relaxed mb-5">
              {studioInfo.tagline}. {t.footer.tagline}
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-ink-700 text-ink-300 hover:border-gold-400 hover:text-gold-400 transition-colors duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-ink-50 font-semibold mb-5 tracking-wide">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-3">
              {navItems.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-400 hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-ink-50 font-semibold mb-5 tracking-wide">
              {t.footer.services}
            </h3>
            <ul className="space-y-3">
              {t.footer.servicesList.map((s) => (
                <li key={s}>
                  <Link
                    href="/contact"
                    className="text-ink-400 hover:text-gold-400 transition-colors text-sm"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-ink-50 font-semibold mb-5 tracking-wide">
              {t.footer.getInTouch}
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-ink-400">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <span>{studioInfo.address}</span>
              </li>
              <li>
                <a
                  href={`mailto:${studioInfo.email}`}
                  className="flex items-center gap-3 text-ink-400 hover:text-gold-400 transition-colors"
                >
                  <Mail className="w-5 h-5 text-gold-400 shrink-0" />
                  {studioInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${studioInfo.phoneRaw}`}
                  className="flex items-center gap-3 text-ink-400 hover:text-gold-400 transition-colors"
                >
                  <Phone className="w-5 h-5 text-gold-400 shrink-0" />
                  {studioInfo.phone}
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        <div className="mt-14 pt-8 border-t border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-ink-400 text-sm font-medium">
            © {year} BeclassicPhotography. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
