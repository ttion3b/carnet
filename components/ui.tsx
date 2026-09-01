import type { ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline" | "danger" | "soft";
  size?: "sm" | "md";
}) {
  return (
    <button
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" ? "min-h-10 px-3 text-sm" : "min-h-11 px-4 text-sm",
        variant === "primary" && "border-lagoon bg-lagoon text-white hover:bg-lagoon-ink",
        variant === "ghost" && "border-transparent text-ink hover:border-line",
        variant === "outline" && "border-line bg-paper text-ink hover:border-lagoon",
        variant === "danger" && "border-rose bg-rose text-white hover:bg-[#931d18]",
        variant === "soft" && "border-lagoon/20 bg-lagoon-soft text-lagoon-ink hover:bg-[#d6e8f7]",
        className,
      )}
      {...props}
    />
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "min-h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm text-ink outline-none transition-shadow placeholder:text-muted/80 focus:border-lagoon focus:ring-2 focus:ring-lagoon/15",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none transition-shadow placeholder:text-muted/80 focus:border-lagoon focus:ring-2 focus:ring-lagoon/15",
        className,
      )}
      {...props}
    />
  );
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "min-h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm text-ink outline-none focus:border-lagoon focus:ring-2 focus:ring-lagoon/15",
        className,
      )}
      {...props}
    />
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
      {hint ? <span className="text-xs text-muted">{hint}</span> : null}
    </label>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("carnet-card", className)}>
      {children}
    </div>
  );
}
