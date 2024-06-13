import flags from "flag-icons/country.json";

import type { Country } from "flag-icons";

const SKIP = new Set(["eu", "xx", "un", "cefta", "arab"]);

export const countries: Country[] = flags.filter(
    (flag) => !SKIP.has(flag.code),
);
