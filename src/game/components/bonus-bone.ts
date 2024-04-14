import { Actor, randomInRange, Sprite } from 'excalibur';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import { TAGS } from '@/enums';

export default class BonusBone extends Actor {
	onInitialize() {
		this.addTag(TAGS.Z_AXIS_SORT);
		this.collider.useCircleCollider(40);
		this.initGraphics();
		this.registerEvents();
	}

	private registerEvents() {
		this.on('pointerdown', () => this.kill());
	}

	private initGraphics() {
		this.graphics.use(<Sprite>res.assets.getFrameSprite(Assets.BONE));
		this.rotation = randomInRange(0, Math.PI * 2);
	}
}
