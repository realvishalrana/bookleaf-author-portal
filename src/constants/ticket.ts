/** Ticket status labels — aligned with backend / admin portal. */

export const TICKET_STATUSES = [
  { value: "OPEN", label: "Open" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "CLOSED", label: "Closed" },
] as const;

export const STATUS_LABEL: Record<string, string> = Object.fromEntries(
  TICKET_STATUSES.map((s) => [s.value, s.label])
);
