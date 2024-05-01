import { getFlagSrc } from "../flags";
import { querySelectorSafe } from "../shared/utils";

import type { Country } from "flag-icons";

import "./CountrySelector.css";

export class CountrySelector {
    constructor(
        private container: HTMLElement,
        private template: HTMLTemplateElement,
    ) { }

    initialize(countries: Country[]) {
        countries.forEach(country => {
            const clone = this.template.content.cloneNode(true) as HTMLLIElement;

            querySelectorSafe<HTMLInputElement>("input", clone).value = country.code;
            querySelectorSafe<HTMLInputElement>("input", clone).id = country.code;
            querySelectorSafe<HTMLLabelElement>("label", clone).setAttribute("for", country.code);
            querySelectorSafe<HTMLSpanElement>("span", clone).innerText = country.name;
            querySelectorSafe<HTMLImageElement>("img", clone).src = getFlagSrc(country.code);

            this.container.appendChild(clone);
        });
    }
}
