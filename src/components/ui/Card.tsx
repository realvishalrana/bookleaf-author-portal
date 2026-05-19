import { HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  title?: string;
}

export function Card({ children, title, className = "", ...props }: Props) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${className}`.trim()}
      {...props}
    >
      {title && <h3 className="mb-4 font-semibold text-slate-900">{title}</h3>}
      {children}
    </div>
  );
}
