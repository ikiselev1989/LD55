import type { ActorArgs, Sprite } from 'excalibur';
import { Actor, CollisionGroup, Vector } from 'excalibur';
import { Assets } from '@/game/resources/assets';
import { TAGS } from '@/enums';
import res from '@/res';
import { enemyGroup } from '@/game/collisions';

export default class Tombstone extends Actor {
	constructor(props: ActorArgs) {
		super({
			...props,
			collisionGroup: CollisionGroup.collidesWith([enemyGroup]),
		});
	}

	onInitialize() {
		this.collider.useCircleCollider(30);
		this.addTag(TAGS.Z_AXIS_SORT);
		this.addTag(TAGS.TARGET);

		this.initGraphics();
	}

	private initGraphics() {
		const sprite = <Sprite>res.assets.getFrameSprite(Assets.TOMBSTONES__1);

		this.graphics.use(sprite, {
			anchor: sprite.origin || Vector.Zero,
		});
	}
}
