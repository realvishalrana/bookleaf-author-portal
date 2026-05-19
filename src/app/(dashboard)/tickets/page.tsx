"use client";

import { useMyTickets } from "@/hooks/useMyTickets";
import { TicketList, TicketListHeader } from "@/features/tickets/components/TicketList";
import { Alert } from "@/components/ui/Alert";
import { LoadingState } from "@/components/ui/LoadingState";

export default function TicketsPage() {
  const { tickets, loading, error, search, page, pagination, setSearch, setPage } =
    useMyTickets();

  return (
    <div>
      <TicketListHeader />

      <div className="mt-4">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tickets by subject…"
          aria-label="Search tickets"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 sm:max-w-sm"
        />
      </div>

      {loading && <LoadingState className="mt-6" />}
      {error && <Alert className="mt-4">{error}</Alert>}

      {!loading && !error && (
        <TicketList
          tickets={tickets}
          page={page}
          pagination={pagination}
          onPageChange={setPage}
        />
      )}

      {pagination && (
        <p className="mt-2 text-right text-xs text-slate-400">
          {pagination.total} ticket{pagination.total !== 1 ? "s" : ""} total
        </p>
      )}
    </div>
  );
}
