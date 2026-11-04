"use client";

import { motion, useScroll, useSpring } from "motion/react";

interface ScrollProgressBarProps {
  className?: string;
}

export function ScrollProgressBar({ className }: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className={`fixed top-0 left-0 right-0 h-1 origin-left z-50 bg-gradient-to-r from-hef-crimson via-hef-gold to-hef-crimson ${
        className || ""
      }`}
    />
  );
}
