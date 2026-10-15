"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { studioInfo } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useTheme } from "@/components/providers/ThemeProvider";

interface ContactContentProps {
  prefilledService?: string;
}

export function ContactContent({ prefilledService = "" }: ContactContentProps) {
  const { t } = useLanguage();
  const { theme, mounted } = useTheme();
  const contactInfo = [
    {
      icon: MapPin,
      label: t.contact.studio,
      value: studioInfo.address,
      href: studioInfo.mapUrl,
    },
    {
      icon: Phone,
      label: t.contact.phone,
      value: `${studioInfo.phone} / ${studioInfo.phoneSecondary}`,
      href: `tel:${studioInfo.phoneRaw}`,
    },
    {
      icon: Mail,
      label: t.contact.email,
      value: studioInfo.email,
      href: `mailto:${studioInfo.email}`,
    },
    {
      icon: Clock,
      label: t.contact.hours,
      value: studioInfo.hours,
    },
  ];

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      <SectionHeading
        eyebrow={t.contact.eyebrow}
        title={
          <>
            {t.contact.title1}{" "}
            <span className="gold-gradient">{t.contact.title2}</span>
          </>
        }
        subtitle={t.contact.subtitle}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
        {/* Contact Form - Slide in Left */}
        <motion.div
          initial={{ opacity: 0, x: -60, scale: 0.97 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-3"
        >
          <div className="p-6 sm:p-8 rounded-3xl border border-border bg-surface shadow-[0_4px_30px_rgba(0,0,0,0.25)] hover:border-gold-400/50 transition-colors">
            <ContactForm prefilledService={prefilledService} />
          </div>
        </motion.div>

        {/* Contact Info Cards - Slide in Right with Stagger */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-2 space-y-4"
        >
          {contactInfo.map(({ icon: Icon, label, value, href }, index) => {
            const content = (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-surface hover:border-gold-400/50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)] group"
              >
                <span className="flex items-center justify-center w-11 h-11 rounded-xl gold-gradient-bg shrink-0 shadow-[0_0_15px_rgba(219,168,53,0.3)] group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-on-gold" />
                </span>
                <div className="min-w-0">
                  <p className="text-gold-400 text-xs font-semibold tracking-widest uppercase mb-1">
                    {label}
                  </p>
                  <p className="text-ink-50 font-medium break-words group-hover:text-gold-300 transition-colors">
                    {value}
                  </p>
                </div>
              </motion.div>
            );
            return href ? (
              <a key={label} href={href} className="block">
                {content}
              </a>
            ) : (
              <div key={label}>{content}</div>
            );
          })}
        </motion.div>
      </div>

      {/* Map - Immerge and Pop-up Scale */}
      <motion.div
        id="map"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="mt-16 rounded-3xl overflow-hidden border border-border bg-surface shadow-2xl"
      >
        <iframe
          src={studioInfo.mapEmbed}
          width="100%"
          height="420"
          style={{
            border: 0,
            filter:
              mounted && theme === "dark"
                ? "invert(0.9) hue-rotate(180deg)"
                : "none",
          }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Beclassic Photography Location"
          allowFullScreen
        />
      </motion.div>
    </div>
  );
}
