import { getFlagSrc } from "../flags";
import { querySelectorSafe } from "../shared/utils";

import type { Country } from "flag-icons";

import "./CountrySelector.css";

export class CountrySelector {
    #countries: Country[] = [];

    constructor(
        private container: HTMLElement,
        private template: HTMLTemplateElement,
        private getChecked: () => string[],
    ) { }

    #makeItem(country: Country, isActive: boolean) {
        const clone = this.template.content.cloneNode(true) as HTMLLIElement;

        querySelectorSafe<HTMLInputElement>("input", clone).value = country.code;
        querySelectorSafe<HTMLInputElement>("input", clone).id = country.code;
        querySelectorSafe<HTMLInputElement>("input", clone).checked = isActive;
        querySelectorSafe<HTMLLabelElement>("label", clone).setAttribute("for", country.code);
        querySelectorSafe<HTMLSpanElement>("span", clone).innerText = country.name;
        querySelectorSafe<HTMLImageElement>("img", clone).src = getFlagSrc(country.code);

        return clone;
    }

    #draw(countries: Country[]) {
        this.container.innerHTML = "";

        const codes = this.getChecked();

        countries.forEach(country => {
            const isActive = codes.includes(country.code);
            const item = this.#makeItem(country, isActive);

            this.container.appendChild(item);
        });
    }

    filter(value: string) {
        const filtered = this.#countries.filter(country =>
            (`${country.name} ${country.code}`).toLowerCase()
                .includes(value.toLowerCase())
        );
        this.#draw(filtered);
    }

    initialize(countries: Country[]) {
        this.#countries = countries;
        this.#draw(countries);
    }
}
