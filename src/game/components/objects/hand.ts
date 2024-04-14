import type { ActorArgs, Animation, Scene } from 'excalibur';
import { Actor, AnimationStrategy, CollisionGroup, Shape, Vector } from 'excalibur';
import { TAGS } from '@/enums';
import res from '@/res';
import { random } from '@/game/utils';
import { enemyGroup } from '@/game/collisions';
import { Animations } from '@/game/resources/animations';
import config from '@/config';
import type Mob from '@/game/components/mob';

export default class Hand extends Actor {
	private animation = <Animation>res.animation.getAnimation(random.pickOne([Animations.ANIMATIONS__A_HAND__LEFT1, Animations.ANIMATIONS__A_HAND__LEFT2]), AnimationStrategy.Freeze)?.clone();
	private strength!: number;

	constructor(props: ActorArgs) {
		super({
			...props,
			width: 100,
			height: 100,
			collider: Shape.Circle(50),
			collisionGroup: CollisionGroup.collidesWith([enemyGroup]),
		});
	}

	onInitialize() {
		this.strength = config.objects.hands.strength;
		this.addTag(TAGS.Z_AXIS_SORT);

		this.initGraphics();
		this.registerEvents();
	}

	onPostKill(scene: Scene) {
		this.off('collisionstart');
	}

	private registerEvents() {
		this.on('collisionstart', async ({ other }) => {
			(<Mob>other).damage(config.objects.hands.damage);
			this.animation.reset();
			this.animation.play();

			await new Promise(resolve => this.animation.events.on('end', resolve));

			this.decreaseStrength();
		});
	}

	private initGraphics() {
		this.animation.pause();

		this.graphics.use(this.animation, {
			anchor: this.animation.origin || Vector.Zero,
		});
	}

	private decreaseStrength() {
		this.strength -= 1;

		if (this.strength <= 0) this.kill();
	}
}
