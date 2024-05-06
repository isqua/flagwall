export class StateManager {
    getCodes(): string[] {
        return window.location.hash.slice(1).split(",");
    }

    writeCodes(codes: string[]) {
        window.location.hash = codes.join(",");
    }
}
