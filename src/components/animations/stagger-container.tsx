"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import type { ReactNode } from "react";

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
}

const defaultContainerVariants = (staggerDelay: number, initialDelay: number): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  initialDelay = 0.05,
  className,
  ...props
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={defaultContainerVariants(staggerDelay, initialDelay)}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  yOffset?: number;
}

export function StaggerItem({ children, className, yOffset = 20, ...props }: StaggerItemProps) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
}
