import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  href = "/",
  subtitle,
  variant = "default",
  size = "md",
  className,
}: {
  href?: string | null;
  subtitle?: string;
  variant?: "default" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const wordmark = (
    <span
      className={cn(
        "font-display font-semibold tracking-tight",
        size === "sm" && "text-lg",
        size === "md" && "text-xl",
        size === "lg" && "text-3xl md:text-4xl",
        variant === "light" ? "text-white" : "text-ink",
      )}
    >
      Carnet
    </span>
  );

  const body = (
    <div className={cn("flex flex-col gap-0.5", className)}>
      {wordmark}
      {subtitle ? (
        <span
          className={cn(
            "text-[11px] font-medium uppercase tracking-wider",
            variant === "light" ? "text-white/70" : "text-muted",
          )}
        >
          {subtitle}
        </span>
      ) : null}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex transition-opacity hover:opacity-80">
        {body}
      </Link>
    );
  }

  return body;
}
