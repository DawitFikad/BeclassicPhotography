"use client";

import { useState, useMemo, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Crown,
  FileDown,
  Send,
  MessageCircle,
  Sparkles,
  Layers,
  Heart,
  Palette,
  Camera,
  Calendar,
  CheckCircle2,
  Trash2,
  Printer,
  ChevronRight,
  Info,
  AlertCircle,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { studioInfo } from "@/lib/data";
import { Toast, type ToastMessage } from "@/components/ui/Toast";
import { useLanguage } from "@/components/providers/LanguageProvider";

export type QuoteStyle = "classic" | "romance" | "olive";

interface BuilderPackageItem {
  id: string;
  name: string;
  category: "Wedding Packages" | "Ceremony Photo & Video" | "Special Event Packages" | "Additional Services";
  price: string;
  priceNumber: number;
  subtitle: string;
  bullets: string[];
  image: string;
}

const BUILDER_PACKAGES: BuilderPackageItem[] = [
  // 1. Wedding Packages
  {
    id: "studio-landscape-premium",
    name: "Studio & Landscape Premium",
    category: "Wedding Packages",
    price: "85,000 birr",
    priceNumber: 85000,
    subtitle: "Complete premium package with signing board included",
    bullets: [
      "Two 30×60 Laminated Albums",
      "Three Different Size Canvas Boards for Wall",
      "One Signing Board OR Sign Book",
    ],
    image: "/images/wedding/wedding-1.jpg",
  },
  {
    id: "studio-landscape-standard",
    name: "Studio & Landscape Standard",
    category: "Wedding Packages",
    price: "70,000 birr",
    priceNumber: 70000,
    subtitle: "Quality package with essential photo products",
    bullets: [
      "Two 30×60 Laminated Albums",
      "Three 50×50 Canvas Boards for Wall",
    ],
    image: "/images/wedding/wedding-2.jpg",
  },
  {
    id: "landscape-package",
    name: "Landscape Package",
    category: "Wedding Packages",
    price: "50,000 birr",
    priceNumber: 50000,
    subtitle: "Focused on beautiful outdoor photography",
    bullets: [
      "One 30×60 Laminated Album",
      "Two 60×60 Canvas Boards for Wall",
    ],
    image: "/images/hero/hero-2.jpg",
  },

  // 2. Ceremony Photo & Video
  {
    id: "ceremony-with-drone",
    name: "Ceremony Photo & Video (With Drone)",
    category: "Ceremony Photo & Video",
    price: "220,000 birr",
    priceNumber: 220000,
    subtitle: "Ultimate ceremony coverage with drone",
    bullets: [
      "One Full Day Coverage",
      "Location: A.A",
      "30×90 cm Album (15 pages)",
    ],
    image: "/images/hero/hero-4.jpg",
  },
  {
    id: "ceremony-standard",
    name: "Ceremony Photo & Video",
    category: "Ceremony Photo & Video",
    price: "170,000 birr",
    priceNumber: 170000,
    subtitle: "Complete ceremony coverage with premium quality",
    bullets: [
      "One Full Day Coverage",
      "Location: A.A",
      "30×90 cm Album (15 pages)",
    ],
    image: "/images/wedding/wedding-3.jpg",
  },
  {
    id: "melse-kelekel-premium",
    name: "Melse or Kelekel Premium",
    category: "Ceremony Photo & Video",
    price: "85,000 birr",
    priceNumber: 85000,
    subtitle: "Event-based package for one day coverage",
    bullets: [
      "Photo: 1 CAMERA",
      "Video: 2 CAMERA",
      "Album: 1 30X60 CM ALBUM",
    ],
    image: "/images/wedding/wedding-5.jpg",
  },
  {
    id: "melse-kelekel-standard",
    name: "Melse or Kelekel Standard",
    category: "Ceremony Photo & Video",
    price: "70,000 birr",
    priceNumber: 70000,
    subtitle: "Event-based package for one day coverage",
    bullets: [
      "Photo: 1 CAMERA",
      "Video: 1 CAMERA",
      "Album: 1 30X60 CM ALBUM",
    ],
    image: "/images/wedding/wedding-6.jpg",
  },

  // 3. Special Event Packages
  {
    id: "melse-special",
    name: "MELSE",
    category: "Special Event Packages",
    price: "55,000 birr",
    priceNumber: 55000,
    subtitle: "Special event coverage package",
    bullets: [
      "Photo: 1 CAMERA",
      "Video: 1 CAMERA",
      "Album: 1 30X60",
    ],
    image: "/images/wedding/wedding-4.jpg",
  },
  {
    id: "shimgelena-special",
    name: "SHIMGELENA",
    category: "Special Event Packages",
    price: "55,000 birr",
    priceNumber: 55000,
    subtitle: "Special event coverage package",
    bullets: [
      "Photo: 1 CAMERA",
      "Video: 1 CAMERA",
      "Album: 1 30X60",
    ],
    image: "/images/wedding/wedding-7.jpg",
  },
  {
    id: "pre-wedding-special",
    name: "PRE WEDDING",
    category: "Special Event Packages",
    price: "40,000 birr",
    priceNumber: 40000,
    subtitle: "Special event coverage package",
    bullets: [
      "Photo: 1 CAMERA",
      "Video: 1 CAMERA",
      "Album: 1 30X60",
    ],
    image: "/images/hero/hero-3.jpg",
  },
  {
    id: "kelkel-special",
    name: "KELKEL",
    category: "Special Event Packages",
    price: "40,000 birr",
    priceNumber: 40000,
    subtitle: "Special event coverage package",
    bullets: [
      "Photo: 1 CAMERA",
      "Video: 1 CAMERA",
      "Album: 1 30X60",
    ],
    image: "/images/wedding/wedding-8.jpg",
  },

  // 4. Additional Services
  {
    id: "landscape-video-addon",
    name: "LANDSCAPE VIDEO",
    category: "Additional Services",
    price: "25,000 birr",
    priceNumber: 25000,
    subtitle: "Additional service add-on",
    bullets: ["Cinematic landscape video production"],
    image: "/images/commercial/commercial-1.jpg",
  },
  {
    id: "landscape-day-photoshoot-addon",
    name: "LANDSCAPE DAY PHOTOSHOOT",
    category: "Additional Services",
    price: "20,000 birr",
    priceNumber: 20000,
    subtitle: "Additional service add-on",
    bullets: ["Full day scenic outdoor photoshoot"],
    image: "/images/commercial/commercial-2.png",
  },
];

const CATEGORIES = [
  "Wedding Packages",
  "Ceremony Photo & Video",
  "Special Event Packages",
  "Additional Services",
] as const;

function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed || trimmed.length > 254) return false;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) return false;
  const parts = trimmed.split("@");
  if (parts.length !== 2) return false;
  const domainParts = parts[1].split(".");
  return domainParts.length >= 2 && domainParts[domainParts.length - 1].length >= 2;
}

