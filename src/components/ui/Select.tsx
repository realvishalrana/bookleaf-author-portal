import { SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface Props extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options: SelectOption[];
  label?: string;
  hint?: string;
}

const BASE_CLASS =
  "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-60";

export function Select({ options, label, hint, className = "", id, ...props }: Props) {
  const selectId = id ?? props.name;

  const selectEl = (
    <select id={selectId} className={`${BASE_CLASS} ${className}`.trim()} {...props}>
      {options.map((opt) => (
        <option key={opt.value || "__empty"} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );

  if (!label) return selectEl;

  return (
    <div>
      <label htmlFor={selectId} className="block text-sm font-medium text-slate-700">
        {label}{" "}
        {hint && <span className="font-normal text-slate-400">{hint}</span>}
      </label>
      <div className="mt-1">{selectEl}</div>
    </div>
  );
}
