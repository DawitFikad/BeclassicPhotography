"use client";

import { useState, useMemo, useEffect, type FormEvent } from "react";
import {
  Send,
  CheckCircle2,
  Check,
  X,
  Layers,
  AlertCircle,
} from "lucide-react";
import { useSiteContent } from "@/components/providers/SiteContentProvider";
import { Toast, type ToastMessage } from "@/components/ui/Toast";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface ContactFormProps {
  prefilledService?: string;
}

// Combine packages and add-ons for selectable options
interface SelectableOption {
  id: string;
  name: string;
  priceString: string;
  priceNumber: number;
  category: string;
}

function parseBirrPrice(priceStr: string): number {
  const match = priceStr.replace(/,/g, "").match(/(\d+)/);
  return match ? parseInt(match[0], 10) : 0;
}

/**
 * Strict RFC 5322 compatible email validator:
 * Disallows improper emails like "test", "test@", "test@com", "@test.com", "test@domain."
 */
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

/**
 * Validates international and local Ethiopian phone formats (9 to 15 digits)
 */
function isValidPhone(phone: string): boolean {
  const trimmed = phone.trim();
  if (!trimmed) return false;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

export function ContactForm({ prefilledService = "" }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t, lang } = useLanguage();
  const { packages, additionalServices } = useSiteContent();

  // All available packages & add-ons
  const allSelectableOptions: SelectableOption[] = useMemo(() => {
    const pkgItems: SelectableOption[] = packages.map((p) => ({
      id: p.id,
      name: p.name,
      priceString: p.price,
      priceNumber: parseBirrPrice(p.price),
      category: p.category,
    }));

    const addonItems: SelectableOption[] = additionalServices.map((a) => ({
      id: a.id,
      name: a.name,
      priceString: a.price,
      priceNumber: parseBirrPrice(a.price),
      category: "Additional Services",
    }));

    return [...pkgItems, ...addonItems];
  }, [packages, additionalServices]);

  // Multi-package selection state
  const [selectedPackageNames, setSelectedPackageNames] = useState<string[]>([]);

  // Initialize with prefilledService if provided
  useEffect(() => {
    if (!prefilledService) return;
    const splitNames = prefilledService
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    setSelectedPackageNames((prev) => {
      const merged = Array.from(new Set([...prev, ...splitNames]));
      return merged;
    });
  }, [prefilledService]);

  const togglePackage = (name: string) => {
    setSelectedPackageNames((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
    if (errors.packages) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.packages;
        return next;
      });
    }
  };

  const removePackage = (name: string) => {
    setSelectedPackageNames((prev) => prev.filter((n) => n !== name));
  };

  // Calculate total price of selected packages
  const totalEstimatedPrice = useMemo(() => {
    return selectedPackageNames.reduce((sum, name) => {
      const found = allSelectableOptions.find(
        (opt) => opt.name.toLowerCase() === name.toLowerCase()
      );
      return sum + (found ? found.priceNumber : 0);
    }, 0);
  }, [selectedPackageNames, allSelectableOptions]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    weddingDate: "",
    weddingLocation: "",
    message: "",
  });

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Name validation (mandatory)
    if (!form.name.trim()) {
      newErrors.name =
        lang === "am" ? "እባክዎን ሙሉ ስምዎን ያስገቡ" : "Please enter your name.";
    } else if (form.name.trim().length < 2) {
      newErrors.name =
        lang === "am"
          ? "ስም ቢያንስ 2 ፊደላት መሆን አለበት"
          : "Name must be at least 2 characters.";
    }

    // 2. Email validation (mandatory & valid format)
    if (!form.email.trim()) {
      newErrors.email =
        lang === "am"
          ? "እባክዎን የኢሜይል አድራሻዎን ያስገቡ"
          : "Please enter your email address.";
    } else if (!isValidEmail(form.email)) {
      newErrors.email =
        lang === "am"
          ? "እባክዎን ትክክለኛ የኢሜይል አድራሻ ያስገቡ (ምሳሌ፡ name@example.com)"
          : "Please enter a valid email address (e.g., name@example.com).";
    }

    // 3. Phone validation (mandatory & valid format)
    if (!form.phone.trim()) {
      newErrors.phone =
        lang === "am"
          ? "እባክዎን የስልክ ቁጥርዎን ያስገቡ"
          : "Please enter your phone number.";
    } else if (!isValidPhone(form.phone)) {
      newErrors.phone =
        lang === "am"
          ? "እባክዎን ትክክለኛ የስልክ ቁጥር ያስገቡ (ምሳሌ፡ 091 234 5678)"
          : "Please enter a valid phone number (e.g., 091 234 5678).";
    }

    // 4. Wedding Date validation (mandatory)
    if (!form.weddingDate.trim()) {
      newErrors.weddingDate =
        lang === "am"
          ? "እባክዎን የሰርግዎን ቀን ይምረጡ"
          : "Please select your wedding date.";
    }

    // 5. Wedding Location validation (mandatory)
    if (!form.weddingLocation.trim()) {
      newErrors.weddingLocation =
        lang === "am"
          ? "እባክዎን የሰርግ ቦታዎን ያስገቡ"
          : "Please specify your wedding location.";
    }

    // 6. Package Selection (mandatory)
    if (selectedPackageNames.length === 0) {
      newErrors.packages =
        lang === "am"
          ? "እባክዎን ቢያንስ አንድ ፓኬጅ ይምረጡ"
          : "Please select at least one package.";
    }

    // 7. Message validation (mandatory)
    if (!form.message.trim()) {
      newErrors.message =
        lang === "am"
          ? "እባክዎን ስለ ልዩ ቀንዎ አጭር መግለጫ ይጻፉ"
          : "Please tell us about your wedding day and schedule.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setToast({
        type: "error",
        title: lang === "am" ? "ያልተሟላ መረጃ" : "Please check required fields",
        description:
          lang === "am"
            ? "እባክዎን የተጠየቁትን ሁሉንም አስፈላጊ መረጃዎች በትክክል ይሙሉ"
            : "Please fill out all mandatory fields with valid information.",
      });
      return;
    }

    setLoading(true);
    setToast(null);

    const packagesList = selectedPackageNames.join(", ");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key:
            process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
            "a68e062e-a8ea-49d3-b46e-ca8dc324bfdc",
          from_name: form.name,
          name: form.name,
          email: form.email,
          phone: form.phone,
          wedding_date: form.weddingDate,
          wedding_location: form.weddingLocation,
          selected_packages: packagesList,
          packages_count: selectedPackageNames.length,
          total_estimate:
            totalEstimatedPrice > 0
              ? `${totalEstimatedPrice.toLocaleString()} birr`
              : "Custom Quote",
          message: form.message,
          subject: `Wedding inquiry from ${form.name} — ${selectedPackageNames.length} Packages (${form.weddingDate})`,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // RESET FORM TO COMPLETELY CLEAN, FRESH STATE
        setForm({
          name: "",
          email: "",
          phone: "",
          weddingDate: "",
          weddingLocation: "",
          message: "",
        });
        setSelectedPackageNames([]);
        setErrors({});
        setSubmittedSuccessfully(true);

        setToast({
          type: "success",
          title: t.contact.toastSuccess,
          description: t.contact.toastSuccessDesc,
        });
      } else {
        setToast({
          type: "error",
          title: t.contact.toastError,
          description: data.message || t.contact.toastErrorDesc,
        });
      }
    } catch {
      setToast({
        type: "error",
        title: t.contact.toastNetwork,
        description: t.contact.toastNetworkDesc,
      });
    } finally {
      setLoading(false);
    }
  };

  const getInputClass = (fieldName: string) =>
    `w-full rounded-xl px-4 py-3 transition-colors text-sm sm:text-base focus:outline-none ${
      errors[fieldName]
        ? "bg-rose-500/10 border border-rose-500 text-rose-50 placeholder:text-rose-300/60 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/50"
        : "bg-white dark:bg-[#18191c] border border-zinc-300 dark:border-ink-700 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 shadow-sm"
    }`;

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Success Banner when Form has Been Submitted & Freshly Cleared */}
      {submittedSuccessfully && (
        <div className="p-4 sm:p-5 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 text-emerald-200 mb-6 flex items-start justify-between gap-3 shadow-lg animate-fadeIn">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm sm:text-base text-white">
                {t.contact.successTitle}
              </h4>
              <p className="text-xs sm:text-sm text-emerald-300/90 mt-0.5">
                {t.contact.successDesc}
              </p>
              <span className="inline-block mt-2 text-[11px] font-mono text-emerald-300 bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                ✓ {lang === "am" ? "ቅጹ ጸድቷል፤ ለአዲስ መልዕክት ዝግጁ ነው" : "Form cleared & fresh for another submission"}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSubmittedSuccessfully(false)}
            className="text-emerald-400 hover:text-white transition-colors p-1"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* The Contact Form (Always Visible, Clear, and Fresh) */}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* User Personal Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2"
            >
              {t.contact.name}
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={update("name")}
              placeholder={t.contact.namePlaceholder}
              className={getInputClass("name")}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2"
            >
              {t.contact.emailField}
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder={t.contact.emailPlaceholder}
              className={getInputClass("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2"
            >
              {t.contact.phoneField}
            </label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={update("phone")}
              placeholder={t.contact.phonePlaceholder}
              className={getInputClass("phone")}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && (
              <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          {/* Wedding Date Field */}
          <div>
            <label
              htmlFor="weddingDate"
              className="block text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2"
            >
              {t.contact.weddingDateField}
            </label>
            <input
              id="weddingDate"
              type="date"
              value={form.weddingDate}
              onChange={update("weddingDate")}
              className={getInputClass("weddingDate")}
              aria-invalid={!!errors.weddingDate}
            />
            {errors.weddingDate && (
              <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.weddingDate}</span>
              </p>
            )}
          </div>
        </div>

        {/* Wedding Location Field */}
        <div>
          <label
            htmlFor="weddingLocation"
            className="block text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2"
          >
            {t.contact.weddingLocationField}
          </label>
          <input
            id="weddingLocation"
            type="text"
            value={form.weddingLocation}
            onChange={update("weddingLocation")}
            placeholder={t.contact.weddingLocationPlaceholder}
            className={getInputClass("weddingLocation")}
            aria-invalid={!!errors.weddingLocation}
          />
          {errors.weddingLocation && (
            <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.weddingLocation}</span>
            </p>
          )}
        </div>

        {/* MULTI-PACKAGE SELECTION SECTION */}
        <div
          className={`pt-3 pb-3 border-t border-b ${
            errors.packages
              ? "border-rose-500/80 bg-rose-500/5 p-3 rounded-2xl"
              : "border-ink-800/80"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <label className="block text-sm sm:text-base font-semibold text-ink-50">
                {lang === "am"
                  ? "የሚፈልጉትን ፓኬጅ ይምረጡ *"
                  : "Select Packages (Mandatory) *"}
              </label>
              <p className="text-xs text-ink-400 mt-0.5">
                {lang === "am"
                  ? "ለሰርግዎ ተስማሚ የሆኑትን ፓኬጆች ጠቅ በማድረግ ይምረጡ (ከአንድ በላይ መምረጥ ይችላሉ)"
                  : "Tap to select or combine multiple photography & videography packages"}
              </p>
            </div>

            {selectedPackageNames.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedPackageNames([])}
                className="text-xs text-gold-400 hover:text-gold-300 self-start sm:self-auto underline transition-colors"
              >
                {lang === "am" ? "ሁሉንም አፅዳ" : "Clear All"}
              </button>
            )}
          </div>

          {errors.packages && (
            <p className="text-xs text-rose-400 mb-3 flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.packages}</span>
            </p>
          )}

          {/* Selected Packages Chips & Live Total Calculator */}
          {selectedPackageNames.length > 0 && (
            <div className="mb-4 p-3.5 sm:p-4 rounded-2xl border border-gold-400/40 bg-gold-400/5">
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-gold-400 font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>
                    {selectedPackageNames.length}{" "}
                    {lang === "am" ? "የተመረጡ ፓኬጆች" : "Packages Selected"}
                  </span>
                </span>
                {totalEstimatedPrice > 0 && (
                  <div className="text-right">
                    <span className="text-[11px] text-ink-400 uppercase tracking-wider block">
                      {lang === "am" ? "ግምታዊ ድምር" : "Total Estimate"}
                    </span>
                    <span className="font-display text-lg sm:text-xl font-black text-ink-50 gold-gradient">
                      {totalEstimatedPrice.toLocaleString()} birr
                    </span>
                  </div>
                )}
              </div>

              {/* Active Selection Chips */}
              <div className="flex flex-wrap gap-2">
                {selectedPackageNames.map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-gold-400/60 bg-gold-400/20 text-gold-200"
                  >
                    <span>{name}</span>
                    <button
                      type="button"
                      onClick={() => removePackage(name)}
                      className="hover:text-white transition-colors"
                      aria-label={`Remove ${name}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Package Select Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[320px] overflow-y-auto pr-1 py-1 custom-scrollbar">
            {allSelectableOptions.map((opt) => {
              const isSelected = selectedPackageNames.includes(opt.name);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => togglePackage(opt.name)}
                  className={`text-left p-3 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                    isSelected
                      ? "border-gold-400 bg-gold-400/15 shadow-[0_0_15px_rgba(219,168,53,0.2)]"
                      : "border-zinc-300 dark:border-ink-800 bg-zinc-50 dark:bg-ink-900/60 hover:border-gold-400/40 hover:bg-zinc-100 dark:hover:bg-ink-800/40 text-zinc-900 dark:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "gold-gradient-bg text-on-gold"
                          : "border border-zinc-400 dark:border-ink-600 bg-zinc-200 dark:bg-ink-800 text-transparent"
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>
                    <div className="truncate">
                      <div
                        className={`text-xs sm:text-sm font-semibold truncate ${
                          isSelected ? "text-gold-600 dark:text-gold-200" : "text-zinc-900 dark:text-white"
                        }`}
                      >
                        {opt.name}
                      </div>
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-mono">
                        {opt.category}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold shrink-0 font-mono ${
                      isSelected ? "text-gold-600 dark:text-gold-300" : "text-zinc-800 dark:text-zinc-300"
                    }`}
                  >
                    {opt.priceString}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2"
          >
            {t.contact.message}
          </label>
          <textarea
            id="message"
            rows={4}
            value={form.message}
            onChange={update("message")}
            placeholder={t.contact.messagePlaceholder}
            className={`${getInputClass("message")} resize-none`}
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        <input
          type="checkbox"
          name="honeypot"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Submit Action */}
        <button
          type="submit"
          disabled={loading}
          className="w-full gold-gradient-bg text-on-gold py-4 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(219,168,53,0.4)] hover:scale-[1.01] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-[#0b0c0e]/30 border-t-[#0b0c0e] rounded-full animate-spin" />
              {t.contact.sending}
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>
                {selectedPackageNames.length > 1
                  ? `${t.contact.send} (${selectedPackageNames.length} Packages)`
                  : t.contact.send}
              </span>
            </>
          )}
        </button>
      </form>
    </>
  );
}
