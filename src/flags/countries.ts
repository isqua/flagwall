import flags from "flag-icons/country.json";

import type { Country } from "flag-icons";

const SKIP = new Set(["arab", "cefta", "eac", "eu", "pc", "un", "xx"]);

export const countries: Country[] = flags.filter(
    (flag) => !SKIP.has(flag.code),
);
