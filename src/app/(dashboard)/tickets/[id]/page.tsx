"use client";

import { useParams } from "next/navigation";
import { useTicketDetail } from "@/hooks/useTicketDetail";
import { TicketDetailView } from "@/features/tickets/components/detail/TicketDetailView";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";

export default function TicketDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { ticket, loading, attachmentUrl } = useTicketDetail(id);

  if (loading) return <LoadingState message="Loading ticket…" />;
  if (!ticket) return <EmptyState message="Ticket not found." />;

  return <TicketDetailView ticket={ticket} attachmentUrl={attachmentUrl} />;
}
