"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

export type RevealAnimation =
  | "slide-left"
  | "slide-right"
  | "slide-up"
  | "slide-down"
  | "immerge"
  | "pop-up"
  | "fade";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  animation?: RevealAnimation;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  animation = "immerge",
  delay = 0,
  duration = 0.65,
  distance = 50,
  className = "",
  once = true,
  ...rest
}: ScrollRevealProps) {
  const getInitial = () => {
    switch (animation) {
      case "slide-left":
        return { opacity: 0, x: -distance };
      case "slide-right":
        return { opacity: 0, x: distance };
      case "slide-up":
        return { opacity: 0, y: distance };
      case "slide-down":
        return { opacity: 0, y: -distance };
      case "immerge":
        return { opacity: 0, scale: 0.92, y: distance * 0.7 };
      case "pop-up":
        return { opacity: 0, scale: 0.82 };
      case "fade":
      default:
        return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    switch (animation) {
      case "slide-left":
      case "slide-right":
        return { opacity: 1, x: 0 };
      case "slide-up":
      case "slide-down":
        return { opacity: 1, y: 0 };
      case "immerge":
        return { opacity: 1, scale: 1, y: 0 };
      case "pop-up":
        return { opacity: 1, scale: 1 };
      case "fade":
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once, margin: "-70px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

