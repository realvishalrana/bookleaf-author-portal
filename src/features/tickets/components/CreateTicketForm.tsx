"use client";

import { Card } from "@/components/ui/Card";
import { Select, type SelectOption } from "@/components/ui/Select";
import { TextInput } from "@/components/ui/TextInput";
import { TextArea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { ACCEPT_IMAGE_ATTR, MAX_ATTACHMENT_SIZE_MB } from "@/constants/upload";
import type { ChangeEvent, FormEvent, RefObject } from "react";

interface Props {
  bookId: string;
  subject: string;
  description: string;
  preview: string | null;
  error: string;
  loading: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  bookOptions: SelectOption[];
  setBookId: (v: string) => void;
  setSubject: (v: string) => void;
  setDescription: (v: string) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  clearFile: () => void;
  handleSubmit: (e: FormEvent) => void;
}

export function CreateTicketForm({
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
}: Props) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-900">Submit a Support Query</h2>
      <Card className="mt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Book"
            options={bookOptions}
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
          />
          <TextInput
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            minLength={3}
          />
          <TextArea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            required
            minLength={10}
          />
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
              accept={ACCEPT_IMAGE_ATTR}
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
                  aria-label="Remove attachment"
                >
                  ×
                </button>
              </div>
            )}
          </div>
          {error && <Alert>{error}</Alert>}
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting…" : "Submit ticket"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
