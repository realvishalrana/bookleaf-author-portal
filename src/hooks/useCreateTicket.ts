"use client";

/** Form state and submit logic for creating a new support ticket. */

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_ATTACHMENT_SIZE_MB,
} from "@/constants/attachment";
import type { AuthorBook } from "@/types/book";

export function useCreateTicket(books: AuthorBook[]) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [bookId, setBookId] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0] ?? null;
    if (!picked) {
      setFile(null);
      setPreview(null);
      return;
    }
    if (!(ALLOWED_IMAGE_TYPES as readonly string[]).includes(picked.type)) {
      setError("Only image files are allowed (jpeg, png, gif, webp)");
      e.target.value = "";
      return;
    }
    if (picked.size > MAX_ATTACHMENT_SIZE_MB * 1024 * 1024) {
      setError(`Image must be smaller than ${MAX_ATTACHMENT_SIZE_MB} MB`);
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

  return {
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
  };
}
