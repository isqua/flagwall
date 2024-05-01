export class CanvasManager {
    #context: CanvasRenderingContext2D;

    constructor(protected canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            throw new Error('Canvas has no 2D context');
        }

        this.#context = ctx;
    }

    get width(): number {
        return this.canvas.width;
    }

    get height(): number {
        return this.canvas.height;
    }

    setSize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
        
        return this;
    }

    fill(color: string) {
        const prevColor = this.#context.fillStyle;

        this.#context.fillStyle = color;
        this.#context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.#context.fillStyle = prevColor;

        return this;
    }

    reflectTo(image: HTMLImageElement) {
        image.height = this.height;
        image.width = this.width;
        image.src = this.canvas.toDataURL('image/png');
    }
}
