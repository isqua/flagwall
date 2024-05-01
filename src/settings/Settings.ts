import { isCheckable, toArrayOfStrings } from "../shared/utils";

type SettingsData = {
    countries: string[];
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
    }

    onChange(callback: SettingsListener) {
        this.form.addEventListener("change", () => {
            callback(this.getData());
        });
    }

    getData(): SettingsData {
        const data = new FormData(this.form);
        const countries = toArrayOfStrings(data.getAll("country"));

        return {
            countries: countries,
        };
    }
}
