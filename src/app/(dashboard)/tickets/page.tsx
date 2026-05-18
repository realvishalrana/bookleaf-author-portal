"use client";

/** Author ticket list — thin shell over useMyTickets with search and pagination. */

import Link from "next/link";
import { useMyTickets } from "@/hooks/useMyTickets";
import { StatusBadge } from "@/components/StatusBadge";
import { PriorityBadge } from "@/components/PriorityBadge";
import { Pagination } from "@/components/Pagination";
import { ErrorAlert } from "@/components/ErrorAlert";
import { LoadingState } from "@/components/LoadingState";

export default function TicketsPage() {
  const { tickets, loading, error, search, page, pagination, setSearch, setPage } =
    useMyTickets();

  return (
    <div>
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
      {error && <ErrorAlert message={error} />}
      {!loading && !error && tickets.length === 0 && (
        <p className="mt-6 text-slate-600">No tickets match your search.</p>
      )}

      {!loading && tickets.length > 0 && (
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <ul className="divide-y divide-slate-100">
            {tickets.map((t) => (
              <li key={t.id}>
                <Link
                  href={`/tickets/${t.id}`}
                  className="block p-4 hover:bg-emerald-50/50"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-slate-900">{t.subject}</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {t.book?.title ?? "General / Account"} ·{" "}
                        {new Date(t.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={t.status} />
                      {t.priority && <PriorityBadge priority={t.priority} />}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {pagination && pagination.totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={pagination.totalPages}
              onPrev={() => setPage(page - 1)}
              onNext={() => setPage(page + 1)}
            />
          )}
        </div>
      )}

      {pagination && (
        <p className="mt-2 text-xs text-slate-400 text-right">
          {pagination.total} ticket{pagination.total !== 1 ? "s" : ""} total
        </p>
      )}
    </div>
  );
}
