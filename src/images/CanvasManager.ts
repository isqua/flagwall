type ImageParams = {
    x: number;
    y: number;
    width: number;
    height: number;
}

type BorderedImageParams = ImageParams & {
    borderWidth: number;
    borderColor: string;
}

function isBordered(params: ImageParams | BorderedImageParams): params is BorderedImageParams {
    return 'borderWidth' in params;
}

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

    drawImage(image: HTMLImageElement, params: (ImageParams | BorderedImageParams)) {
        if (isBordered(params)) {
            this.#context.fillStyle = params.borderColor;

            this.#context.fillRect(
                params.x - params.borderWidth,
                params.y - params.borderWidth,
                params.width + params.borderWidth * 2,
                params.height + params.borderWidth * 2,
            );
        }

        this.#context.drawImage(image, params.x, params.y, params.width, params.height);

        return this;
    }

    reflectTo(image: HTMLImageElement) {
        image.height = this.height;
        image.width = this.width;
        image.src = this.canvas.toDataURL('image/png');

        return this;
    }
}
