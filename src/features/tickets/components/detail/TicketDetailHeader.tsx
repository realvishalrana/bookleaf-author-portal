import { StatusBadge } from "@/components/StatusBadge";
import { PriorityBadge } from "@/components/PriorityBadge";
import type { TicketDetail } from "@/types/ticket";
import { AttachmentPreview } from "./AttachmentPreview";

interface Props {
  ticket: TicketDetail;
  attachmentUrl: string | null;
}

export function TicketDetailHeader({ ticket, attachmentUrl }: Props) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap gap-2">
        <StatusBadge status={ticket.status} />
        <PriorityBadge priority={ticket.priority} />
        {ticket.categoryLabel && (
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs text-emerald-800">
            {ticket.categoryLabel}
          </span>
        )}
      </div>

      <h2 className="mt-3 text-xl font-bold">{ticket.subject}</h2>
      <p className="mt-1 text-sm text-slate-500">
        {ticket.book?.title ?? "General / Account"}
      </p>

      <p className="mt-4 whitespace-pre-wrap text-slate-700">{ticket.description}</p>

      {attachmentUrl && <AttachmentPreview url={attachmentUrl} />}
    </div>
  );
}
