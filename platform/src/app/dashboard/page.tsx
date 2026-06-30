import Link from "next/link";
import { getSessionContext } from "@/lib/auth";

const ROLE_LABEL: Record<string, string> = {
  owner: "Inhaber",
  admin: "Admin",
  staff: "Mitarbeiter",
};

export default async function DashboardPage() {
  const ctx = await getSessionContext();
  if (!ctx) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Willkommen 👋</h1>
        <p className="opacity-70">
          {ctx.isSuperAdmin
            ? "Du bist als Super-Admin angemeldet."
            : "Deine Läden im Überblick."}
        </p>
      </div>

      {ctx.memberships.length === 0 && !ctx.isSuperAdmin && (
        <div className="rounded-brand border border-white/10 bg-brand-card p-6">
          <p className="font-semibold">Noch kein Laden zugewiesen</p>
          <p className="mt-1 text-sm opacity-70">
            Dein Account ist noch keinem Händler zugeordnet. Bitte den
            Plattform-Admin, dich einem Laden hinzuzufügen.
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {ctx.memberships.map(({ merchant, role }) => (
          <div
            key={merchant.id}
            className="rounded-brand border border-white/10 bg-brand-card p-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{merchant.name}</h2>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
                {ROLE_LABEL[role] ?? role}
              </span>
            </div>
            <p className="mt-1 text-sm opacity-60">
              {merchant.stamps_required} Stempel → {merchant.reward_description}
            </p>
            <div className="mt-4 flex gap-3 text-sm">
              <Link
                href={`/shop/${merchant.slug}`}
                className="underline opacity-80 hover:opacity-100"
              >
                Landingpage ansehen
              </Link>
              {(role === "owner" || role === "admin" || ctx.isSuperAdmin) && (
                <Link
                  href="/dashboard/branding"
                  className="underline opacity-80 hover:opacity-100"
                >
                  Branding bearbeiten
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
