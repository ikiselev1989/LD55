import { Actor, Sprite, Vector } from 'excalibur';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import { Z_INDEX } from '@/enums';

export default class Caster extends Actor {
	private sprite = <Sprite>res.assets.getFrameSprite(Assets.CASTER);

	onInitialize() {
		this.z = Z_INDEX.CASTER;

		this.initGraphics();
	}

	private initGraphics() {
		this.graphics.use(this.sprite, {
			anchor: this.sprite.origin || Vector.Zero,
		});
	}
}
