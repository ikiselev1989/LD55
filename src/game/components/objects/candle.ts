import type { ActorArgs, Animation } from 'excalibur';
import { Actor, CollisionGroup, Vector } from 'excalibur';
import res from '@/res';
import { TAGS } from '@/enums';
import { enemyGroup } from '@/game/collisions';
import { Animations } from '@/game/resources/animations';
import { random } from '@/game/utils';

export default class Candle extends Actor {
	constructor(props: ActorArgs) {
		super({
			...props,
			collisionGroup: CollisionGroup.collidesWith([enemyGroup]),
		});
	}

	onInitialize() {
		this.addTag(TAGS.Z_AXIS_SORT);

		this.initGraphics();
	}

	private initGraphics() {
		const anim = <Animation>res.animation.getAnimation(Animations.ANIMATIONS__A_CANDLE)?.clone();
		anim.pause();
		anim.goToFrame(random.integer(0, anim.frames.length - 1));
		anim.play();

		this.graphics.use(anim, {
			anchor: anim.origin || Vector.Zero,
		});
	}
}
