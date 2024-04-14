import { Actor, CollisionType, randomInRange, Sprite } from 'excalibur';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import { TAGS } from '@/enums';
import { bones } from '@/stores';

export default class BonusBone extends Actor {
	constructor(props = {}) {
		super({
			...props,
			collisionType: CollisionType.PreventCollision,
		});
	}


	onInitialize() {
		this.addTag(TAGS.Z_AXIS_SORT);
		this.collider.useCircleCollider(40);
		this.initGraphics();
		this.registerEvents();
	}

	private registerEvents() {
		this.once('pointerdown', () => {
			bones.bonusBoneCollect();
			this.kill();
		});
	}

	private initGraphics() {
		this.graphics.use(<Sprite>res.assets.getFrameSprite(Assets.GOLDEN_BONE));
		this.rotation = randomInRange(0, Math.PI * 2);
	}
}
