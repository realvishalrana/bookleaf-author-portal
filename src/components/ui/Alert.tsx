import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export function Alert({ children, className = "" }: Props) {
  return (
    <p
      className={`rounded-md bg-red-50 px-4 py-2 text-sm text-red-600 ${className}`.trim()}
      role="alert"
    >
      {children}
    </p>
  );
}
