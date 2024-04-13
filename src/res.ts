import JSONSpriteSheet from '@/game/partials/json-spritesheet';
import { ImageSource } from 'excalibur';

export default {
	assets: new JSONSpriteSheet('/assets/assets.json'),
	noise: new ImageSource('/assets/noise.png')
};
