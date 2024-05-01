import { CanvasManager, ImageGenerator } from './images';
import { querySelectorSafe } from './shared/utils';

import './style.css';

const canvas = querySelectorSafe<HTMLCanvasElement>('.canvas');
const image = querySelectorSafe<HTMLImageElement>('.device-screen');

const manager = new CanvasManager(canvas);
const generator = new ImageGenerator(manager, image);

generator.render();
