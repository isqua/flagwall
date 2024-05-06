import { countries, getFlagSrc } from "./flags";
import { CanvasManager, ImageGenerator } from "./images";
import { Landing } from "./landing";
import { CountrySelector, Settings } from "./settings";
import { getFullfiled, loadImage, querySelectorSafe } from "./shared/utils";
import { Sidebar } from "./sidebar";

import "./style.css";

const landing = new Landing(
    querySelectorSafe<HTMLElement>(".landing"),
    querySelectorSafe<HTMLElement>(".app"),
);

const sidebar = new Sidebar(
    querySelectorSafe<HTMLElement>(".sidebar"),
    querySelectorSafe<HTMLButtonElement>(".sidebar-control"),
);

const countrySelector = new CountrySelector(
    querySelectorSafe<HTMLUListElement>(".countries-list"),
    querySelectorSafe<HTMLTemplateElement>("#country"),
);

const settings = new Settings(querySelectorSafe<HTMLFormElement>("form"));
const manager = new CanvasManager(querySelectorSafe<HTMLCanvasElement>(".canvas"));
const generator = new ImageGenerator(manager, querySelectorSafe<HTMLImageElement>(".device-screen"));

async function main() {
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
}

landing.initialize(() => {
    main();
});
