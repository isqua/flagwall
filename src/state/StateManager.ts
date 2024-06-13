const COUNTRIES_STORAGE_NAME = "countries";

export class StateManager {
    getCodes(): string[] {
        let countriesList = window.location.hash.slice(1);

        if (countriesList.length === 0 && localStorage) {
            countriesList = localStorage.getItem(COUNTRIES_STORAGE_NAME) ?? "";
        }

        return countriesList.split(",");
    }

    writeCodes(codes: string[]) {
        const countriesList = codes.join(",");

        window.location.hash = countriesList;

        if (localStorage) {
            localStorage.setItem(COUNTRIES_STORAGE_NAME, countriesList);
        }
    }
}
