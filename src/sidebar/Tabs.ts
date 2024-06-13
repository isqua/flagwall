const CLOSED_TAB_CLASS = "sidebar-tabpanel-hidden";

/* @see https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/ */
export class TabsAutomatic {
    private tablistNode: HTMLElement;
    private tabpanels: HTMLElement[];
    private tabs: HTMLElement[];
    private firstTab: null | HTMLElement;
    private lastTab: null | HTMLElement;

    constructor(groupNode: HTMLElement) {
        this.tablistNode = groupNode;

        this.tabs = [];

        this.firstTab = null;
        this.lastTab = null;

        this.tabs = Array.from(this.tablistNode.querySelectorAll("[role=tab]"));
        this.tabpanels = [];

        for (let i = 0; i < this.tabs.length; i += 1) {
            const tab = this.tabs[i];
            const tabpanel = document.getElementById(
                tab.getAttribute("aria-controls") ?? "",
            );

            if (!tabpanel) {
                continue;
            }

            tab.tabIndex = -1;
            tab.setAttribute("aria-selected", "false");
            this.tabpanels.push(tabpanel);

            tab.addEventListener("keydown", this.onKeydown.bind(this));
            tab.addEventListener("click", this.onClick.bind(this));

            if (!this.firstTab) {
                this.firstTab = tab;
            }

            this.lastTab = tab;
        }

        this.setSelectedTab(this.firstTab, false);
    }

    setSelectedTab(currentTab: HTMLElement | null, setFocus: boolean = true) {
        for (let i = 0; i < this.tabs.length; i += 1) {
            const tab = this.tabs[i];
            if (currentTab === tab) {
                tab.setAttribute("aria-selected", "true");
                tab.removeAttribute("tabindex");
                this.tabpanels[i].classList.remove(CLOSED_TAB_CLASS);
                if (setFocus) {
                    tab.focus();
                }
            } else {
                tab.setAttribute("aria-selected", "false");
                tab.tabIndex = -1;
                this.tabpanels[i].classList.add(CLOSED_TAB_CLASS);
            }
        }
    }

    setSelectedToPreviousTab(currentTab: HTMLElement) {
        if (currentTab === this.firstTab) {
            this.setSelectedTab(this.lastTab);
        } else {
            const index = this.tabs.indexOf(currentTab);
            this.setSelectedTab(this.tabs[index - 1]);
        }
    }

    setSelectedToNextTab(currentTab: HTMLElement) {
        let index;

        if (currentTab === this.lastTab) {
            this.setSelectedTab(this.firstTab);
        } else {
            index = this.tabs.indexOf(currentTab);
            this.setSelectedTab(this.tabs[index + 1]);
        }
    }

    onKeydown(event: KeyboardEvent) {
        const tgt = event.currentTarget;
        let flag = false;

        if (tgt instanceof HTMLElement) {
            switch (event.key) {
                case "ArrowLeft":
                    this.setSelectedToPreviousTab(tgt);
                    flag = true;
                    break;

                case "ArrowRight":
                    this.setSelectedToNextTab(tgt);
                    flag = true;
                    break;

                case "Home":
                    this.setSelectedTab(this.firstTab);
                    flag = true;
                    break;

                case "End":
                    this.setSelectedTab(this.lastTab);
                    flag = true;
                    break;

                default:
                    break;
            }
        }

        if (flag) {
            event.stopPropagation();
            event.preventDefault();
        }
    }

    onClick(event: MouseEvent) {
        if (event.currentTarget instanceof HTMLElement) {
            this.setSelectedTab(event.currentTarget);
        }
    }
}
