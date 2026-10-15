import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 pt-32 pb-24">
      <span className="font-mono text-sm uppercase tracking-widest text-gold-400 mb-3 px-3.5 py-1 rounded-full border border-gold-400/20 bg-gold-400/5">
        404 — Page Not Found
      </span>
      <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink-50 mb-4">
        Lost in the <span className="gold-gradient">Frames?</span>
      </h1>
      <p className="text-ink-400 text-base max-w-md mx-auto mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="gold-gradient-bg text-on-gold px-7 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-all"
      >
        Return to Homepage
      </Link>
    </div>
  );
}

