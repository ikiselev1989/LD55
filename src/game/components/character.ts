import type { ActorArgs, Material } from 'excalibur';
import { Actor, Engine, Sprite, Vector } from 'excalibur';
import game from '@/game/game';
import character from '@/game/materials/character.glsl';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import { enemyGroup } from '@/game/collisions';
import { easeInOutSine } from '@/game/utils';
import { TAGS } from '@/enums';

export default class Character extends Actor {
	protected live = 5;
	private material!: Material;
	private abortController!: AbortController;

	constructor(props: ActorArgs = {}) {
		super({
			...props,
			collisionGroup: enemyGroup,
		});
	}


	onInitialize(engine: Engine) {
		this.pos.setTo(200, 200);
		this.collider.useCircleCollider(40);

		this.abortController = new AbortController();
		this.addTag(TAGS.Z_AXIS_SORT);
		this.initGraphics();
		this.registerEvents();
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

		const sprite = <Sprite>res.assets.getFrameSprite(Assets.ENEMIES__2);
		this.graphics.use(sprite, {
			anchor: sprite.origin || Vector.Zero,
		});
	}

	private die() {
		this.kill();
	}
}
