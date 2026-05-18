"use client";

/** Books page — thin shell over useAuthorBooks and BooksTable. */

import { useAuthorBooks } from "@/hooks/useAuthorBooks";
import { LoadingState } from "@/components/LoadingState";
import { ErrorAlert } from "@/components/ErrorAlert";
import { BooksTable } from "./_components/BooksTable";

export default function BooksPage() {
  const { books, loading, error } = useAuthorBooks();

  if (loading) return <LoadingState message="Loading books…" />;
  if (error) return <ErrorAlert message={error} className="" />;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">My Books</h2>
      <p className="mt-1 text-slate-600">{books.length} title(s) in your catalog</p>
      <BooksTable books={books} />
    </div>
  );
}
