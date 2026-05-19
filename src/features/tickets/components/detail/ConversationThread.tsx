import { formatDateTime } from "@/lib/dates";
import type { TicketMessage } from "@/types/ticket";

interface Props {
  messages: TicketMessage[];
}

export function ConversationThread({ messages }: Props) {
  return (
  <>
      <h3 className="mt-8 font-semibold text-slate-900">Conversation</h3>
      <ul className="mt-4 space-y-3">
        {messages.length === 0 ? (
          <li className="text-sm text-slate-500">
            No replies yet. Our team will respond shortly.
          </li>
        ) : (
          messages.map((m) => (
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
                {formatDateTime(m.createdAt)}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-slate-800">{m.body}</p>
            </li>
          ))
        )}
      </ul>
      <p className="mt-4 text-xs text-slate-400">
        Updates appear in real time when support replies.
      </p>
    </>
  );
}
