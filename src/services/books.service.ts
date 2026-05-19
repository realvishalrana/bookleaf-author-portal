import { api } from "@/lib/api";
import type { AuthorBook, BookOption } from "@/types/book";

export async function listBooks(): Promise<AuthorBook[]> {
  const data = await api<{ books: AuthorBook[] }>("/api/v1/author/books");
  return data.books;
}

export async function listBookOptions(): Promise<BookOption[]> {
  const books = await listBooks();
  return books.map((b) => ({ bookId: b.bookId, title: b.title }));
}
