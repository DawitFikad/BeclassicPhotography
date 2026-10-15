import { forwardRef, type ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  loading?: boolean;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide whitespace-nowrap transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:opacity-60 disabled:cursor-not-allowed";

const variantStyles: Record<Variant, string> = {
  primary:
    "gold-gradient-bg text-on-gold hover:shadow-[0_0_30px_rgba(219,168,53,0.4)] hover:scale-[1.02]",
  outline:
    "border border-gold-400/60 text-gold-300 hover:bg-gold-400 hover:text-on-gold hover:border-gold-400",
  ghost: "text-ink-100 hover:text-gold-300 hover:bg-ink-800/60",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", href, loading, children, className = "", ...props },
    ref
  ) => {
    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} disabled={loading} {...props}>
        {loading && <Loader2 className="h-5 w-5 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
