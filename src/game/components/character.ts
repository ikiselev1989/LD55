import type { ActorArgs, Material } from 'excalibur';
import { Actor, Engine, Sprite, Vector } from 'excalibur';
import game from '@/game/game';
import character from '@/game/materials/character.glsl';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import { enemyGroup } from '@/game/collisions';
import { easeInOutSine, random } from '@/game/utils';
import { TAGS } from '@/enums';
import type Stage from '@/game/scenes/Stage';

export default class Character extends Actor {
	declare scene: Stage;
	protected live!: number;
	private material!: Material;
	private abortController!: AbortController;

	constructor(props: ActorArgs = {}) {
		super({
			...props,
			collisionGroup: enemyGroup,
		});
	}


	onInitialize(engine: Engine) {
		this.live = random.integer(3, 6);
		this.abortController = new AbortController();
		this.collider.useCircleCollider(40);

		this.addTag(TAGS.Z_AXIS_SORT);
		this.addTag(TAGS.MOB);

		this.initGraphics();
		this.registerEvents();

		this.actions.moveTo((this.getTarget()).pos, 50 + random.floating(0, 1) * 50);
	}

	onPostUpdate(engine: Engine, delta: number) {
		this.graphics.flipHorizontal = this.vel.x < 0;
	}

	damage(value: number) {
		this.abortController && this.abortController.abort();
		this.abortController = new AbortController();

		this.live = Math.max(this.live - value, 0);

		if (this.live === 0) return this.die();

		game.tween(progress => {
			this.material.update(shader => {
				shader.trySetUniformFloat('hitAmount', Math.sin(Math.PI * easeInOutSine(progress)));
			});
		}, 300, this.abortController);
	}

	protected registerEvents() {
	}

	protected initGraphics() {
		this.material = this.graphics.material = game.graphicsContext.createMaterial({
			name: 'character-material',
			fragmentSource: character,
		});

		const sprite = <Sprite>res.assets.getFrameSprite(random.pickOne([Assets.ENEMIES__1, Assets.ENEMIES__2]));
		this.graphics.use(sprite, {
			anchor: sprite.origin || Vector.Zero,
		});
	}

	private getTarget() {
		const stageTargets = this.scene.world.queryTags([TAGS.TARGET]).entities;

		const sorted = stageTargets.sort((a, b) => {
			return (<Actor>a).pos.distance(this.pos) < (<Actor>b).pos.distance(this.pos) ? -1 : 1;
		});

		return <Actor>sorted[0];
	}

	private die() {
		this.kill();
	}
}
