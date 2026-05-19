import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: Props) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${className}`.trim()}
    >
      {children}
    </span>
  );
}
