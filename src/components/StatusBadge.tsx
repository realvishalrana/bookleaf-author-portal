/** Pill badge for ticket lifecycle status. */

import { STATUS_LABEL } from "@/constants/ticket";

const STATUS_CLASS: Record<string, string> = {
  OPEN: "bg-blue-100 text-blue-800",
  IN_PROGRESS: "bg-amber-100 text-amber-800",
  RESOLVED: "bg-green-100 text-green-800",
  CLOSED: "bg-slate-100 text-slate-600",
};

interface Props {
  status: string;
}

export function StatusBadge({ status }: Props) {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
        STATUS_CLASS[status] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {STATUS_LABEL[status] ?? status.replace(/_/g, " ")}
    </span>
  );
}
