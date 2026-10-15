"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, X } from "lucide-react";

export type ToastType = "success" | "error";

export interface ToastMessage {
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export function Toast({ toast, onClose }: ToastProps) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 20, x: "-50%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-24 left-1/2 z-[100] w-[calc(100vw-2rem)] max-w-md"
        >
          <div
            className={`flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-md shadow-2xl ${
              toast.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-100"
                : "bg-red-500/10 border-red-500/30 text-red-100"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="w-6 h-6 text-red-400 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-ink-50">{toast.title}</p>
              {toast.description && (
                <p className="text-sm text-ink-300 mt-0.5">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close notification"
              className="text-ink-400 hover:text-ink-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
