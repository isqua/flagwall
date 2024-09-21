import { querySelectorSafe } from "../shared/utils";

import "./ColorAdd.css";

type AddColorCallback = (color: string) => void;

export class ColorAdd {
    #colorForm: HTMLFormElement;

    constructor(
        private opener: HTMLButtonElement,
        private dialog: HTMLDialogElement,
    ) {
        this.#colorForm = querySelectorSafe<HTMLFormElement>("form", dialog);
    }

    initialize() {
        this.opener.addEventListener("click", () => this.#showPopup());

        this.#colorForm
            .querySelector('button[type="button"]')
            ?.addEventListener("click", () => this.#hidePopup());
    }

    onAdd(callback: AddColorCallback) {
        this.#colorForm.addEventListener("submit", () => {
            const value = this.#colorForm.color.value;

            callback(value);
        });
    }

    #showPopup() {
        this.dialog.showModal();
        setTimeout(() => this.#colorForm.color.click(), 10);
    }

    #hidePopup() {
        this.dialog.close();
    }
}
