import { TabsAutomatic } from "./Tabs";

import "./Sidebar.css";

const CLOSED_MENU_CLASS = "hidden";
const EXPANDED = "aria-expanded";

export class Sidebar {
    constructor(
        private sidebar: HTMLElement,
        private control: HTMLButtonElement,
    ) {
        new TabsAutomatic(this.sidebar);
    }

    initialize() {
        this.control.addEventListener("click", () => {
            this.toggle(!this.isOpen());
        });

        document.addEventListener("click", (event) => {
            if (this.#isOutsideClick(event)) {
                this.toggle(false);
            }
        });
    }

    isOpen() {
        return this.control.getAttribute(EXPANDED) === "true";
    }

    toggle(open: boolean) {
        if (open) {
            this.control.setAttribute(EXPANDED, "true");
            this.sidebar.classList.remove(CLOSED_MENU_CLASS);
            this.sidebar.focus();
        } else {
            this.control.setAttribute(EXPANDED, "false");
            this.sidebar.classList.add(CLOSED_MENU_CLASS);
        }
    }

    #isOutsideClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const clickedInsideMenu = this.sidebar.contains(target);
        const clickedOnMenuButton =
            target === this.control || this.control.contains(target);

        return !clickedInsideMenu && !clickedOnMenuButton;
    }
}
