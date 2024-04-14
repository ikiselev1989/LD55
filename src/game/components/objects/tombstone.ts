import type { ActorArgs, Sprite } from 'excalibur';
import { Actor, CollisionGroup, Vector } from 'excalibur';
import { Assets } from '@/game/resources/assets';
import { NAMES, TAGS } from '@/enums';
import res from '@/res';
import { enemyGroup } from '@/game/collisions';
import type { HasConstruction } from '@/types';
import type Construction from '@/game/components/construction';
import Stage from '@/game/scenes/Stage';

export default class Tombstone extends Actor implements HasConstruction {
	constructionId!: number;

	constructor(props: ActorArgs, private construction: Construction) {
		super({
			...props,
			collisionGroup: CollisionGroup.collidesWith([enemyGroup]),
		});
	}

	onInitialize() {
		this.name = NAMES.TOMBSTONE;
		this.constructionId = this.construction.id;
		this.collider.useCircleCollider(30);
		this.addTag(TAGS.Z_AXIS_SORT);
		this.addTag(TAGS.TARGET);

		this.initGraphics();
	}

	onPostKill(scene: Stage) {
		const length = scene.world.entityManager.getByName(this.name).filter((obj) => {
			return (<Tombstone>obj).constructionId === this.constructionId;
		}).length;

		if (length === 1) scene.destroy(this.constructionId);
	}

	private initGraphics() {
		const sprite = <Sprite>res.assets.getFrameSprite(Assets.TOMBSTONES__1);

		this.graphics.use(sprite, {
			anchor: sprite.origin || Vector.Zero,
		});
	}

}
