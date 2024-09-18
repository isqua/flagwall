import { countries, getFlagSrc } from "./flags";
import { CanvasManager, ImageGenerator } from "./images";
import { Landing } from "./landing";
import {
    ColorAdd,
    ColorSelector,
    CountriesList,
    CountrySearch,
    Settings,
} from "./settings";
import { getFullfiled, loadImage, querySelectorSafe } from "./shared/utils";
import { Sidebar } from "./sidebar";
import { StateManager } from "./state";

import type { SettingsData } from "./settings";

import "./style.css";

const state = new StateManager();

const landing = new Landing(
    querySelectorSafe<HTMLElement>(".landing"),
    querySelectorSafe<HTMLElement>(".app"),
);

const sidebar = new Sidebar(
    querySelectorSafe<HTMLElement>(".sidebar"),
    querySelectorSafe<HTMLButtonElement>(".sidebar-control"),
);

const countrySearch = new CountrySearch(
    querySelectorSafe<HTMLInputElement>("#countries-search"),
    countries,
);

const countriesList = new CountriesList(
    querySelectorSafe<HTMLUListElement>(".countries-list"),
    querySelectorSafe<HTMLTemplateElement>("#country"),
);

const colorSelector = new ColorSelector(
    querySelectorSafe<HTMLUListElement>(".colors-list"),
    querySelectorSafe<HTMLTemplateElement>("#color"),
);

const colorAdd = new ColorAdd(
    querySelectorSafe<HTMLButtonElement>(".add-color"),
    querySelectorSafe<HTMLDialogElement>(".add-color-dialog"),
);

const settings = new Settings(querySelectorSafe<HTMLFormElement>("form"));
const manager = new CanvasManager(
    querySelectorSafe<HTMLCanvasElement>(".canvas"),
);
const generator = new ImageGenerator(
    manager,
    querySelectorSafe<HTMLImageElement>(".device-screen"),
);

async function draw({ countries, background }: SettingsData) {
    const flags = await getFullfiled(
        countries.map((code) => loadImage(getFlagSrc(code))),
    );

    generator.render({ flags, background });
}

function main() {
    const codes = state.getCodes();

    countriesList.initialize(countries);
    colorSelector.initialize();
    colorAdd.initialize((value) =>
        colorSelector.appendColorOption({ code: value, name: value }),
    );
    settings.initialize({ countries: codes });
    generator.initialize();
    draw(settings.getData());

    settings.onChange((data) => {
        state.writeCodes(data.countries);

        return draw(data);
    });

    countrySearch.onChange((visibleCountries) => {
        countriesList.setVisibleCountries(visibleCountries);
    });

    sidebar.initialize();
    setTimeout(() => sidebar.toggle(true), 500);
}

landing.initialize(() => {
    main();
});
