import { querySelectorSafe } from "../shared/utils";

import "./Landing.css";

type CloseLandingCallback = () => void;

const HIDDEN_CLASS = "hidden";

export class Landing {
    constructor(
        private landing: HTMLElement,
        private app: HTMLElement,
    ) {}

    initialize(callback: CloseLandingCallback) {
        const button = querySelectorSafe<HTMLButtonElement>(
            "button",
            this.landing,
        );

        button.addEventListener("click", () => this.close(callback));
    }

    close(callback: CloseLandingCallback) {
        this.app.classList.remove(HIDDEN_CLASS);
        this.landing.classList.add(HIDDEN_CLASS);

        callback();
    }
}
