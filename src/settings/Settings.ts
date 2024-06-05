import { isCheckable, toArrayOfStrings, toString } from "../shared/utils";

export type SettingsData = {
    countries: string[];
    background: string;
}

type SettingsListener = (data: SettingsData) => void;

export class Settings {
    constructor(
        private form: HTMLFormElement,
    ) { }

    initialize(data: Partial<SettingsData>) {
        const countries = new Set(data.countries ?? []);

        if (data.countries) {
            const inputs = this.form.querySelectorAll("input[name=country]");

            for (let input of inputs) {
                if (isCheckable(input)) {
                    input.checked = countries.has(input.value);
                }
            }
        }

        const firstBackgroundColor = this.form.querySelector("input[name=background]");

        if (firstBackgroundColor && isCheckable(firstBackgroundColor)) {
            firstBackgroundColor.checked = true;
        }
    }

    onChange(callback: SettingsListener) {
        this.form.addEventListener("change", () => {
            callback(this.getData());
        });

        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            callback(this.getData());
        });
    }

    getData(): SettingsData {
        const data = new FormData(this.form);
        const countries = toArrayOfStrings(data.getAll("country"));
        const background = toString(data.get("background"));

        return {
            countries,
            background,
        };
    }
}
