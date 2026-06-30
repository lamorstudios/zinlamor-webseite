import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Merchant } from "@/lib/types/database";
import { CreateMerchantForm } from "./CreateMerchantForm";

export default async function AdminPage() {
  const supabase = createClient();
  // Super-Admin sieht via RLS alle Händler.
  const { data } = await supabase
    .from("merchants")
    .select("*")
    .order("created_at", { ascending: false });
  const merchants = (data as Merchant[]) ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Händler verwalten</h1>
        <p className="opacity-70">{merchants.length} Händler insgesamt.</p>
      </div>

      <CreateMerchantForm />

      <div className="overflow-hidden rounded-brand border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Stempel</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {merchants.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center opacity-60">
                  Noch keine Händler. Lege oben den ersten an.
                </td>
              </tr>
            )}
            {merchants.map((m) => (
              <tr key={m.id} className="border-t border-white/5">
                <td className="px-4 py-3 font-medium">
                  <span
                    className="mr-2 inline-block h-3 w-3 rounded-full align-middle"
                    style={{ background: m.primary_color }}
                  />
                  {m.name}
                </td>
                <td className="px-4 py-3 font-mono text-xs opacity-70">
                  {m.slug}
                </td>
                <td className="px-4 py-3">{m.stamps_required}</td>
                <td className="px-4 py-3">
                  {m.active ? (
                    <span className="text-green-400">aktiv</span>
                  ) : (
                    <span className="opacity-50">inaktiv</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/dashboard/branding?merchant=${m.id}`}
                    className="underline opacity-80 hover:opacity-100"
                  >
                    Branding
                  </Link>
                  <Link
                    href={`/shop/${m.slug}`}
                    className="ml-3 underline opacity-80 hover:opacity-100"
                  >
                    Landing
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
