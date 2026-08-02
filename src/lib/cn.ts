/** Kleiner Classname-Helfer (keine externe Abhängigkeit nötig). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
