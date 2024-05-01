import type { CanvasManager } from "./CanvasManager";

const DPI = window.devicePixelRatio || 1;
const INITIAL_WIDTH = window.screen.width * DPI;
const INITIAL_HEIGHT = window.screen.height * DPI;
const INITIAL_COLOR = '#5f6a5e';

export class ImageGenerator {
    constructor(
        private canvas: CanvasManager,
        private image: HTMLImageElement,
    ) {}

    render() {
        this.canvas
            .setSize(INITIAL_WIDTH, INITIAL_HEIGHT)
            .fill(INITIAL_COLOR)
            .reflectTo(this.image);
    }
}
