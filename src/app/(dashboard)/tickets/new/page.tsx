"use client";

import { useCreateTicket } from "@/hooks/useCreateTicket";
import { CreateTicketForm } from "@/features/tickets/components/CreateTicketForm";

export default function NewTicketPage() {
  const form = useCreateTicket();
  return <CreateTicketForm {...form} />;
}
