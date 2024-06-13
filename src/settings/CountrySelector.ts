import { getFlagSrc } from "../flags";
import { querySelectorSafe } from "../shared/utils";

import type { Country } from "flag-icons";

import "./CountrySelector.css";

const HIDDEN_CLS = "country-hidden";

export class CountrySelector {
    constructor(
        private container: HTMLElement,
        private template: HTMLTemplateElement,
    ) { }

    initialize(countries: Country[]) {
        countries.forEach(country => {
            const clone = this.template.content.cloneNode(true) as HTMLLIElement;

            clone.children[0].setAttribute("data-code", country.code);
            querySelectorSafe<HTMLInputElement>("input", clone).value = country.code;
            querySelectorSafe<HTMLInputElement>("input", clone).id = country.code;
            querySelectorSafe<HTMLLabelElement>("label", clone).setAttribute("for", country.code);
            querySelectorSafe<HTMLSpanElement>("span", clone).innerText = country.name;
            querySelectorSafe<HTMLImageElement>("img", clone).src = getFlagSrc(country.code);

            this.container.appendChild(clone);
        });
    }

    setVisibleCountries(codes: Set<string>) {
        const countries = this.container.querySelectorAll<HTMLElement>("[data-code]");

        for (const country of countries) {
            const code = country.dataset.code as string;

            country.classList.toggle(HIDDEN_CLS, !codes.has(code));
        }
    }
}
