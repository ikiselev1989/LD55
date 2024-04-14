import type { ActorArgs } from 'excalibur';
import { Actor, AnimationStrategy, Engine } from 'excalibur';
import game from '@/game/game';
import { enemyGroup } from '@/game/collisions';
import { easeInOutSine, random } from '@/game/utils';
import { TAGS } from '@/enums';
import config from '@/config';
import BonusBone from '@/game/components/bonus-bone';
import Bone from '@/game/components/bone';
import { Animations } from '@/game/resources/animations';
import Character from '@/game/components/character';

export default class Mob extends Character {
	protected health!: number;
	private abortController!: AbortController;

	constructor(props: ActorArgs = {}) {
		super({
			...props,
			collisionGroup: enemyGroup,
		});
	}


	onInitialize(engine: Engine) {
		this.health = random.integer(config.character.minHealth, config.character.maxHealth);
		this.abortController = new AbortController();
		this.collider.useCircleCollider(40);

		this.addTag(TAGS.Z_AXIS_SORT);
		this.addTag(TAGS.MOB);

		this.initGraphics();
		this.registerEvents();

		this.actions.moveTo((this.getTarget()).pos, config.character.minSpeed + random.floating(0, 1) * config.character.speedOffset);
	}

	onPostUpdate(engine: Engine, delta: number) {
		this.graphics.flipHorizontal = this.vel.x < 0;
	}

	damage(value: number) {
		this.abortController && this.abortController.abort();
		this.abortController = new AbortController();

		this.health = Math.max(this.health - value, 0);

		if (this.health === 0) return this.die();

		game.tween(progress => {
			this.material.update(shader => {
				shader.trySetUniformFloat('hitAmount', Math.sin(Math.PI * easeInOutSine(progress)));
			});
		}, 300, this.abortController);
	}

	protected registerEvents() {
	}

	protected initGraphics() {
		super.initGraphics();

		game.playAnimation(this, Animations.ANIMATIONS__A_ENEMY1__WALK);
	}

	private getTarget() {
		const stageTargets = this.scene.world.queryTags([TAGS.TARGET]).entities;

		const sorted = stageTargets.sort((a, b) => {
			return (<Actor>a).pos.distance(this.pos) < (<Actor>b).pos.distance(this.pos) ? -1 : 1;
		});

		return <Actor>sorted[0];
	}

	private async die() {
		this.collider.clear();
		this.actions.clearActions();

		await game.playAnimation(this, Animations.ANIMATIONS__A_ENEMY1__DEATH, AnimationStrategy.Freeze);

		this.kill();

		this.scene.add(new Bone({
			pos: this.pos,
		}));

		if (random.bool(config.stage.bonusBone)) {
			this.scene.add(new BonusBone({
				pos: this.pos,
			}));
		}
	}
}
