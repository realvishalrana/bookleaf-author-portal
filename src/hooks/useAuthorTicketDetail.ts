"use client";

/** Ticket detail for authors — REST load, Socket.io realtime, and fallback poll. */

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { connectSocket, getSocket } from "@/lib/socket";
import type { TicketDetail, TicketMessage } from "@/types/ticket";

export function useAuthorTicketDetail(id: string) {
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    return api<{ ticket: TicketDetail }>(`/api/v1/author/tickets/${id}`).then(
      (d) => setTicket(d.ticket)
    );
  }, [id]);

  useEffect(() => {
    load()
      .catch(console.error)
      .finally(() => setLoading(false));
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

  return { ticket, loading };
}
