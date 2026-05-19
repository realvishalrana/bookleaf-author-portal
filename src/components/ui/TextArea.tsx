import { TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function TextArea({ label, className = "", id, ...props }: Props) {
  const areaId = id ?? props.name;

  const textarea = (
    <textarea
      id={areaId}
      className={`w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-60 ${className}`.trim()}
      {...props}
    />
  );

  if (!label) return textarea;

  return (
    <div>
      <label htmlFor={areaId} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="mt-1">{textarea}</div>
    </div>
  );
}