function isValidPhone(phone: string): boolean {
  const trimmed = phone.trim();
  if (!trimmed) return false;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

export function PackageBuilder() {
  const { lang } = useLanguage();
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "studio-landscape-premium",
  ]);
  const [quoteStyle, setQuoteStyle] = useState<QuoteStyle>("classic");

  // Client Details Form State
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [eventType, setEventType] = useState("Wedding");
  const [eventDate, setEventDate] = useState("");
  const [extraNotes, setExtraNotes] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const togglePackage = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    if (errors.packages) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.packages;
        return next;
      });
    }
  };

  const clearFieldError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const selectedPackages = useMemo(
    () => BUILDER_PACKAGES.filter((p) => selectedIds.includes(p.id)),
    [selectedIds]
  );

  const totalInvestment = useMemo(
    () => selectedPackages.reduce((sum, p) => sum + p.priceNumber, 0),
    [selectedPackages]
  );

  // Quote style themes config
  const styleConfig = {
    classic: {
      name: "Classic",
      tagline: "Elegant neutral tones",
      accentHex: "#dba835",
      badgeClass: "bg-gold-400/10 text-gold-400 border-gold-400/40",
      borderClass: "border-gold-400/50",
      pdfHeaderBg: "#18191c",
      pdfAccent: "#dba835",
    },
    romance: {
      name: "Romance",
      tagline: "Soft blush-inspired look",
      accentHex: "#e09893",
      badgeClass: "bg-rose-400/10 text-rose-300 border-rose-400/40",
      borderClass: "border-rose-400/50",
      pdfHeaderBg: "#23181a",
      pdfAccent: "#e09893",
    },
    olive: {
      name: "Olive",
      tagline: "Warm earthy presentation",
      accentHex: "#8ea65f",
      badgeClass: "bg-emerald-400/10 text-emerald-300 border-emerald-400/40",
      borderClass: "border-emerald-400/50",
      pdfHeaderBg: "#182017",
      pdfAccent: "#8ea65f",
    },
  }[quoteStyle];

  // Print/Download PDF Quote
  const handleDownloadPDF = () => {
    if (selectedPackages.length === 0) {
      setToast({
        type: "error",
        title: "No packages selected",
        description: "Please select at least one package before generating a PDF quote.",
      });
      return;
    }
    window.print();
  };

  const validateBuilderForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Client Name (mandatory)
    if (!clientName.trim()) {
      newErrors.clientName = "Please enter your name.";
    } else if (clientName.trim().length < 2) {
      newErrors.clientName = "Name must be at least 2 characters.";
    }

    // 2. Client Phone (mandatory)
    if (!clientPhone.trim()) {
      newErrors.clientPhone = "Please enter your phone number.";
    } else if (!isValidPhone(clientPhone)) {
      newErrors.clientPhone =
        "Please enter a valid phone number (e.g., 091 234 5678).";
    }

    // 3. Client Email (mandatory & strictly validated)
    if (!clientEmail.trim()) {
      newErrors.clientEmail = "Please enter your email address.";
    } else if (!isValidEmail(clientEmail)) {
      newErrors.clientEmail =
        "Please enter a valid email address (e.g., name@example.com).";
    }

    // 4. Event Type (mandatory)
    if (!eventType.trim()) {
      newErrors.eventType = "Please specify your event type.";
    }

    // 5. Event Date (mandatory)
    if (!eventDate.trim()) {
      newErrors.eventDate = "Please select your event date.";
    }

    // 6. Selected Packages (mandatory)
    if (selectedPackages.length === 0) {
      newErrors.packages = "Please select at least one package.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit via Web3Forms API
  const handleSubmitQuote = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateBuilderForm()) {
      setToast({
        type: "error",
        title: "Please check required fields",
        description: "Please fill out all mandatory fields and enter a valid email address.",
      });
      return;
    }

    setLoading(true);
    setToast(null);

    try {
      const packageSummary = selectedPackages
        .map((p) => `${p.name} (${p.price})`)
        .join(", ");

      const packageDetails = selectedPackages
        .map(
          (p) =>
            `• [${p.category}] ${p.name} - ${p.price}\n  Inclusions: ${p.bullets.join(", ")}`
        )
        .join("\n\n");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key:
            process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
            "a68e062e-a8ea-49d3-b46e-ca8dc324bfdc",
          subject: `Package Builder Quote from ${clientName} (${eventType}) — ${totalInvestment.toLocaleString()} birr`,
          from_name: clientName,
          replyto: clientEmail,
          name: clientName,
          email: clientEmail,
          phone: clientPhone,
          event_type: eventType,
          event_date: eventDate,
          quote_style: styleConfig.name,
          packages_count: selectedPackages.length,
          selected_packages: packageSummary,
          packages_breakdown: packageDetails,
          total_investment: `${totalInvestment.toLocaleString()} birr`,
          extra_notes: extraNotes || "None",
        }),
      });

      const data = await res.json();

      if (data.success) {
        // RESET FORM TO CLEAN, FRESH STATE
        setClientName("");
        setClientPhone("");
        setClientEmail("");
        setEventType("Wedding");
        setEventDate("");
        setExtraNotes("");
        setSelectedIds([]);
        setErrors({});
        setSubmitted(true);

        setToast({
          type: "success",
          title: "Quote Sent Successfully!",
          description: "Our team will review your selection and contact you within 24 hours.",
        });
      } else {
        setToast({
          type: "error",
          title: "Submission failed",
          description: data.message || "Please check your network or try again.",
        });
      }
    } catch {
      setToast({
        type: "error",
        title: "Network error",
        description: "Unable to reach submission server. You can also send via WhatsApp.",
      });
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Beclassic Photography! Here is my custom quote selection:\n\nClient: ${
      clientName || "Client"
    }\nEvent: ${eventType} (${eventDate || "Date TBD"})\nStyle: ${
      styleConfig.name
    }\n\nSelected Packages:\n${selectedPackages
      .map((p) => `• ${p.name} - ${p.price}`)
      .join("\n")}\n\nTotal Estimate: ${totalInvestment.toLocaleString()} birr\nNotes: ${
      extraNotes || "None"
    }\n\nPlease let me know your availability!`
  );

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Main Interactive App Container */}
      <div className="pt-24 sm:pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 print:hidden">
        {/* Page Title & Intro */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-400/40 bg-gold-400/5 mb-4 text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Quote Configurator</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-ink-50 mb-4 tracking-tight">
            Package <span className="gold-gradient">Builder</span>
          </h1>

          <p className="text-ink-300 text-base sm:text-lg leading-relaxed font-light">
            Select the packages you’re interested in and download a PDF quote to send to us.
          </p>
        </div>

        {/* 1. Quote Style Selection */}
        <div className="mb-14">
          <div className="flex items-center gap-2.5 mb-4">
            <Palette className="w-5 h-5 text-gold-400" />
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink-50">
              Quote style
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Classic */}
            <button
              type="button"
              onClick={() => setQuoteStyle("classic")}
              className={`p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden ${
                quoteStyle === "classic"
                  ? "border-gold-400 bg-gold-400/10 shadow-[0_0_25px_rgba(219,168,53,0.25)]"
                  : "border-border bg-surface hover:border-gold-400/40"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-100">
                  Classic
                </span>
                <span className="w-4 h-4 rounded-full border border-gold-400 flex items-center justify-center">
                  {quoteStyle === "classic" && (
                    <span className="w-2 h-2 rounded-full bg-gold-400" />
                  )}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                Elegant neutral tones
              </p>
            </button>

            {/* Romance */}
            <button
              type="button"
              onClick={() => setQuoteStyle("romance")}
              className={`p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden ${
                quoteStyle === "romance"
                  ? "border-rose-400 bg-rose-400/10 shadow-[0_0_25px_rgba(224,152,147,0.25)]"
                  : "border-border bg-surface hover:border-rose-400/40"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-100">
                  Romance
                </span>
                <span className="w-4 h-4 rounded-full border border-rose-400 flex items-center justify-center">
                  {quoteStyle === "romance" && (
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                  )}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                Soft blush-inspired look
              </p>
            </button>

            {/* Olive */}
            <button
              type="button"
              onClick={() => setQuoteStyle("olive")}
              className={`p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden ${
                quoteStyle === "olive"
                  ? "border-emerald-400 bg-emerald-400/10 shadow-[0_0_25px_rgba(142,166,95,0.25)]"
                  : "border-border bg-surface hover:border-emerald-400/40"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-100">
                  Olive
                </span>
                <span className="w-4 h-4 rounded-full border border-emerald-400 flex items-center justify-center">
                  {quoteStyle === "olive" && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  )}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                Warm earthy presentation
              </p>
            </button>
          </div>
        </div>

        {/* 2. Visual Preview (Collage) */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <Camera className="w-5 h-5 text-gold-400" />
              <h2 className="font-display text-xl sm:text-2xl font-bold text-ink-50">
                Visual preview
              </h2>
            </div>
            <span className="text-xs font-mono text-gold-400 px-3 py-1 rounded-full border border-gold-400/30 bg-gold-400/5">
              {selectedPackages.length} {selectedPackages.length === 1 ? "image" : "images"} selected
            </span>
          </div>

          {selectedPackages.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink-800 bg-surface/50 p-12 text-center">
              <Camera className="w-10 h-10 text-ink-500 mx-auto mb-3" />
              <p className="text-ink-400 text-sm sm:text-base">
                Select packages to see a visual collage of your quote.
              </p>
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-surface p-4 sm:p-6 shadow-xl">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {selectedPackages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative aspect-[4/5] rounded-xl overflow-hidden border border-ink-800 group"
                  >
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-2.5 flex flex-col justify-end">
                      <span className="text-[11px] font-bold text-white leading-tight line-clamp-1">
                        {pkg.name}
                      </span>
                      <span className="text-[10px] font-mono text-gold-300 font-semibold">
                        {pkg.price}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. Package Selection by Categories */}
        <div className="space-y-12 mb-16">
          {CATEGORIES.map((catName) => {
            const catPackages = BUILDER_PACKAGES.filter(
              (p) => p.category === catName
            );

            return (
              <div key={catName} className="space-y-4">
                <div className="flex items-center justify-between border-b border-ink-800 pb-3">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-ink-50">
                    {catName}
                  </h3>
                  <span className="text-xs text-ink-400 font-mono">
                    {catPackages.length} Options
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {catPackages.map((pkg) => {
                    const isSelected = selectedIds.includes(pkg.id);

                    return (
                      <div
                        key={pkg.id}
                        onClick={() => togglePackage(pkg.id)}
                        className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "border-gold-400 bg-surface shadow-[0_0_25px_rgba(219,168,53,0.22)] scale-[1.01]"
                            : "border-border bg-surface hover:border-gold-400/40"
                        }`}
                      >
                        {/* Image Header with Price Badge */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden">
                          <Image
                            src={pkg.image}
                            alt={pkg.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-black/75 backdrop-blur text-gold-300 border border-gold-400/30">
                              {pkg.price}
                            </span>
                          </div>

                          {/* Checkmark bubble */}
                          <div className="absolute top-3 right-3">
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                                isSelected
                                  ? "gold-gradient-bg text-on-gold shadow-md"
                                  : "bg-black/60 text-white/50 border border-white/20"
                              }`}
                            >
                              <Check className="w-4 h-4" strokeWidth={3} />
                            </div>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-display text-lg font-bold text-ink-50 mb-1">
                              {pkg.name}
                            </h4>
                            <p className="text-xs text-ink-400 leading-relaxed mb-4">
                              {pkg.subtitle}
                            </p>

                            <ul className="space-y-1.5 mb-5">
                              {pkg.bullets.map((bullet, bi) => (
                                <li
                                  key={bi}
                                  className="text-xs text-ink-200 flex items-start gap-2"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0 mt-1.5" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePackage(pkg.id);
                            }}
                            className={`w-full py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                              isSelected
                                ? "gold-gradient-bg text-on-gold shadow-md"
                                : "border border-ink-700 hover:border-gold-400 text-ink-200 hover:text-gold-300"
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{isSelected ? "Selected" : "Select Package"}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. Client Details ("Your selection") & Live Quote Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Client Details Form (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 border border-border bg-surface shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-gold-400" />
              <h3 className="font-display text-xl sm:text-2xl font-bold text-ink-50">
                Your selection
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-ink-400 mb-6">
              Enter your event details to generate your customized quote and submit availability check.
            </p>

            {/* Success Banner when Form has Been Submitted & Freshly Cleared */}
            {submitted && (
              <div className="p-4 sm:p-5 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 text-emerald-200 mb-6 flex items-start justify-between gap-3 shadow-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-white">
                      Quote Request Sent Successfully!
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-300/90 mt-0.5">
                      Thank you! Your custom quote request has been sent to Beclassic Photography. We will get in touch within 24 hours.
                    </p>
                    <span className="inline-block mt-2 text-[11px] font-mono text-emerald-300 bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                      ✓ Form cleared & fresh for another submission
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-emerald-400 hover:text-white transition-colors p-1"
                  aria-label="Dismiss banner"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <form onSubmit={handleSubmitQuote} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
                    Your name *
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                      clearFieldError("clientName");
                    }}
                    placeholder="Bride & Groom / Client"
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition-colors focus:outline-none ${
                      errors.clientName
                        ? "bg-rose-500/10 border border-rose-500 text-rose-50 placeholder:text-rose-300/60 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/50"
                        : "bg-white dark:bg-[#18191c] border border-zinc-300 dark:border-ink-700 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 shadow-sm"
                    }`}
                  />
                  {errors.clientName && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.clientName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
                    Phone number *
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => {
                      setClientPhone(e.target.value);
                      clearFieldError("clientPhone");
                    }}
                    placeholder="091 234 5678"
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition-colors focus:outline-none ${
                      errors.clientPhone
                        ? "bg-rose-500/10 border border-rose-500 text-rose-50 placeholder:text-rose-300/60 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/50"
                        : "bg-white dark:bg-[#18191c] border border-zinc-300 dark:border-ink-700 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 shadow-sm"
                    }`}
                  />
                  {errors.clientPhone && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.clientPhone}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
                    Email address *
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => {
                      setClientEmail(e.target.value);
                      clearFieldError("clientEmail");
                    }}
                    placeholder="name@example.com"
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition-colors focus:outline-none ${
                      errors.clientEmail
                        ? "bg-rose-500/10 border border-rose-500 text-rose-50 placeholder:text-rose-300/60 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/50"
                        : "bg-white dark:bg-[#18191c] border border-zinc-300 dark:border-ink-700 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 shadow-sm"
                    }`}
                  />
                  {errors.clientEmail && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.clientEmail}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
                    Event type *
                  </label>
                  <input
                    type="text"
                    value={eventType}
                    onChange={(e) => {
                      setEventType(e.target.value);
                      clearFieldError("eventType");
                    }}
                    placeholder="Wedding, Melse, Pre-Wedding..."
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition-colors focus:outline-none ${
                      errors.eventType
                        ? "bg-rose-500/10 border border-rose-500 text-rose-50 placeholder:text-rose-300/60 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/50"
                        : "bg-white dark:bg-[#18191c] border border-zinc-300 dark:border-ink-700 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 shadow-sm"
                    }`}
                  />
                  {errors.eventType && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.eventType}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
                  Event date *
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => {
                    setEventDate(e.target.value);
                    clearFieldError("eventDate");
                  }}
                  placeholder="mm/dd/yyyy"
                  className={`w-full rounded-xl px-4 py-2.5 text-sm transition-colors focus:outline-none ${
                    errors.eventDate
                      ? "bg-rose-500/10 border border-rose-500 text-rose-50 placeholder:text-rose-300/60 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/50"
                      : "bg-white dark:bg-[#18191c] border border-zinc-300 dark:border-ink-700 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 shadow-sm"
                  }`}
                />
                {errors.eventDate && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.eventDate}</span>
                  </p>
                )}
              </div>

              {/* Multi-Package Selection Inside Form */}
              <div
                className={`pt-3 pb-3 border-t border-b ${
                  errors.packages
                    ? "border-rose-500/80 bg-rose-500/5 p-3 rounded-2xl"
                    : "border-zinc-300 dark:border-ink-800"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                  <label className="block text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Selected Packages ({selectedPackages.length}) *
                  </label>
                  <span className="text-xs font-mono font-bold text-gold-500 dark:text-gold-400">
                    Estimated Total: {totalInvestment.toLocaleString()} birr
                  </span>
                </div>
                {errors.packages && (
                  <p className="text-xs text-rose-400 mb-2 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.packages}</span>
                  </p>
                )}
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mb-3">
                  Toggle or customize which packages to include in this quote request:
                </p>

                {/* Selected Package Badges / Chips */}
                {selectedPackages.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {selectedPackages.map((pkg) => (
                      <span
                        key={pkg.id}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-gold-400/50 bg-gold-400/10 text-gold-800 dark:text-gold-200"
                      >
                        <span className="truncate max-w-[140px] sm:max-w-none">{pkg.name}</span>
                        <span className="font-mono text-[10px] text-gold-600 dark:text-gold-400 font-bold">
                          {pkg.price}
                        </span>
                        <button
                          type="button"
                          onClick={() => togglePackage(pkg.id)}
                          className="hover:text-rose-500 transition-colors ml-0.5"
                          aria-label={`Remove ${pkg.name}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Package Select Grid Inside the Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[290px] overflow-y-auto pr-1">
                  {BUILDER_PACKAGES.map((pkg) => {
                    const isSelected = selectedIds.includes(pkg.id);
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => togglePackage(pkg.id)}
                        className={`text-left p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-2.5 ${
                          isSelected
                            ? "border-gold-400 bg-gold-400/15 shadow-sm"
                            : "border-zinc-300 dark:border-ink-800 bg-zinc-50 dark:bg-ink-900/60 hover:border-gold-400/40 hover:bg-zinc-100 dark:hover:bg-ink-800/40"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Image preview thumbnail */}
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-zinc-200 dark:border-ink-800">
                            <Image
                              src={pkg.image}
                              alt={pkg.name}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          </div>

                          <div className="truncate">
                            <div
                              className={`text-xs font-semibold truncate ${
                                isSelected ? "text-gold-600 dark:text-gold-200" : "text-zinc-900 dark:text-white"
                              }`}
                            >
                              {pkg.name}
                            </div>
                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-mono">
                              {pkg.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`text-[11px] font-mono font-bold ${
                              isSelected ? "text-gold-600 dark:text-gold-300" : "text-zinc-800 dark:text-zinc-300"
                            }`}
                          >
                            {pkg.price}
                          </span>
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                              isSelected
                                ? "gold-gradient-bg text-on-gold"
                                : "border border-zinc-400 dark:border-ink-600 bg-zinc-200 dark:bg-ink-800 text-transparent"
                            }`}
                          >
                            <Check className="w-3 h-3" strokeWidth={3} />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
                  Extra notes
                </label>
                <textarea
                  rows={3}
                  value={extraNotes}
                  onChange={(e) => setExtraNotes(e.target.value)}
                  placeholder="Any custom request for your quote"
                  className="w-full bg-white dark:bg-[#18191c] border border-zinc-300 dark:border-ink-700 rounded-xl px-4 py-2.5 text-sm text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 shadow-sm resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 gold-gradient-bg text-on-gold py-3.5 px-6 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_30px_rgba(219,168,53,0.5)] transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span>Sending quote request...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Quote to Beclassic Photography</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="px-6 py-3.5 rounded-full border border-gold-400/60 bg-gold-400/10 text-gold-300 hover:bg-gold-400 hover:text-on-gold font-bold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download PDF Quote</span>
                </button>
              </div>
            </form>
          </div>

          {/* Real-time Live Quote Summary (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 border border-gold-400/50 bg-surface shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-gold-400 font-semibold">
                Quote Breakdown
              </span>
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${styleConfig.badgeClass}`}>
                {styleConfig.name} Style
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold text-ink-50 mb-1">
              Estimated Total
            </h3>
            <div className="font-display text-3xl sm:text-4xl font-black text-ink-50 gold-gradient mb-4">
              {totalInvestment.toLocaleString()} birr
            </div>

            {/* Selected Items List */}
            <div className="border-t border-ink-800 pt-4 mb-6 space-y-3 max-h-[260px] overflow-y-auto pr-1">
              {selectedPackages.length === 0 ? (
                <p className="text-xs text-ink-400 italic">
                  Select packages from the list to build your quote.
                </p>
              ) : (
                selectedPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="flex items-start justify-between gap-3 text-xs p-2.5 rounded-xl bg-ink-900/60 border border-ink-800"
                  >
                    <div>
                      <div className="font-semibold text-ink-100">{pkg.name}</div>
                      <div className="text-[10px] text-ink-400">{pkg.category}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono font-bold text-gold-300">
                        {pkg.price}
                      </span>
                      <button
                        type="button"
                        onClick={() => togglePackage(pkg.id)}
                        className="text-ink-500 hover:text-rose-400 transition-colors"
                        aria-label={`Remove ${pkg.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Action buttons inside summary */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="w-full py-3 rounded-full border border-gold-400 bg-gold-400 text-on-gold font-bold text-sm shadow-md hover:shadow-[0_0_20px_rgba(219,168,53,0.5)] transition-all flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Download / Print PDF Quote</span>
              </button>

              <a
                href={`https://wa.me/${studioInfo.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share Quote on WhatsApp</span>
              </a>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-ink-900/40 border border-ink-800 text-[11px] text-ink-400 leading-relaxed">
              <span className="text-gold-400 font-semibold block mb-0.5">
                Next Steps:
              </span>
              Send the downloaded PDF to us via email or our contact page to confirm your selection.
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* EXCLUSIVE PRINT-ONLY LUXURY PDF QUOTE TEMPLATE (@media print) */}
      {/* ========================================================= */}
      <div id="printable-quote" className="hidden print:block p-8 bg-white text-black font-sans">
        {/* Print Header */}
        <div className="border-b-2 pb-6 mb-6 flex justify-between items-start" style={{ borderColor: styleConfig.accentHex }}>
          <div>
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: styleConfig.accentHex }}>
              Beclassic Photography
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Addis Ababa, Ethiopia • Bole Road, Near Edna Mall
            </p>
            <p className="text-xs text-gray-500">
              Tel: 093 251 2720 / +251 91 234 5678 • Email: contact@timelessmoments.com
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs uppercase font-mono tracking-widest text-gray-500 block">
              Official Quotation
            </span>
            <span className="text-lg font-bold">
              {styleConfig.name} Style
            </span>
            <span className="text-xs text-gray-500 block mt-1">
              Date: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Client & Event Info Table */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-gray-500 block">Client / Couple Name:</span>
              <strong className="text-sm">{clientName || "Honored Client"}</strong>
            </div>
            <div>
              <span className="text-gray-500 block">Phone Number:</span>
              <strong className="text-sm">{clientPhone || "Not specified"}</strong>
            </div>
            <div>
              <span className="text-gray-500 block">Event Type:</span>
              <strong className="text-sm">{eventType || "Wedding"}</strong>
            </div>
            <div>
              <span className="text-gray-500 block">Event Date:</span>
              <strong className="text-sm">{eventDate || "Date to be confirmed"}</strong>
            </div>
          </div>
        </div>

        {/* Selected Packages Table */}
        <div className="mb-6">
          <h2 className="text-base font-bold mb-3 border-b pb-1">
            Selected Photography & Videography Packages
          </h2>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b bg-gray-100 text-left">
                <th className="py-2 px-3 font-semibold">Package Name</th>
                <th className="py-2 px-3 font-semibold">Category</th>
                <th className="py-2 px-3 font-semibold">Key Deliverables</th>
                <th className="py-2 px-3 font-semibold text-right">Price (ETB)</th>
              </tr>
            </thead>
            <tbody>
              {selectedPackages.map((pkg, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-2.5 px-3 font-bold">{pkg.name}</td>
                  <td className="py-2.5 px-3 text-gray-600">{pkg.category}</td>
                  <td className="py-2.5 px-3 text-gray-600">
                    {pkg.bullets.join(" • ")}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-right">{pkg.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notes & Grand Total */}
        <div className="flex justify-between items-start mb-8 pt-2">
          <div className="max-w-md text-xs text-gray-600">
            <span className="font-bold text-gray-800 block mb-1">Client Notes:</span>
            <p className="bg-gray-50 p-2.5 rounded border border-gray-200">
              {extraNotes || "Standard package deliverables as outlined."}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs uppercase text-gray-500 block">Grand Total Investment:</span>
            <span className="text-2xl font-black" style={{ color: styleConfig.accentHex }}>
              {totalInvestment.toLocaleString()} birr
            </span>
          </div>
        </div>

        {/* Footer Notice */}
        <div className="border-t pt-4 text-[11px] text-gray-500 text-center leading-relaxed">
          <p>
            Thank you for choosing Beclassic Photography. To confirm booking, please send this quotation via email to{" "}
            <strong>contact@timelessmoments.com</strong> or call <strong>093 251 2720</strong>.
          </p>
          <p className="mt-1 font-mono text-[10px]">
            Grace Plaza | Atlas, Namibia St, Addis Ababa, Ethiopia
          </p>
        </div>
      </div>
    </>
  );
}
