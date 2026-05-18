import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "link";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const VARIANT_CLASS: Record<Variant, string> = {
  primary:
    "rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60",
  link: "text-sm text-emerald-700 hover:underline disabled:opacity-50",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: Props) {
  return (
    <button
      className={`${VARIANT_CLASS[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
