"use client";

/** Ticket detail — conversation thread with real-time Socket.io updates. */

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { connectSocket, getSocket } from "@/lib/socket";
import { StatusBadge } from "@/components/StatusBadge";
import { PriorityBadge } from "@/components/PriorityBadge";
import type { TicketDetail, TicketMessage } from "@/types/ticket";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function TicketDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    return api<{ ticket: TicketDetail }>(`/api/v1/author/tickets/${id}`).then(
      (d) => setTicket(d.ticket)
    );
  }, [id]);

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [load]);

  useEffect(() => {
    const socket = connectSocket();
    socket.emit("join:author");
    socket.emit("join:ticket", id);

    const onMessage = (payload: TicketMessage & { ticketId?: string }) => {
      if (payload.ticketId && payload.ticketId !== id) return;
      setTicket((prev) => {
        if (!prev) return prev;
        if (prev.messages.some((m) => m.id === payload.id)) return prev;
        return {
          ...prev,
          messages: [
            ...prev.messages,
            {
              id: payload.id,
              body: payload.body,
              isFromAdmin: payload.isFromAdmin,
              senderName: payload.senderName ?? "Support",
              createdAt: payload.createdAt,
            },
          ],
        };
      });
    };

    socket.on("ticket:message", onMessage);
    socket.on("ticket:updated", load);

    const poll = setInterval(() => load().catch(() => {}), 10_000);

    return () => {
      socket.off("ticket:message", onMessage);
      socket.off("ticket:updated", load);
      clearInterval(poll);
      getSocket().emit("leave", `ticket:${id}`);
    };
  }, [id, load]);

  if (loading) return <p>Loading ticket…</p>;
  if (!ticket) return <p>Ticket not found.</p>;

  return (
    <div>
      <Link href="/tickets" className="text-sm text-emerald-700 hover:underline">
        ← Back to tickets
      </Link>

      <div className="mt-4 rounded-xl border bg-white p-6 shadow-sm">
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
              href={`${API_URL}${ticket.attachmentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${API_URL}${ticket.attachmentUrl}`}
                alt="Ticket attachment"
                className="mt-2 max-h-64 rounded-lg border border-slate-200 object-contain"
              />
            </a>
          </div>
        )}
      </div>

      <h3 className="mt-8 font-semibold text-slate-900">Conversation</h3>
      <ul className="mt-4 space-y-3">
        {ticket.messages.length === 0 ? (
          <li className="text-sm text-slate-500">
            No replies yet. Our team will respond shortly.
          </li>
        ) : (
          ticket.messages.map((m) => (
            <li
              key={m.id}
              className={`rounded-lg p-4 ${
                m.isFromAdmin
                  ? "border border-emerald-200 bg-emerald-50"
                  : "bg-slate-50"
              }`}
            >
              <p className="text-xs font-medium text-slate-500">
                {m.isFromAdmin ? "BookLeaf Support" : "You"} ·{" "}
                {new Date(m.createdAt).toLocaleString()}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-slate-800">{m.body}</p>
            </li>
          ))
        )}
      </ul>

      <p className="mt-4 text-xs text-slate-400">
        Updates appear in real time when support replies.
      </p>
    </div>
  );
}
