import { countries, getFlagSrc } from "./flags";
import { CanvasManager, ImageGenerator } from "./images";
import { CountrySelector, Settings } from "./settings";
import { getFullfiled, loadImage, querySelectorSafe } from "./shared/utils";
import { Sidebar } from "./sidebar";

import "./style.css";

const canvas = querySelectorSafe<HTMLCanvasElement>(".canvas");
const image = querySelectorSafe<HTMLImageElement>(".device-screen");

const sidebar = new Sidebar(
    querySelectorSafe<HTMLElement>(".sidebar"),
    querySelectorSafe<HTMLButtonElement>(".sidebar-control"),
);

const settingsForm = querySelectorSafe<HTMLFormElement>("form");
const countriesList = querySelectorSafe<HTMLUListElement>(".countries-list");
const countryTemplate = querySelectorSafe<HTMLTemplateElement>("#country");

const countrySelector = new CountrySelector(countriesList, countryTemplate);
const settings = new Settings(settingsForm);

const manager = new CanvasManager(canvas);
const generator = new ImageGenerator(manager, image);

(async function main() {
    generator.initialize();

    const codes = window.location.hash.slice(1).split(",");

    countrySelector.initialize(countries);

    settings.initialize({
        countries: codes,
    });

    settings.onChange(async ({ countries }) => {
        window.location.hash = countries.join(',');

        const flags = await getFullfiled(
            countries.map(code => loadImage(getFlagSrc(code)))
        );

        generator.render(flags);
    });

    sidebar.initialize();

    const flags = await getFullfiled(
        codes.map(code => loadImage(getFlagSrc(code)))
    );

    generator.render(flags);
})();
