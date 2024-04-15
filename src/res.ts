import JSONSpriteSheet from '@/game/partials/json-spritesheet';
import { ImageSource } from 'excalibur';
import JSONSpriteSheetAnimation from '@/game/partials/json-spritesheet-animation';

export default {
	assets: new JSONSpriteSheet('assets/assets.json'),
	animation: new JSONSpriteSheetAnimation(['assets/animations.json']),
	noise: new ImageSource('assets/noise.png'),
};
