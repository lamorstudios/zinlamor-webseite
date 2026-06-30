import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase-Client für Server Components / Route Handlers.
 * Nutzt den Anon-Key + Session-Cookie → RLS greift mit der Identität des Users.
 */
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options as never),
            );
          } catch {
            // In Server Components kann nicht gesetzt werden – das übernimmt
            // die Middleware. Hier bewusst ignorieren.
          }
        },
      },
    },
  );
}

/**
 * Admin-Client mit Service-Role-Key (umgeht RLS).
 * NUR serverseitig für privilegierte Aktionen verwenden
 * (z.B. Händler anlegen, Kundenkarte öffentlich per Token laden).
 */
export function createAdminClient() {
  const { createClient: createRawClient } = require("@supabase/supabase-js");
  return createRawClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
