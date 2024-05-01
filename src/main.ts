import { getFlagSrc } from './flags/flagIcons';
import { CanvasManager, ImageGenerator } from './images';
import { getFullfiled, loadImage, querySelectorSafe } from './shared/utils';

import './style.css';

const canvas = querySelectorSafe<HTMLCanvasElement>('.canvas');
const image = querySelectorSafe<HTMLImageElement>('.device-screen');

const manager = new CanvasManager(canvas);
const generator = new ImageGenerator(manager, image);
const codes = window.location.hash.slice(1).split(',');

(async function main() {
    const flags = await getFullfiled(
        codes.map(code => loadImage(getFlagSrc(code)))
    );

    generator.render(flags);
})();
