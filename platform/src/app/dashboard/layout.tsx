import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionContext } from "@/lib/auth";
import { signOut } from "@/app/actions/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctx = await getSessionContext();
  if (!ctx) redirect("/login");

  const canManage =
    ctx.isSuperAdmin ||
    ctx.memberships.some((m) => m.role === "owner" || m.role === "admin");

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/dashboard" className="font-semibold">
              Dashboard
            </Link>
            {canManage && (
              <Link href="/dashboard/branding" className="opacity-80 hover:opacity-100">
                Branding
              </Link>
            )}
            {ctx.isSuperAdmin && (
              <Link href="/admin" className="opacity-80 hover:opacity-100">
                Super-Admin
              </Link>
            )}
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <span className="opacity-60">{ctx.email}</span>
            <form action={signOut}>
              <button className="rounded-lg border border-white/20 px-3 py-1 hover:bg-white/5">
                Abmelden
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
    </div>
  );
}
