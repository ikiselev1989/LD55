import { Actor, Animation, AnimationStrategy, CollisionGroup, Shape, Vector } from 'excalibur';
import res from '@/res';
import { Animations } from '@/game/resources/animations';
import { TAGS } from '@/enums';
import { enemyGroup } from '@/game/collisions';
import type Mob from '@/game/components/mob';
import config from '@/config';
import { boilerRushAvailable, bones } from '@/stores';
import game from '@/game/game';

export default class BoilerRushExplosion extends Actor {
	constructor(props = {}) {
		super({
			...props,
			collisionGroup: CollisionGroup.collidesWith([enemyGroup]),
		});
	}


	onInitialize() {
		bones.buy();
		boilerRushAvailable.set(false);

		game.clock.schedule(() => {
			boilerRushAvailable.set(true);
		}, config.objects.boiler.coolDown);

		this.collider.set(Shape.Capsule(250, 100));
		this.addTag(TAGS.Z_AXIS_SORT);
		this.initGraphics();

		this.on('collisionstart', ({ other }) => {
			(<Mob>other).damage(config.objects.boiler.damage);
		});
	}

	private initGraphics() {
		const anim = <Animation>res.animation.getAnimation(Animations.ANIMATIONS__A_BOILER_RUSH__EXPLOSION, AnimationStrategy.Freeze)?.clone();

		anim.events.on('end', () => this.collider.clear());

		this.graphics.use(anim, {
			anchor: anim.origin || Vector.Zero,
		});
	}
}
