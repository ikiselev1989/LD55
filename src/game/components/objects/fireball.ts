import type { ActorArgs } from 'excalibur';
import { Sprite, toRadians, vec, Vector } from 'excalibur';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import { TAGS } from '@/enums';
import type Construction from '@/game/components/construction';
import game from '@/game/game';
import DamageObject from '@/game/components/damage-object';
import config from '@/config';

export default class Fireball extends DamageObject {
	protected damageValue = config.objects.fireBall.damage;
	protected strengthValue = config.objects.fireBall.strength;
	private starPos!: Vector;
	private speed = 8000;

	constructor(props: ActorArgs, private construction: Construction) {
		super(props);
	}

	onInitialize() {
		super.onInitialize();

		this.starPos = this.pos.clone();
		this.collider.useCircleCollider(40);
		this.addTag(TAGS.Z_AXIS_SORT);

		this.initGraphics();
		this.startMoving();
	}

	private initGraphics() {
		const sprite = <Sprite>res.assets.getFrameSprite(Assets.FIREBALLS__1)?.clone();

		this.graphics.use(sprite, {
			anchor: sprite.origin || Vector.Zero,
		});
	}

	private startMoving() {
		const offset = this.construction.pos.distance(this.pos);
		const startAngle = this.construction.pos.sub(this.pos).toAngle() + toRadians(90);
		const abortController = new AbortController();

		game.tween(progress => {
			this.pos = this.construction.pos.add(vec(offset * Math.sin(startAngle + Math.PI * 2 * progress), offset * Math.cos(startAngle + Math.PI * 2 * progress)));
		}, this.speed * this.construction.scale.x, abortController, true);
	}
}
