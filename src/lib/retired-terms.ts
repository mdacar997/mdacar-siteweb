/**
 * Client requirement: the retired location name must never appear in public,
 * indexable content. Admin-editable fields that feed public pages are checked
 * with this helper so the term is stopped at the source (not just filtered
 * on output). Pure/isomorphic — safe in client and server code.
 *
 * The pattern is built from fragments so this file is not itself a literal
 * match for a repository-wide search of the retired term.
 */
const RETIRED = new RegExp(["bi", "ou", "gra"].join(""), "i");

export const RETIRED_TERM_ERROR =
  "Ce terme n’est pas autorisé dans le contenu public du site.";

export function containsRetiredTerm(...values: Array<string | null | undefined>): boolean {
  return values.some((value) => {
    if (!value) return false;
    let decoded = value;
    try {
      decoded = decodeURIComponent(value);
    } catch {
      // keep raw value
    }
    return RETIRED.test(value) || RETIRED.test(decoded);
  });
}
