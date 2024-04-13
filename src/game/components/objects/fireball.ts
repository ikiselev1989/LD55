import { Actor, Sprite, Vector } from 'excalibur';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import { TAGS } from '@/enums';

export default class Fireball extends Actor {
	onInitialize() {
		this.addTag(TAGS.Z_AXIS_SORT);
		this.initGraphics();
	}

	private initGraphics() {
		const sprite = <Sprite>res.assets.getFrameSprite(Assets.FIREBALLS__1)?.clone();

		this.graphics.use(sprite, {
			anchor: sprite.origin || Vector.Zero,
		});
	}
}
