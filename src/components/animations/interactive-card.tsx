"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

interface InteractiveCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hoverY?: number;
  tapScale?: number;
}

export function InteractiveCard({
  children,
  className,
  hoverY = -4,
  tapScale = 0.985,
  ...props
}: InteractiveCardProps) {
  return (
    <motion.div
      whileHover={{ y: hoverY }}
      whileTap={{ scale: tapScale }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
