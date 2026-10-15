"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { translations, type Language, type Translation } from "@/lib/translations";

interface LanguageContextValue {
  lang: Language;
  t: Translation;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const saved = (localStorage.getItem("beclassic-lang") ||
      localStorage.getItem("plus-studio-lang")) as Language | null;
    if (saved === "en" || saved === "am") {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("beclassic-lang", newLang);
    document.documentElement.lang = newLang === "am" ? "am" : "en";
  };

  const toggleLang = () => setLang(lang === "en" ? "am" : "en");

  const value: LanguageContextValue = {
    lang,
    t: translations[lang],
    setLang,
    toggleLang,
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
