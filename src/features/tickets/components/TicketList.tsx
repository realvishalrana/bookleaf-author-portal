import Link from "next/link";
import { Pagination } from "@/components/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import type { AuthorTicketSummary, PaginationMeta } from "@/types/ticket";
import { TicketListItem } from "./TicketListItem";

interface Props {
  tickets: AuthorTicketSummary[];
  page: number;
  pagination: PaginationMeta | null;
  onPageChange: (page: number) => void;
}

export function TicketList({ tickets, page, pagination, onPageChange }: Props) {
  if (tickets.length === 0) {
    return <EmptyState message="No tickets match your search." />;
  }

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <ul className="divide-y divide-slate-100">
        {tickets.map((t) => (
          <TicketListItem key={t.id} ticket={t} />
        ))}
      </ul>

      {pagination && pagination.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={pagination.totalPages}
          onPrev={() => onPageChange(page - 1)}
          onNext={() => onPageChange(page + 1)}
        />
      )}
    </div>
  );
}

export function TicketListHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">My Tickets</h2>
        <p className="mt-1 text-slate-600">Track support requests and replies</p>
      </div>
      <Link
        href="/tickets/new"
        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
      >
        New query
      </Link>
    </div>
  );
}
