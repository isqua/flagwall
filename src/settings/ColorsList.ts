import { querySelectorSafe } from "../shared/utils";

import "./ColorsList.css";

type Color = {
    name: string;
    code: string;
};

const colors: Color[] = [
    {
        name: "Olive",
        code: "#5f6a5e",
    },
    {
        name: "Sage",
        code: "#8B9467",
    },
    {
        name: "Stone",
        code: "#a8a29e",
    },
    {
        name: "Silver",
        code: "#f1f5f9",
    },
    {
        name: "Sand",
        code: "#eed9c4",
    },
    {
        name: "Rose",
        code: "#ecc5c0",
    },
    {
        name: "Lavender",
        code: "#C7B8EA",
    },
    {
        name: "Havelock Blue",
        code: "#5C6BC0",
    },
    {
        name: "Burgundy",
        code: "#8B0A1A",
    },
];

export class ColorsList {
    constructor(
        private container: HTMLElement,
        private template: HTMLTemplateElement,
    ) {}

    initialize() {
        colors.forEach((color) => this.appendColorOption(color));
    }

    public appendColorOption(color: Color) {
        const clone = this.template.content.cloneNode(true) as HTMLLIElement;
        const id = color.code.replace("#", "");

        querySelectorSafe<HTMLInputElement>("input", clone).value = color.code;
        querySelectorSafe<HTMLInputElement>("input", clone).id = id;
        querySelectorSafe<HTMLLabelElement>("label", clone).setAttribute(
            "for",
            id,
        );
        querySelectorSafe<HTMLSpanElement>(".color-name", clone).innerText =
            color.name;
        querySelectorSafe<HTMLSpanElement>(
            ".color-flag",
            clone,
        ).style.backgroundColor = color.code;

        this.container.appendChild(clone);
    }
}
