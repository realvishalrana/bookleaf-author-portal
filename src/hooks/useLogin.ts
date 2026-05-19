"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";
import { setAuth, getToken } from "@/lib/auth";
import { getErrorMessage } from "@/lib/errors";

const DEV_EMAIL = "priya.sharma@email.com";
const DEV_PASSWORD = "BookLeaf@2025";

export function useLogin() {
  const router = useRouter();
  const [email, setEmail] = useState(
    process.env.NODE_ENV === "development" ? DEV_EMAIL : ""
  );
  const [password, setPassword] = useState(
    process.env.NODE_ENV === "development" ? DEV_PASSWORD : ""
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getToken()) router.replace("/books");
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await login(email, password);
      if (data.user.role !== "AUTHOR") {
        setError("Please use the admin portal to sign in as admin.");
        return;
      }
      setAuth(data.accessToken, data.user);
      router.push("/books");
    } catch (err) {
      setError(getErrorMessage(err, "Login failed"));
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
    showDevHint: process.env.NODE_ENV === "development",
  };
}
