import type { Actor, ActorArgs, Animation, Scene } from 'excalibur';
import { AnimationStrategy, CollisionGroup, vec, Vector } from 'excalibur';
import res from '@/res';
import { NAMES, STAGE_EVENTS, TAGS } from '@/enums';
import config from '@/config';
import Character from '@/game/components/character';
import game from '@/game/game';
import { easeInOutSine } from '@/game/utils';
import { Animations } from '@/game/resources/animations';
import type { CanBeDamaged } from '@/types';
import { enemyGroup } from '@/game/collisions';
import type Mob from '@/game/components/mob';

export default class Statue extends Character implements CanBeDamaged {
	private strength!: number;
	private abortController!: AbortController;
	private animation!: Animation;
	private assets = [
		Animations.ANIMATIONS__A_STATUES__3,
		Animations.ANIMATIONS__A_STATUES__2,
		Animations.ANIMATIONS__A_STATUES__1,
	];

	constructor(props: ActorArgs, private index: number) {
		super({
			...props,
			collisionGroup: CollisionGroup.collidesWith([enemyGroup]),
		});
	}

	onInitialize() {
		this.strength = config.objects.statue.strength;
		this.collider.useCircleCollider(30);

		this.name = NAMES.STATUE;
		this.addTag(TAGS.Z_AXIS_SORT);
		this.addTag(TAGS.TARGET);
		this.addTag(TAGS.STATUE);

		this.initGraphics();
		this.scheduleAttacking();
	}

	async damage(val: number) {
		this.abortController && this.abortController.abort();
		this.abortController = new AbortController();

		this.strength -= val;

		if (this.strength <= 0) return this.kill();

		this.updateGraphics();

		game.tween(progress => {
			this.material.update(shader => {
				shader.trySetUniformFloat('hitAmount', Math.sin(Math.PI * easeInOutSine(progress)));
			});
		}, config.character.hitAnimationSpeed, this.abortController);
	}

	updateGraphics() {
		const index = Math.floor((this.strength / config.objects.statue.strength) * 2);

		this.animation = <Animation>res.animation.getAnimation(this.assets[index], AnimationStrategy.Freeze);

		this.animation.reset();
		this.animation.pause();

		this.graphics.flipHorizontal = this.index !== 1;

		this.graphics.use(this.animation, {
			anchor: this.graphics.flipHorizontal ? vec(1 - this.animation.origin!.x, this.animation.origin!.y) : this.animation.origin || Vector.Half,
		});
	}

	onPostKill(scene: Scene) {
		if (scene.world.entityManager.getByName(NAMES.STATUE).length === 1) scene.emit(STAGE_EVENTS.GAME_OVER);
	}

	protected initGraphics() {
		super.initGraphics();

		this.updateGraphics();
	}

	private scheduleAttacking() {
		game.clock.schedule(() => {
			if (this.isKilled()) return;

			this.attack();
			this.scheduleAttacking();
		}, config.objects.statue.attackInterval);
	}

	private attack() {
		const targets = this.scene.world.queryTags([TAGS.MOB]).entities.sort((a, b) => {
			return (<Actor>a).pos.distance(this.pos) < (<Actor>b).pos.distance(this.pos) ? -1 : 1;
		});

		const target = targets[0];

		if (!target) return;

		this.animation.reset();
		this.animation.play();

		(<Mob>target).statueDamage();
	}
}
