export function querySelectorSafe<T extends Element = Element>(selector: string): T {
    const element = document.querySelector<T>(selector);

    if (!element) {
        throw new Error(`Element not found by query ${selector}`);
    }

    return element;
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
