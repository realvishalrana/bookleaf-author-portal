import { api } from "@/lib/api";
import type { AuthorTicketSummary, TicketDetail } from "@/types/ticket";

const PAGE_LIMIT = 10;

export interface TicketListResult {
  tickets: AuthorTicketSummary[];
  total: number;
  page: number;
  totalPages: number;
}

export function buildTicketListQuery(search: string, page: number): string {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  params.set("page", String(page));
  params.set("limit", String(PAGE_LIMIT));
  return params.toString();
}

export async function listTickets(
  search: string,
  page: number
): Promise<TicketListResult> {
  const query = buildTicketListQuery(search, page);
  return api<TicketListResult>(`/api/v1/author/tickets?${query}`);
}

export async function getTicket(id: string): Promise<TicketDetail> {
  const data = await api<{ ticket: TicketDetail }>(`/api/v1/author/tickets/${id}`);
  return data.ticket;
}

export async function createTicket(formData: FormData): Promise<{ id: string }> {
  const data = await api<{ ticket: { id: string } }>("/api/v1/author/tickets", {
    method: "POST",
    body: formData,
  });
  return data.ticket;
}
