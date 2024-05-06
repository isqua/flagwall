import { countries, getFlagSrc } from "./flags";
import { CanvasManager, ImageGenerator } from "./images";
import { Landing } from "./landing";
import { CountrySelector, Settings } from "./settings";
import { getFullfiled, loadImage, querySelectorSafe } from "./shared/utils";
import { Sidebar } from "./sidebar";
import { StateManager } from "./state";

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

const countrySelector = new CountrySelector(
    querySelectorSafe<HTMLUListElement>(".countries-list"),
    querySelectorSafe<HTMLTemplateElement>("#country"),
);

const settings = new Settings(querySelectorSafe<HTMLFormElement>("form"));
const manager = new CanvasManager(querySelectorSafe<HTMLCanvasElement>(".canvas"));
const generator = new ImageGenerator(manager, querySelectorSafe<HTMLImageElement>(".device-screen"));

async function draw(codes: string[]) {
    const flags = await getFullfiled(
        codes.map(code => loadImage(getFlagSrc(code)))
    );

    generator.render(flags);
}

function main() {
    const codes = state.getCodes();

    countrySelector.initialize(countries);
    settings.initialize({ countries: codes });
    generator.initialize();
    draw(codes);

    settings.onChange(({ countries }) => {
        state.writeCodes(countries);

        return draw(countries);
    });

    sidebar.initialize();
    setTimeout(() => sidebar.toggle(true), 500);
}

landing.initialize(() => {
    main();
});
