import { type Country } from "flag-icons";
import { isTextMatch } from "../shared/filter";
import { debounce } from "../shared/utils";

import "./CountrySearch.css";

const INPUT_DELAY_IN_MS = 300;

export class CountrySearch {
    constructor(
        private input: HTMLInputElement,
        private countries: Country[],
    ) { }

    #filterCountries(text: string): Set<string> {
        const filteredCountries = new Set<string>();

        for (const country of this.countries) {
            if (isTextMatch(country.name, text)) {
                filteredCountries.add(country.code);
            }
        }

        return filteredCountries;
    }

    onChange(callback: (codes: Set<string>) => void) {
        const debouncedCallback = debounce(() => {
            const filteredCountries = this.#filterCountries(this.input.value.trim());

            callback(filteredCountries);
        }, INPUT_DELAY_IN_MS);

        this.input.addEventListener("input", debouncedCallback);
    }
}
