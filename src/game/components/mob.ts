import type { ActorArgs, Scene } from 'excalibur';
import { Actor, AnimationStrategy, Engine } from 'excalibur';
import game from '@/game/game';
import { enemyGroup } from '@/game/collisions';
import { easeInOutSine, random } from '@/game/utils';
import { STAGE_EVENTS, TAGS } from '@/enums';
import config from '@/config';
import BonusBone from '@/game/components/bonus-bone';
import Bone from '@/game/components/bone';
import { Animations } from '@/game/resources/animations';
import Character from '@/game/components/character';
import type { CanBeDamaged } from '@/types';

export default class Mob extends Character {
	protected health!: number;
	private abortController!: AbortController;
	private target!: Actor & CanBeDamaged | null;
	private canSearch!: boolean;

	constructor(props: ActorArgs = {}) {
		super({
			...props,
			collisionGroup: enemyGroup,
		});
	}


	onInitialize(engine: Engine) {
		this.scene.events.pipe(this.events);
		this.canSearch = true;
		this.health = random.integer(config.character.minHealth, config.character.maxHealth);
		this.abortController = new AbortController();
		this.collider.useCircleCollider(30);

		this.addTag(TAGS.Z_AXIS_SORT);
		this.addTag(TAGS.MOB);

		this.initGraphics();
		this.registerEvents();

		this.chaseTarget();
	}

	onPostUpdate(engine: Engine, delta: number) {
		if (this.vel.x === 0) return;

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
		}, config.character.hitAnimationSpeed, this.abortController);
	}

	onPostKill(scene: Scene) {
		scene.events.unpipe(this.events);
	}

	protected registerEvents() {
		this.on('collisionstart', ({ other }) => {
			if (other.id === this.target?.id) {
				this.off('collisionstart');
				this.actions.clearActions();
				this.graphics.flipHorizontal = this.target.pos.x <= this.pos.x;
				this.attack();
				this.attackSchedule();
			}
		});

		this.events.on(STAGE_EVENTS.GAME_OVER, () => this.canSearch = false);
	}

	protected initGraphics() {
		super.initGraphics();

		game.playAnimation(this, Animations.ANIMATIONS__A_ENEMY1__WALK);
	}

	private chaseTarget() {
		this.target = this.getTarget();

		if (!this.target || this.target.isKilled()) {
			game.clock.schedule(() => this.chaseTarget(), 1000);
		}

		this.target && this.actions.moveTo(this.target.pos, config.character.minSpeed + random.floating(0, 1) * config.character.speedOffset).toPromise();
	}

	private attack() {
		this.target && this.target.damage(config.character.damage);
	}

	private attackSchedule() {
		game.clock.schedule(() => {
			if (this.isKilled()) return;
			if (!this.target || this.target.isKilled()) return this.chaseTarget();

			this.attack();
			this.attackSchedule();
		}, config.character.attackInterval);
	}

	private getTarget() {
		const stageTargets = this.scene.world.queryTags([TAGS.TARGET]).entities.filter(value => !value.isKilled());

		if (!stageTargets.length) return null;

		const sorted = stageTargets.sort((a, b) => {
			return (<Actor>a).pos.distance(this.pos) < (<Actor>b).pos.distance(this.pos) ? -1 : 1;
		});

		return <Actor & CanBeDamaged>sorted[0];
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
