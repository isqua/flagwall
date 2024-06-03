import { makeDebounce } from "../shared/utils";
import "./CountrySearch.css";

const debounce = makeDebounce();

export class CountrySearch {
    constructor(
        private input: HTMLInputElement,
    ) { }

    onChange(callback: (value: string) => void) {
        this.input.addEventListener("input", () =>
            debounce(() => callback(this.input.value), 300)
        );
    }
}
