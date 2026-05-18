"use client";

/** Ticket detail — thin shell over useAuthorTicketDetail and panel components. */

import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuthorTicketDetail } from "@/hooks/useAuthorTicketDetail";
import { LoadingState } from "@/components/LoadingState";
import { TicketHeaderCard } from "./_components/TicketHeaderCard";
import { ConversationPanel } from "./_components/ConversationPanel";

export default function TicketDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { ticket, loading } = useAuthorTicketDetail(id);

  if (loading) return <LoadingState message="Loading ticket…" />;
  if (!ticket) return <p>Ticket not found.</p>;

  return (
    <div>
      <Link href="/tickets" className="text-sm text-emerald-700 hover:underline">
        ← Back to tickets
      </Link>
      <div className="mt-4">
        <TicketHeaderCard ticket={ticket} />
      </div>
      <ConversationPanel messages={ticket.messages} />
    </div>
  );
}
