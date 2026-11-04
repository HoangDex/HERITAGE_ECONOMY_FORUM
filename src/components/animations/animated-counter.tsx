"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({
  from = 0,
  to,
  suffix = "",
  prefix = "",
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(from);
  const springVal = useSpring(motionVal, {
    stiffness: 80,
    damping: 20,
  });
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (isInView) {
      motionVal.set(to);
    }
  }, [isInView, motionVal, to]);

  useEffect(() => {
    return springVal.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString("vi-VN")}${suffix}`;
      }
    });
  }, [springVal, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {from.toLocaleString("vi-VN")}
      {suffix}
    </span>
  );
}
