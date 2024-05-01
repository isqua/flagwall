import { getFlagSrc } from './flags/flagIcons';
import { CanvasManager, ImageGenerator } from './images';
import { loadImage, querySelectorSafe } from './shared/utils';

import './style.css';

const canvas = querySelectorSafe<HTMLCanvasElement>('.canvas');
const image = querySelectorSafe<HTMLImageElement>('.device-screen');

const manager = new CanvasManager(canvas);
const generator = new ImageGenerator(manager, image);

(async function main() {
    generator.render(await loadImage(getFlagSrc('al')));
})();
