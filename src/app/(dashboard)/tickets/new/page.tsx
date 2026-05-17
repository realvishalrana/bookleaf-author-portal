"use client";

/** Submit a Support Query — book selector, text fields, optional image attachment. */

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import type { BookOption } from "@/types/book";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_SIZE_MB = 5;

export default function NewTicketPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [books, setBooks] = useState<BookOption[]>([]);
  const [bookId, setBookId] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api<{ books: BookOption[] }>("/api/v1/author/books").then((d) =>
      setBooks(d.books)
    );
  }, []);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0] ?? null;
    if (!picked) {
      setFile(null);
      setPreview(null);
      return;
    }
    if (!ALLOWED_TYPES.includes(picked.type)) {
      setError("Only image files are allowed (jpeg, png, gif, webp)");
      e.target.value = "";
      return;
    }
    if (picked.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Image must be smaller than ${MAX_SIZE_MB} MB`);
      e.target.value = "";
      return;
    }
    setError("");
    setFile(picked);
    setPreview(URL.createObjectURL(picked));
  }

  function clearFile() {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      if (bookId) formData.append("bookId", bookId);
      formData.append("subject", subject);
      formData.append("description", description);
      if (file) formData.append("attachment", file);

      const res = await api<{ ticket: { id: string } }>(
        "/api/v1/author/tickets",
        { method: "POST", body: formData }
      );
      router.push(`/tickets/${res.ticket.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-900">Submit a Support Query</h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-xl border bg-white p-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">Book</label>
          <select
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          >
            <option value="">General / Account Level</option>
            {books.map((b) => (
              <option key={b.bookId} value={b.bookId}>
                {b.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Subject</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            required
            minLength={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            required
            minLength={10}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Attachment{" "}
            <span className="font-normal text-slate-400">
              (optional — image up to {MAX_SIZE_MB} MB)
            </span>
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleFileChange}
            className="mt-1 w-full text-sm"
          />
          {preview && (
            <div className="relative mt-3 inline-block">
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 rounded-lg border border-slate-200 object-contain"
              />
              <button
                type="button"
                onClick={clearFile}
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
              >
                ×
              </button>
            </div>
          )}
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-emerald-600 px-6 py-2.5 font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? "Submitting…" : "Submit ticket"}
        </button>
      </form>
    </div>
  );
}
