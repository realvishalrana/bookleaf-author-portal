"use client";

/** Submit a Support Query — thin shell over useAuthorBooks, useCreateTicket, NewTicketForm. */

import { useAuthorBooks } from "@/hooks/useAuthorBooks";
import { useCreateTicket } from "@/hooks/useCreateTicket";
import { LoadingState } from "@/components/LoadingState";
import { ErrorAlert } from "@/components/ErrorAlert";
import { NewTicketForm } from "./_components/NewTicketForm";

export default function NewTicketPage() {
  const { books, loading: booksLoading, error: booksError } = useAuthorBooks();
  const create = useCreateTicket(books);

  if (booksLoading) {
    return <LoadingState message="Loading books…" />;
  }

  if (booksError) {
    return <ErrorAlert message={booksError} />;
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-900">Submit a Support Query</h2>
      <NewTicketForm {...create} />
    </div>
  );
}
