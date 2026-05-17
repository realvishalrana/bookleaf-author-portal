"use client";

/** Books page — author's full catalog with royalty figures. */

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { AuthorBook } from "@/types/book";

export default function BooksPage() {
  const [books, setBooks] = useState<AuthorBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api<{ books: AuthorBook[] }>("/api/v1/author/books")
      .then((d) => setBooks(d.books))
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-600">Loading books…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">My Books</h2>
      <p className="mt-1 text-slate-600">{books.length} title(s) in your catalog</p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">ISBN</th>
              <th className="px-4 py-3">Genre</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">MRP</th>
              <th className="px-4 py-3">Sold</th>
              <th className="px-4 py-3">Earned</th>
              <th className="px-4 py-3">Paid</th>
              <th className="px-4 py-3">Pending</th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.bookId} className="border-b last:border-0">
                <td className="px-4 py-3 font-medium">{b.title}</td>
                <td className="px-4 py-3 text-slate-500">{b.isbn ?? "—"}</td>
                <td className="px-4 py-3 text-slate-500">{b.genre ?? "—"}</td>
                <td className="px-4 py-3 text-slate-500">
                  {b.publicationDate
                    ? new Date(b.publicationDate).toLocaleDateString()
                    : "—"}
                </td>
                <td className="px-4 py-3">{b.status}</td>
                <td className="px-4 py-3">{b.mrp != null ? `₹${b.mrp}` : "—"}</td>
                <td className="px-4 py-3">{b.totalCopiesSold}</td>
                <td className="px-4 py-3">₹{b.totalRoyaltyEarned.toLocaleString()}</td>
                <td className="px-4 py-3">₹{b.royaltyPaid.toLocaleString()}</td>
                <td className="px-4 py-3 font-medium text-amber-700">
                  ₹{b.royaltyPending.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
