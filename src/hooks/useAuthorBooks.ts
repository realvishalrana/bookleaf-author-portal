"use client";

/** Fetches the author's book catalog — shared by books page and new-ticket form. */

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { AuthorBook } from "@/types/book";

export function useAuthorBooks() {
  const [books, setBooks] = useState<AuthorBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<{ books: AuthorBook[] }>("/api/v1/author/books")
      .then((d) => setBooks(d.books))
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load books")
      )
      .finally(() => setLoading(false));
  }, []);

  return { books, loading, error };
}
