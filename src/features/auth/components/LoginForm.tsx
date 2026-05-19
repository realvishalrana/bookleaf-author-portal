"use client";

import { useLogin } from "@/hooks/useLogin";
import { TextInput } from "@/components/ui/TextInput";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

export function LoginForm() {
  const {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    handleSubmit,
    showDevHint,
  } = useLogin();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-emerald-100 bg-white p-8 shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
          BookLeaf
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Author Login</h1>
        {showDevHint && (
          <p className="mt-2 text-sm text-slate-600">
            Demo: priya.sharma@email.com / BookLeaf@2025
          </p>
        )}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <TextInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Alert>{error}</Alert>}
          <Button type="submit" variant="primary" className="w-full py-2.5" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
