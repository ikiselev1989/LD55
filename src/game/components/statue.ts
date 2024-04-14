import type { ActorArgs, Animation } from 'excalibur';
import { Vector } from 'excalibur';
import res from '@/res';
import { TAGS } from '@/enums';
import config from '@/config';
import Character from '@/game/components/character';
import game from '@/game/game';
import { easeInOutSine } from '@/game/utils';
import { Animations } from '@/game/resources/animations';

export default class Statue extends Character {
	private strength!: number;
	private abortController!: AbortController;
	private animation!: Animation;
	private assets = [
		Animations.ANIMATIONS__A_STATUES__3,
		Animations.ANIMATIONS__A_STATUES__2,
		Animations.ANIMATIONS__A_STATUES__1,
	];

	constructor(props: ActorArgs, private index: number) {
		super(props);
	}

	onInitialize() {
		this.strength = config.objects.statue.strength;

		this.addTag(TAGS.Z_AXIS_SORT);
		this.addTag(TAGS.TARGET);
		this.addTag(TAGS.STATUE);

		this.initGraphics();
	}

	async damage(val: number) {
		this.abortController && this.abortController.abort();
		this.abortController = new AbortController();

		this.strength -= val;

		if (this.strength <= 0) return this.kill();

		game.tween(progress => {
			this.material.update(shader => {
				shader.trySetUniformFloat('hitAmount', Math.sin(Math.PI * easeInOutSine(progress)));
			});
		}, 300, this.abortController);
	}

	updateGraphics() {
		const index = Math.floor((this.strength / config.objects.statue.strength) * 2);

		this.animation = <Animation>res.animation.getAnimation(this.assets[index]);

		this.animation.reset();
		this.animation.pause();

		this.graphics.use(this.animation, {
			anchor: this.animation.origin || Vector.Zero,
		});

		this.graphics.flipHorizontal = this.index !== 1;
	}

	protected initGraphics() {
		super.initGraphics();

		this.updateGraphics();
	}
}
