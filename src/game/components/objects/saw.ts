import type { ActorArgs, Animation } from 'excalibur';
import { vec, Vector } from 'excalibur';
import res from '@/res';
import { NAMES, TAGS } from '@/enums';
import game from '@/game/game';
import { lerp } from '@/game/utils';
import type Construction from '@/game/components/construction';
import DamageObject from '@/game/components/damage-object';
import config from '@/config';
import { Animations } from '@/game/resources/animations';

export default class Saw extends DamageObject {
	protected damageValue = config.objects.saw.damage;
	protected strengthValue = config.objects.saw.strength;
	private startPos!: Vector;

	constructor(props: ActorArgs, private construct: Construction, private constructionIndex: number) {
		super(props);
	}

	async onInitialize() {
		super.onInitialize();

		this.name = NAMES.SAW;
		this.constructionId = this.construct.id;
		this.startPos = this.pos.clone();
		this.scale.setTo(0, 0);
		this.addTag(TAGS.Z_AXIS_SORT);

		this.setCollider();

		this.initGraphics();

		await this.moveAnimation();
		this.startMovingInterval();
	}

	private setCollider() {
		switch (this.constructionIndex) {
			case 0:
			case 1:
				return this.collider.useBoxCollider(100, 20, vec(0.5, 1));

			default:
				return this.collider.useBoxCollider(20, 100, this.constructionIndex === 2 ? vec(1, 0.5) : vec(0, 0.5));
		}
	}

	private moveAnimation() {
		this.pos = this.startPos;

		switch (this.constructionIndex) {
			case 0:
			case 1:
				return this.horizontalMoveAnimation(this.constructionIndex === 1);

			default:
				return this.verticalMoveAnimation(this.constructionIndex === 3);
		}
	}

	private async startMovingInterval() {
		game.clock.schedule(async () => {
			await this.moveAnimation();
			!this.isKilled() && this.startMovingInterval();
		}, config.objects.saw.interval);
	}

	private initGraphics() {
		const assetName = [
			Animations.ANIMATIONS__A_SAW__HOR,
			Animations.ANIMATIONS__A_SAW__HOR,
			Animations.ANIMATIONS__A_SAW__VERT,
			Animations.ANIMATIONS__A_SAW__VERT,
		][this.constructionIndex];
		const sprite = <Animation>res.animation.getAnimation(assetName);

		sprite.play();
		sprite.flipHorizontal = this.constructionIndex === 3;

		this.graphics.use(sprite, {
			anchor: sprite.origin || Vector.Zero,
			offset: sprite.flipHorizontal ? vec(0, 0) : Vector.Zero,
		});
	}

	private async horizontalMoveAnimation(reverse: boolean) {
		await game.tween(progress => {
			this.scale.x = 1;
			this.scale.y = progress;
		}, config.objects.saw.fadeSpeed);
		await game.tween(progress => {
			this.pos.setTo(lerp(this.startPos.x, this.startPos.x + 410 * 2 * (reverse ? 1 : -1) * this.construct.scale.x, progress), this.startPos.y);
		}, config.objects.saw.speed * this.construct.scale.x);
		await game.tween(progress => {
			this.scale.x = 1;
			this.scale.y = 1 - progress;
		}, config.objects.saw.fadeSpeed);
	}

	private async verticalMoveAnimation(reverse: boolean) {
		await game.tween(progress => {
			this.scale.x = progress;
			this.scale.y = 1;
		}, config.objects.saw.fadeSpeed);
		await game.tween(progress => {
			this.pos.setTo(this.startPos.x, lerp(this.startPos.y, this.startPos.y + 410 * 2 * (reverse ? 1 : -1) * this.construct.scale.y, progress));
		}, config.objects.saw.speed * this.construct.scale.x);
		await game.tween(progress => {
			this.scale.x = 1 - progress;
			this.scale.y = 1;
		}, config.objects.saw.fadeSpeed);
	}
}
