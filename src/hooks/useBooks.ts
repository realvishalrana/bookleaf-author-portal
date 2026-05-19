"use client";

import { useEffect, useState } from "react";
import { listBooks } from "@/services/books.service";
import { getErrorMessage } from "@/lib/errors";
import type { AuthorBook } from "@/types/book";

export function useBooks() {
  const [books, setBooks] = useState<AuthorBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listBooks()
      .then(setBooks)
      .catch((err) => setError(getErrorMessage(err, "Failed to load books")))
      .finally(() => setLoading(false));
  }, []);

  return { books, loading, error };
}
