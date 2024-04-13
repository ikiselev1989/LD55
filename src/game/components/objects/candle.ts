import type { ActorArgs } from 'excalibur';
import { Actor, Sprite, Vector } from 'excalibur';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import { TAGS } from '@/enums';

export default class Candle extends Actor {
	private sprite = <Sprite>res.assets.getFrameSprite(Assets.CANDLES__1);

	constructor(props: ActorArgs) {
		super(props);
	}

	onInitialize() {
		this.addTag(TAGS.Z_AXIS_SORT);

		this.initGraphics();
	}

	private initGraphics() {
		this.graphics.use(this.sprite, {
			anchor: this.sprite.origin || Vector.Zero,
		});
	}
}
