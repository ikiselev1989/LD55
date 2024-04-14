import type { ActorArgs } from 'excalibur';
import { toRadians, vec, Vector } from 'excalibur';
import { NAMES, TAGS } from '@/enums';
import type Construction from '@/game/components/construction';
import game from '@/game/game';
import DamageObject from '@/game/components/damage-object';
import config from '@/config';
import type Stage from '@/game/scenes/Stage';
import { Animations } from '@/game/resources/animations';

export default class Fireball extends DamageObject {
	declare scene: Stage;
	protected damageValue = config.objects.fireBall.damage;
	protected strengthValue = config.objects.fireBall.strength;
	private starPos!: Vector;
	private speed = 8000;

	constructor(props: ActorArgs, protected construction: Construction) {
		super(props);
	}

	onInitialize() {
		this.name = NAMES.FIREBALL;
		this.constructionId = this.construction.id;
		super.onInitialize();

		this.starPos = this.pos.clone();
		this.collider.useCircleCollider(40);
		this.addTag(TAGS.Z_AXIS_SORT);

		this.initGraphics();
		this.startMoving();
	}

	private initGraphics() {
		game.playAnimation(this, Animations.ANIMATIONS__A_FIREBALL);
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
