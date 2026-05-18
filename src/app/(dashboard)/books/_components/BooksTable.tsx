"use client";

import type { AuthorBook } from "@/types/book";

interface Props {
  books: AuthorBook[];
}

export function BooksTable({ books }: Props) {
  return (
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
  );
}
