"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { setAuth } from "@/lib/auth";

export function useLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("priya.sharma@email.com");
  const [password, setPassword] = useState("BookLeaf@2025");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await api<{
        accessToken: string;
        user: {
          id: string;
          email: string;
          role: string;
          authorId: string | null;
          name: string | null;
        };
      }>("/api/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (data.user.role !== "AUTHOR") {
        setError("Please use the admin portal to sign in as admin.");
        return;
      }
      setAuth(data.accessToken, data.user);
      router.push("/books");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    handleSubmit,
  };
}
