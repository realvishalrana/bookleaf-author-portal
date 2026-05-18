"use client";

import { DashboardNav } from "@/components/DashboardNav";
import { useRequireAuth } from "@/hooks/useAuthRedirect";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useRequireAuth();

  return (
    <div className="min-h-screen bg-emerald-50/40">
      <DashboardNav />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
