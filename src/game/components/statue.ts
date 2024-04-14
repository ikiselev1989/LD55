import type { ActorArgs } from 'excalibur';
import { Actor, Sprite, Vector } from 'excalibur';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import { TAGS } from '@/enums';

export default class Statue extends Actor {
	constructor(props: ActorArgs, private assetName: Assets) {
		super(props);
	}

	onInitialize() {
		this.addTag(TAGS.Z_AXIS_SORT);
		this.addTag(TAGS.TARGET);
		this.initGraphics();
	}

	private initGraphics() {
		const sprite = <Sprite>res.assets.getFrameSprite(this.assetName);

		this.graphics.use(sprite, {
			anchor: sprite.origin || Vector.Zero,
		});
	}
}
