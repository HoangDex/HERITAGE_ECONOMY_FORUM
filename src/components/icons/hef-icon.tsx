/**
 * BỘ ICON COMPONENT SYSTEM CHO DỰ ÁN HERITAGE ECONOMY FORUM (HEF)
 * Đóng gói thư viện Icon, hỗ trợ phân loại màu nhận diện (Đỏ son, Vàng đồng, Đen than)
 */

import React from "react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

export type IconName = keyof typeof LucideIcons;

export interface HefIconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  variant?: "crimson" | "gold" | "charcoal" | "muted" | "current";
  className?: string;
}

const sizeMap = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

const variantColorMap = {
  crimson: "text-[#76232D]",
  gold: "text-[#C29B57]",
  charcoal: "text-[#292929] dark:text-[#F5EFE5]",
  muted: "text-muted-foreground",
  current: "currentColor",
};

export const HefIcon: React.FC<HefIconProps> = ({
  name,
  size = "md",
  variant = "current",
  className,
  ...props
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[name] as React.ComponentType<{
    size?: number;
    className?: string;
  }>;

  if (!IconComponent) {
    const Fallback = LucideIcons.HelpCircle;
    return (
      <Fallback size={typeof size === "number" ? size : sizeMap[size]} className={className} />
    );
  }

  const numericSize = typeof size === "number" ? size : sizeMap[size];
  const colorClass = variantColorMap[variant] || "";

  return <IconComponent size={numericSize} className={cn(colorClass, className)} {...props} />;
};
