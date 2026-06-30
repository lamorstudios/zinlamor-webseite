-- =====================================================================
--  Demo-Daten – zwei Beispiel-Händler zum Testen des White-Labelings.
--  Im Supabase SQL-Editor ausführen (nach den Migrationen).
-- =====================================================================

insert into public.merchants
  (slug, name, primary_color, secondary_color, background_color, card_color, text_color, stamps_required, reward_description, welcome_text)
values
  ('gelato-di-monaco', 'Gelato di Monaco',
   '#e11d48', '#fb7185', '#1c0a0f', '#2a0e15', '#fff1f2',
   10, '1 Gratis-Kugel Eis deiner Wahl',
   'Sammle 10 Stempel und genieße eine Kugel aufs Haus! 🍦'),
  ('kaffeehaus-nord', 'Kaffeehaus Nord',
   '#0d9488', '#2dd4bf', '#06201d', '#0a2c28', '#ecfdf5',
   8, '1 Gratis-Kaffee',
   'Jeder 8. Kaffee geht aufs Haus. ☕')
on conflict (slug) do nothing;

-- Hinweis: merchant_users-Zuordnung erfolgt nach dem ersten Login.
-- Beispiel (User-UUID aus auth.users einsetzen):
--   insert into public.merchant_users (merchant_id, user_id, role)
--   select id, '<AUTH_USER_UUID>', 'owner' from public.merchants where slug = 'gelato-di-monaco';
--
-- Super-Admin freischalten:
--   update public.profiles set is_super_admin = true where id = '<AUTH_USER_UUID>';
