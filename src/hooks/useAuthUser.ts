"use client";

import { useEffect, useState } from "react";
import { getUser, StoredUser } from "@/lib/auth";

/** Reads localStorage only after mount — avoids hydration mismatch. */
export function useAuthUser() {
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return user;
}
