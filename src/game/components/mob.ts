import type { ActorArgs, Scene } from 'excalibur';
import { Actor, AnimationStrategy, Engine, StateMachine } from 'excalibur';
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
import StatueAim from '@/game/components/statue-aim';

export default class Mob extends Character {
	protected health!: number;
	private abortController!: AbortController;
	private target!: Actor & CanBeDamaged | null;
	private canSearch!: boolean;
	private fsm = StateMachine.create({
		start: 'search',
		states: {
			search: {
				onState: () => this.searchTarget(),
				transitions: ['search', 'chase'],
			},
			chase: {
				onState: () => this.chaseTarget(),
				transitions: ['search', 'attack'],
			},
			attack: {
				onState: () => this.attack(),
				transitions: ['search'],
			},
		},
	});

	constructor(props: ActorArgs = {}) {
		super({
			...props,
			collisionGroup: enemyGroup,
		});
	}

	statueDamage() {
		this.scene.add(new StatueAim(this));
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

		this.fsm.go('search');
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
				this.fsm.go('attack');
			}
		});

		this.events.on(STAGE_EVENTS.GAME_OVER, () => this.canSearch = false);
	}

	protected initGraphics() {
		super.initGraphics();

		game.playAnimation(this, Animations.ANIMATIONS__A_ENEMY1__WALK);
	}

	private searchTarget() {
		if (this.isKilled()) return;
		this.target = this.getTarget();

		if (this.target) this.fsm.go('chase');
		if (!this.target) game.clock.schedule(() => this.fsm.go('search'), 1000);
	}

	private async chaseTarget() {
		if (!this.target) {
			this.fsm.go('search');
			return;
		}
		if (this.target!.pos.distance(this.pos) < 100) {
			this.fsm.go('attack');
			return;
		}

		await this.actions.moveTo(this.target!.pos, config.character.minSpeed + random.floating(0, 1) * config.character.speedOffset).toPromise();
		this.fsm.go('attack');
	}

	private attack() {
		this.hit();

		game.clock.schedule(() => this.fsm.go('search'), config.character.attackInterval);
	}

	private hit() {
		this.target && this.target.damage(config.character.damage);
	}

	private getTarget() {
		const stageTargets = this.scene.world.queryTags([TAGS.TARGET]).entities.filter(value => !value.isKilled());

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
