import type { ActorArgs } from 'excalibur';
import { Actor, CollisionGroup, Sprite, Vector } from 'excalibur';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import { TAGS } from '@/enums';
import { random } from '@/game/utils';
import { enemyGroup } from '@/game/collisions';

export default class Candle extends Actor {
	private sprite = <Sprite>res.assets.getFrameSprite(random.pickOne([Assets.CANDLES__1, Assets.CANDLES__2, Assets.CANDLES__3]));

	constructor(props: ActorArgs) {
		super({
			...props,
			collisionGroup: CollisionGroup.collidesWith([enemyGroup]),
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
