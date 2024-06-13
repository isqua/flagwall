import type { CanvasManager } from "./CanvasManager";

const DPI = window.devicePixelRatio || 1;
const INITIAL_WIDTH = window.screen.width * DPI;
const INITIAL_HEIGHT = window.screen.height * DPI;
const INITIAL_COLOR = "#5f6a5e";
const BORDER_COLOR = "#fff";
const READY_CLASS_NAME = "ready";

const FLAG_HEIGHT = 30 * DPI;
const FLAG_WIDTH = 40 * DPI;
const FLAG_GAP = 8 * DPI;

export type RenderParams = {
    flags: HTMLImageElement[];
    background: string;
};

export class ImageGenerator {
    constructor(
        private canvas: CanvasManager,
        private image: HTMLImageElement,
    ) {}

    #splitFlagsByRows(flags: HTMLImageElement[]): HTMLImageElement[][] {
        const maxFlags = Math.max(
            1,
            Math.floor(
                (this.canvas.width - FLAG_GAP * 2) / (FLAG_GAP + FLAG_WIDTH),
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

        let y = centerY - FLAG_HEIGHT / 2;

        if (rows.length * (FLAG_HEIGHT + FLAG_GAP) > centerY) {
            y = Math.max(
                FLAG_GAP,
                this.canvas.height - (FLAG_HEIGHT + FLAG_GAP) * rows.length,
            );
        }

        for (const row of rows) {
            let x =
                centerX - (row.length * (FLAG_WIDTH + FLAG_GAP) - FLAG_GAP) / 2;

            for (const flag of row) {
                this.canvas.drawImage(flag, {
                    x,
                    y,
                    width: FLAG_WIDTH,
                    height: FLAG_HEIGHT,
                    borderWidth: DPI,
                    borderColor: BORDER_COLOR,
                });

                x += FLAG_WIDTH + FLAG_GAP;
            }

            x =
                centerX -
                (rows[0].length * (FLAG_WIDTH + FLAG_GAP) - FLAG_GAP) / 2;
            y += FLAG_HEIGHT + FLAG_GAP;
        }

        this.canvas.reflectTo(this.image);
    }
}
