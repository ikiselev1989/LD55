import type { ActorArgs } from 'excalibur';
import { Actor, Shape, Sprite, Vector } from 'excalibur';
import { TAGS } from '@/enums';
import res from '@/res';
import { random } from '@/game/utils';
import { Assets } from '@/game/resources/assets';

export default class Hand extends Actor {
	private sprite = <Sprite>res.assets.getFrameSprite(random.pickOne([Assets.HANDS__1, Assets.HANDS__2]));

	constructor(props: ActorArgs) {
		super({
			...props,
			width: 100,
			height: 100,
			collider: Shape.Circle(50),
		});
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
