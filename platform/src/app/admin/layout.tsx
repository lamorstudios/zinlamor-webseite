import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionContext } from "@/lib/auth";
import { signOut } from "@/app/actions/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctx = await getSessionContext();
  if (!ctx) redirect("/login");
  if (!ctx.isSuperAdmin) redirect("/dashboard");

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-brand-card/40">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/admin" className="font-semibold">
              Super-Admin
            </Link>
            <Link href="/dashboard" className="opacity-80 hover:opacity-100">
              Zum Dashboard
            </Link>
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
