"use client";

import { useCallback, useEffect, useState } from "react";
import { getApiUrl } from "@/lib/api";
import { connectSocket, getSocket } from "@/lib/socket";
import * as ticketsService from "@/services/tickets.service";
import type { TicketDetail, TicketMessage } from "@/types/ticket";

const POLL_INTERVAL_MS = 10_000;

export interface UseTicketDetailReturn {
  ticket: TicketDetail | null;
  loading: boolean;
  attachmentUrl: string | null;
}

export function useTicketDetail(ticketId: string): UseTicketDetailReturn {
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const t = await ticketsService.getTicket(ticketId);
    setTicket(t);
  }, [ticketId]);

  useEffect(() => {
    load()
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [load]);

  useEffect(() => {
    const socket = connectSocket();
    socket.emit("join:author");
    socket.emit("join:ticket", ticketId);

    const onMessage = (payload: TicketMessage & { ticketId?: string }) => {
      if (payload.ticketId && payload.ticketId !== ticketId) return;
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

    const poll = setInterval(() => load().catch(() => {}), POLL_INTERVAL_MS);

    return () => {
      socket.off("ticket:message", onMessage);
      socket.off("ticket:updated", load);
      clearInterval(poll);
      getSocket().emit("leave", `ticket:${ticketId}`);
    };
  }, [ticketId, load]);

  const attachmentUrl =
    ticket?.attachmentUrl != null
      ? `${getApiUrl()}${ticket.attachmentUrl}`
      : null;

  return { ticket, loading, attachmentUrl };
}
