"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAuth } from "@/lib/auth";
import { useAuthUser } from "@/hooks/useAuthUser";

const links = [
  { href: "/books", label: "My Books" },
  { href: "/tickets", label: "My Tickets" },
  { href: "/tickets/new", label: "Submit Query" },
];

export function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthUser();

  function logout() {
    clearAuth();
    router.push("/login");
  }

  return (
    <header className="border-b border-emerald-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
            BookLeaf
          </p>
          <h1 className="text-lg font-semibold text-slate-900">Author Portal</h1>
          {user && (
            <p className="text-sm text-slate-500">{user.name ?? user.email}</p>
          )}
        </div>
        <nav className="flex flex-wrap items-center gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                pathname === l.href || pathname.startsWith(l.href + "/")
                  ? "bg-emerald-600 text-white"
                  : "text-slate-700 hover:bg-emerald-50"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={logout}
            className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
