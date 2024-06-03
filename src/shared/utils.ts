export function querySelectorSafe<T extends Element = Element>(selector: string, root: ParentNode = document): T {
    const element = root.querySelector<T>(selector);

    if (!element) {
        throw new Error(`Element not found by query ${selector}`);
    }

    return element;
}

export function toString(data: FormDataEntryValue | null): string {
    if (typeof data !== "string") {
        return "";
    }

    return data;
}

export function toArrayOfStrings(data: FormDataEntryValue[]): string[] {
    if (!data) {
        return [];
    }

    if (!Array.isArray(data)) {
        return typeof data === "string" ? [data] : [];
    }

    if (typeof data[0] !== "string") {
        return [];
    }

    return data as string[];
}

export function isCheckable(element: Element): element is HTMLInputElement {
    return element instanceof HTMLInputElement && (element.type === "checkbox" || element.type === "radio");
}

export function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = () => resolve(image);
        image.onerror = reject;

        image.src = src;
    });
}

export async function getFullfiled<T>(promises: Promise<T>[]): Promise<T[]> {
    const results = await Promise.allSettled(promises)

    return results.reduce<T[]>((acc, result) => {
        if (result.status === 'fulfilled') {
            acc.push(result.value)
        }

        return acc;
    }, []);
}

export function makeDebounce() {
    let timeout: number = 0;

    return function (callback: () => void, delay: number) {
        clearTimeout(timeout);

        timeout = window.setTimeout(() => {
            callback();
        }, delay);
    };
}
