import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function TextInput({ label, className = "", id, ...props }: Props) {
  const inputId = id ?? props.name;

  const input = (
    <input
      id={inputId}
      className={`w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-60 ${className}`.trim()}
      {...props}
    />
  );

  if (!label) return input;

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="mt-1">{input}</div>
    </div>
  );
}
