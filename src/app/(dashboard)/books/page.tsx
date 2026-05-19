"use client";

import { useBooks } from "@/hooks/useBooks";
import { BooksTable } from "@/features/books/components/BooksTable";
import { Alert } from "@/components/ui/Alert";
import { LoadingState } from "@/components/ui/LoadingState";

export default function BooksPage() {
  const { books, loading, error } = useBooks();

  if (loading) return <LoadingState message="Loading books…" />;
  if (error) return <Alert>{error}</Alert>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">My Books</h2>
      <p className="mt-1 text-slate-600">{books.length} title(s) in your catalog</p>
      <BooksTable books={books} />
    </div>
  );
}
