import Link from "next/link";
import type { TicketDetail } from "@/types/ticket";
import { TicketDetailHeader } from "./TicketDetailHeader";
import { ConversationThread } from "./ConversationThread";

interface Props {
  ticket: TicketDetail;
  attachmentUrl: string | null;
}

export function TicketDetailView({ ticket, attachmentUrl }: Props) {
  return (
    <div>
      <Link href="/tickets" className="text-sm text-emerald-700 hover:underline">
        ← Back to tickets
      </Link>
      <div className="mt-4">
        <TicketDetailHeader ticket={ticket} attachmentUrl={attachmentUrl} />
        <ConversationThread messages={ticket.messages} />
      </div>
    </div>
  );
}
