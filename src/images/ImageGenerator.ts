import type { CanvasManager } from "./CanvasManager";

const DPI = window.devicePixelRatio || 1;
const INITIAL_WIDTH = window.screen.width * DPI;
const INITIAL_HEIGHT = window.screen.height * DPI;
const INITIAL_COLOR = "#5f6a5e";
const BORDER_COLOR = "rgba(255,255,255,0.3)";
const READY_CLASS_NAME = "ready";

export type RenderParams = {
    flags: HTMLImageElement[];
    background: string;
};

export class ImageGenerator {
    #flagHeight = 30 * DPI;
    #flagWidth = 40 * DPI;
    #flagGap = 8 * DPI;

    constructor(
        private canvas: CanvasManager,
        private image: HTMLImageElement,
    ) {}

    #splitFlagsByRows(flags: HTMLImageElement[]): HTMLImageElement[][] {
        const maxFlags = Math.max(
            1,
            Math.floor(
                (this.canvas.width - this.#flagGap * 2) /
                    (this.#flagGap + this.#flagWidth),
            ),
        );

        const rows: HTMLImageElement[][] = [];

        for (let i = 0; i < flags.length; i += maxFlags) {
            rows.push(flags.slice(i, i + maxFlags));
        }

        return rows;
    }

    initialize() {
        this.canvas
            .setSize(INITIAL_WIDTH, INITIAL_HEIGHT)
            .fill(INITIAL_COLOR)
            .reflectTo(this.image);

        this.image.classList.add(READY_CLASS_NAME);
    }

    async render({ flags, background }: RenderParams) {
        this.canvas.setSize(INITIAL_WIDTH, INITIAL_HEIGHT).fill(background);

        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        const rows = this.#splitFlagsByRows(flags);

        let y = centerY - this.#flagHeight / 2;

        if (rows.length * (this.#flagHeight + this.#flagGap) > centerY) {
            y = Math.max(
                this.#flagGap,
                this.canvas.height -
                    (this.#flagHeight + this.#flagGap) * rows.length,
            );
        }

        for (const row of rows) {
            let x =
                centerX -
                (row.length * (this.#flagWidth + this.#flagGap) -
                    this.#flagGap) /
                    2;

            for (const flag of row) {
                this.canvas.drawImage(flag, {
                    x,
                    y,
                    width: this.#flagWidth,
                    height: this.#flagHeight,
                    borderWidth: DPI,
                    borderColor: BORDER_COLOR,
                });

                x += this.#flagWidth + this.#flagGap;
            }

            x =
                centerX -
                (rows[0].length * (this.#flagWidth + this.#flagGap) -
                    this.#flagGap) /
                    2;
            y += this.#flagHeight + this.#flagGap;
        }

        this.canvas.reflectTo(this.image);
    }
}
