import { api } from "@/lib/api";
import type { LoginResponse } from "@/types/auth";

export async function login(email: string, password: string): Promise<LoginResponse> {
  return api<LoginResponse>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
