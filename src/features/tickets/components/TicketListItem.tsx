import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { PriorityBadge } from "@/components/PriorityBadge";
import { formatDateTime } from "@/lib/dates";
import type { AuthorTicketSummary } from "@/types/ticket";

interface Props {
  ticket: AuthorTicketSummary;
}

export function TicketListItem({ ticket }: Props) {
  return (
    <li>
      <Link
        href={`/tickets/${ticket.id}`}
        className="block p-4 hover:bg-emerald-50/50"
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-slate-900">{ticket.subject}</h3>
            <p className="mt-1 text-sm text-slate-500">
              {ticket.book?.title ?? "General / Account"} ·{" "}
              {formatDateTime(ticket.createdAt)}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={ticket.status} />
            {ticket.priority && <PriorityBadge priority={ticket.priority} />}
          </div>
        </div>
      </Link>
    </li>
  );
}
