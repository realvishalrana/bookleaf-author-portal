"use client";

import { useCallback, useEffect, useState } from "react";
import { listTickets } from "@/services/tickets.service";
import type { AuthorTicketSummary, PaginationMeta } from "@/types/ticket";

export type { AuthorTicketSummary } from "@/types/ticket";

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
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPageRaw] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchTickets = useCallback(async (currentPage: number, currentSearch: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await listTickets(currentSearch, currentPage);
      setTickets(data.tickets);
      setPagination({
        total: data.total,
        page: data.page,
        totalPages: data.totalPages,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tickets");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets(page, debouncedSearch);
  }, [fetchTickets, page, debouncedSearch]);

  function setPage(v: number) {
    setPageRaw(v);
  }

  function setSearch(v: string) {
    setSearchRaw(v);
    setPageRaw(1);
  }

  return {
    tickets,
    loading,
    error,
    search,
    page,
    pagination,
    setSearch,
    setPage,
  };
}
