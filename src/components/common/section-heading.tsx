interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeading({
  badge,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={`space-y-2 mb-8 ${centered ? "text-center mx-auto max-w-2xl" : ""}`}>
      {badge && (
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{title}</h2>
      {description && <p className="text-sm sm:text-base text-muted-foreground">{description}</p>}
    </div>
  );
}
