import { countries, getFlagSrc } from "./flags";
import { CanvasManager, ImageGenerator } from "./images";
import { Landing } from "./landing";
import { ColorSelector, CountrySelector, Settings, CountrySearch } from "./settings";
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
);

const countrySelector = new CountrySelector(
    querySelectorSafe<HTMLUListElement>(".countries-list"),
    querySelectorSafe<HTMLTemplateElement>("#country"),
    () => state.getCodes(),
);

const colorSelector = new ColorSelector(
    querySelectorSafe<HTMLUListElement>(".colors-list"),
    querySelectorSafe<HTMLTemplateElement>("#color"),
);

const settings = new Settings(querySelectorSafe<HTMLFormElement>("form"));
const manager = new CanvasManager(querySelectorSafe<HTMLCanvasElement>(".canvas"));
const generator = new ImageGenerator(manager, querySelectorSafe<HTMLImageElement>(".device-screen"));

async function draw({ countries, background }: SettingsData) {
    const flags = await getFullfiled(
        countries.map(code => loadImage(getFlagSrc(code)))
    );

    generator.render({ flags, background });
}

function main() {
    const codes = state.getCodes();

    countrySelector.initialize(countries);
    colorSelector.initialize();
    settings.initialize({ countries: codes });
    generator.initialize();
    draw(settings.getData());

    countrySearch.onChange(value => {
        countrySelector.filter(value)
    });

    settings.onChange(data => {
        state.writeCodes(data.countries);

        return draw(data);
    });

    sidebar.initialize();
    setTimeout(() => sidebar.toggle(true), 500);
}

landing.initialize(() => {
    main();
});
