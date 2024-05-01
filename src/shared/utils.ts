export function querySelectorSafe<T extends Element = Element>(selector: string): T {
    const element = document.querySelector<T>(selector);

    if (!element) {
        throw new Error(`Element not found by query ${selector}`);
    }

    return element;
}
