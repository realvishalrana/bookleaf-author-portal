"use client";

import { useRedirectIfAuthenticated } from "@/hooks/useAuthRedirect";
import { useLogin } from "@/hooks/useLogin";
import { Button } from "@/components/ui/Button";
import { ErrorAlert } from "@/components/ErrorAlert";

export default function LoginPage() {
  useRedirectIfAuthenticated();
  const {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    handleSubmit,
  } = useLogin();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-emerald-100 bg-white p-8 shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
          BookLeaf
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Author Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Demo: priya.sharma@email.com / BookLeaf@2025
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              required
            />
          </div>
          {error && <ErrorAlert message={error} className="" />}
          <Button type="submit" disabled={loading} className="w-full py-2.5">
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
