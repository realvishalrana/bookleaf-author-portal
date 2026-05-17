"use client";

/** Fetches the author's ticket list — owns search, page, loading and error state. */

import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import type { AuthorTicketSummary, PaginationMeta } from "@/types/ticket";

export type { AuthorTicketSummary } from "@/types/ticket";

const PAGE_LIMIT = 10;
const SEARCH_DEBOUNCE_MS = 300;

export interface UseMyTicketsReturn {
  tickets: AuthorTicketSummary[];
  loading: boolean;
  error: string | null;
  search: string;
  page: number;
  pagination: PaginationMeta | null;
  setSearch: (v: string) => void;
  setPage: (v: number) => void;
}

export function useMyTickets(): UseMyTicketsReturn {
  const [tickets, setTickets] = useState<AuthorTicketSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [search, setSearchRaw] = useState("");
  const [page, setPageRaw] = useState(1);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchTickets = useCallback((currentPage: number, currentSearch: string) => {
    const params = new URLSearchParams();
    if (currentSearch) params.set("search", currentSearch);
    params.set("page", String(currentPage));
    params.set("limit", String(PAGE_LIMIT));

    setLoading(true);
    setError(null);

    api<{ tickets: AuthorTicketSummary[]; total: number; page: number; totalPages: number }>(
      `/api/v1/author/tickets?${params.toString()}`
    )
      .then((d) => {
        setTickets(d.tickets);
        setPagination({ total: d.total, page: d.page, totalPages: d.totalPages });
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load tickets")
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchTickets(page, search);
  }, [fetchTickets, page]); // eslint-disable-line react-hooks/exhaustive-deps

  function setPage(v: number) { setPageRaw(v); }

  function setSearch(v: string) {
    setSearchRaw(v);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPageRaw(1);
      fetchTickets(1, v);
    }, SEARCH_DEBOUNCE_MS);
  }

  return { tickets, loading, error, search, page, pagination, setSearch, setPage };
}
