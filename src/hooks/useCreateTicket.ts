"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_ATTACHMENT_SIZE_MB,
} from "@/constants/upload";
import { getErrorMessage } from "@/lib/errors";
import { listBookOptions } from "@/services/books.service";
import { createTicket } from "@/services/tickets.service";
import type { BookOption } from "@/types/book";

export function useCreateTicket() {
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
    listBookOptions().then(setBooks).catch(console.error);
  }, []);

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

      const ticket = await createTicket(formData);
      router.push(`/tickets/${ticket.id}`);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to submit"));
    } finally {
      setLoading(false);
    }
  }

  const bookOptions = [
    { value: "", label: "General / Account Level" },
    ...books.map((b) => ({ value: b.bookId, label: b.title })),
  ];

  return {
    bookId,
    subject,
    description,
    preview,
    error,
    loading,
    fileInputRef,
    bookOptions,
    setBookId,
    setSubject,
    setDescription,
    handleFileChange,
    clearFile,
    handleSubmit,
  };
}
