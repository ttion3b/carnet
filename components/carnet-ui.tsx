import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type DecorativeVariant = "frame" | "soft" | "accent" | "watermark";

export function DecorativeImage({
  src,
  alt = "",
  variant = "frame",
  className,
  imageClassName,
  width = 480,
  height = 320,
  priority,
  rotate,
  fill,
  sizes,
}: {
  src: string;
  alt?: string;
  variant?: DecorativeVariant;
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  rotate?: string;
  fill?: boolean;
  sizes?: string;
}) {
  const rotation =
    rotate ??
    (variant === "frame" ? "rotate-[1.5deg]" : variant === "accent" ? "rotate-[2deg]" : "");

  const imageProps = fill
    ? { fill: true as const, sizes: sizes ?? "240px" }
    : { width, height };

  if (variant === "watermark") {
    return (
      <div className={cn("illus-watermark absolute", className)} aria-hidden>
        <Image
          src={src}
          alt=""
          {...imageProps}
          priority={priority}
          className={cn("object-contain object-right-top", imageClassName)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-transparent" />
      </div>
    );
  }

  if (variant === "accent") {
    return (
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-xl bg-paper shadow-sm ring-1 ring-ink/10",
          rotation,
          className,
        )}
      >
        <Image
          src={src}
          alt={alt}
          {...imageProps}
          priority={priority}
          className={cn("h-full w-full object-cover", imageClassName)}
        />
      </div>
    );
  }

  if (variant === "soft") {
    return (
      <div className={cn("overflow-hidden rounded-xl bg-paper/80 ring-1 ring-ink/8", rotation, className)}>
        <Image
          src={src}
          alt={alt}
          {...imageProps}
          priority={priority}
          className={cn("h-auto w-full object-cover", imageClassName)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border-4 border-ink/10 bg-paper shadow-[8px_12px_0_#1a2b3d12]",
        rotation,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        {...imageProps}
        priority={priority}
        className={cn("h-auto w-full object-cover", imageClassName)}
      />
    </div>
  );
}

/** @deprecated Prefer DecorativeImage with an explicit variant */
export function IllustrationFrame({
  src,
  alt = "",
  className,
  imageClassName,
  width = 480,
  height = 320,
  priority,
  rotate = "rotate-[1.5deg]",
}: {
  src: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  rotate?: string;
}) {
  return (
    <DecorativeImage
      src={src}
      alt={alt}
      variant="frame"
      className={className}
      imageClassName={imageClassName}
      width={width}
      height={height}
      priority={priority}
      rotate={rotate}
    />
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("flex flex-col gap-4", className)}>
      <div className="min-w-0">
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lagoon">{eyebrow}</p> : null}
        <h1 className="font-display mt-1 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
        {description ? <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{description}</p> : null}
      </div>
      {action ? <div className="flex flex-wrap items-center gap-2">{action}</div> : null}
    </header>
  );
}

export function CarnetCard({
  className,
  children,
  tint,
}: {
  className?: string;
  children: React.ReactNode;
  tint?: "lagoon" | "saffron" | "none";
}) {
  return (
    <div className={cn(
      "carnet-card",
      tint === "lagoon" && "border-lagoon/25 bg-lagoon-soft/25",
      tint === "saffron" && "border-saffron/30 bg-saffron-soft/35",
      className,
    )}>
      {children}
    </div>
  );
}

export function Sticker({
  children,
  variant = "lagoon",
  className,
}: {
  children: React.ReactNode;
  variant?: "lagoon" | "saffron" | "paper";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]",
        variant === "lagoon" && "bg-lagoon text-white",
        variant === "saffron" && "bg-saffron text-white",
        variant === "paper" && "border-line bg-paper text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function EmptyState({
  title,
  description,
  href,
  cta,
  compact,
}: {
  title: string;
  description: string;
  href?: string;
  cta?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left",
        compact ? "py-6" : "py-10",
      )}
    >
      <span className="h-px w-10 bg-saffron/70" />
      <div className="min-w-0 flex-1">
        <p className={cn("font-display font-semibold", compact ? "text-base" : "text-xl")}>{title}</p>
        <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>
        {href && cta ? (
          <Link
            href={href}
            className="mt-3 inline-flex border border-lagoon bg-lagoon px-4 py-2 text-sm font-semibold text-white hover:bg-lagoon-ink"
          >
            {cta}
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export function StatPill({
  label,
  value,
  href,
  accent,
}: {
  label: string;
  value: string | number;
  href?: string;
  accent?: "lagoon" | "saffron";
}) {
  const body = (
    <div
      className={cn(
        "flex min-w-[7rem] flex-col border-l border-line px-4 py-2 first:border-0",
        href && "cursor-pointer hover:bg-lagoon-soft/25",
      )}
    >
      <span className="text-xs text-muted">{label}</span>
      <span
        className={cn(
          "mt-1 font-display text-2xl font-semibold tabular-nums",
          accent === "saffron" ? "text-saffron" : "text-lagoon-ink",
        )}
      >
        {value}
      </span>
    </div>
  );
  return href ? <Link href={href}>{body}</Link> : body;
}
