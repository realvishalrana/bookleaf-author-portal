import { Badge } from "./Badge";

const PRIORITY_CLASS: Record<string, string> = {
  CRITICAL: "bg-red-100 text-red-800 ring-1 ring-red-300",
  HIGH: "bg-orange-100 text-orange-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  LOW: "bg-slate-100 text-slate-600",
};

interface Props {
  priority: string | null;
}

export function PriorityBadge({ priority }: Props) {
  if (!priority) {
    return <span className="text-slate-400">—</span>;
  }

  return (
    <Badge className={PRIORITY_CLASS[priority] ?? "bg-slate-100 text-slate-600"}>
      {priority}
    </Badge>
  );
}
