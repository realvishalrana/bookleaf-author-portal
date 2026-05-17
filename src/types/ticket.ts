/** Shared TypeScript interfaces for ticket-related data in the author portal. */

export interface PaginationMeta {
  total: number;
  page: number;
  totalPages: number;
}

export interface AuthorTicketSummary {
  id: string;
  subject: string;
  status: string;
  categoryLabel: string | null;
  priority: string | null;
  book: { id: string; title: string } | null;
  createdAt: string;
}

export interface TicketMessage {
  id: string;
  body: string;
  isFromAdmin: boolean;
  senderName: string | null;
  createdAt: string;
}

export interface TicketDetail {
  id: string;
  subject: string;
  description: string;
  status: string;
  categoryLabel: string | null;
  priority: string | null;
  book: { id: string; title: string } | null;
  attachmentUrl: string | null;
  messages: TicketMessage[];
}
