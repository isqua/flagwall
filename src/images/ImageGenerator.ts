import type { CanvasManager } from "./CanvasManager";

const DPI = window.devicePixelRatio || 1;
const INITIAL_WIDTH = window.screen.width * DPI;
const INITIAL_HEIGHT = window.screen.height * DPI;
const INITIAL_COLOR = '#5f6a5e';

const FLAG_HEIGHT = 30 * DPI;

export class ImageGenerator {
    constructor(
        private canvas: CanvasManager,
        private image: HTMLImageElement,
    ) { }

    async render(flag: HTMLImageElement) {
        this.canvas
            .setSize(INITIAL_WIDTH, INITIAL_HEIGHT)
            .fill(INITIAL_COLOR);

        const flagWidth = Math.round(flag.width / flag.height * FLAG_HEIGHT);
        const x = (this.canvas.width - flagWidth) / 2;
        const y = (this.canvas.height - FLAG_HEIGHT) / 2;

        this.canvas.drawImage(flag, {
            x,
            y,
            width: flagWidth,
            height: FLAG_HEIGHT,
            borderWidth: DPI,
            borderColor: '#fff',
        });
        
        this.canvas.reflectTo(this.image);
    }
}
