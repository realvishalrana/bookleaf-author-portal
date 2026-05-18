"use client";

import { ATTACHMENT_ACCEPT, MAX_ATTACHMENT_SIZE_MB } from "@/constants/attachment";
import { Button } from "@/components/ui/Button";
import { ErrorAlert } from "@/components/ErrorAlert";
import type { useCreateTicket } from "@/hooks/useCreateTicket";

type Props = ReturnType<typeof useCreateTicket>;

export function NewTicketForm({
  books,
  bookId,
  subject,
  description,
  preview,
  error,
  loading,
  fileInputRef,
  setBookId,
  setSubject,
  setDescription,
  handleFileChange,
  clearFile,
  handleSubmit,
}: Props) {
  return (
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
        <label className="block text-sm font-medium text-slate-700">
          Description
        </label>
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
            (optional — image up to {MAX_ATTACHMENT_SIZE_MB} MB)
          </span>
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept={ATTACHMENT_ACCEPT}
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
      {error && <ErrorAlert message={error} className="" />}
      <Button type="submit" disabled={loading} className="py-2.5">
        {loading ? "Submitting…" : "Submit ticket"}
      </Button>
    </form>
  );
}
