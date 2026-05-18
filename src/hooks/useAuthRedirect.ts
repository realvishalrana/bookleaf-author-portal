"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

/** Redirect to /books when already authenticated (login page). */
export function useRedirectIfAuthenticated() {
  const router = useRouter();

  useEffect(() => {
    if (getToken()) router.replace("/books");
  }, [router]);
}

/** Redirect to /login when not authenticated (dashboard layout). */
export function useRequireAuth() {
  const router = useRouter();

  useEffect(() => {
    if (!getToken()) router.replace("/login");
  }, [router]);
}
