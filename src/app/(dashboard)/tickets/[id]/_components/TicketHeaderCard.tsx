"use client";

import { getApiBaseUrl } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/StatusBadge";
import { PriorityBadge } from "@/components/PriorityBadge";
import type { TicketDetail } from "@/types/ticket";

interface Props {
  ticket: TicketDetail;
}

export function TicketHeaderCard({ ticket }: Props) {
  const apiBase = getApiBaseUrl();

  return (
    <Card>
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

      <p className="mt-4 whitespace-pre-wrap text-slate-700">
        {ticket.description}
      </p>

      {ticket.attachmentUrl && (
        <div className="mt-4">
          <p className="text-xs font-medium text-slate-500">Attachment</p>
          <a
            href={`${apiBase}${ticket.attachmentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={`${apiBase}${ticket.attachmentUrl}`}
              alt="Ticket attachment"
              className="mt-2 max-h-64 rounded-lg border border-slate-200 object-contain"
            />
          </a>
        </div>
      )}
    </Card>
  );
}
