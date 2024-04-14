import type { ActorArgs } from 'excalibur';
import { Actor, Animation, CollisionGroup, vec } from 'excalibur';
import res from '@/res';
import { Animations } from '@/game/resources/animations';
import { NAMES, TAGS } from '@/enums';
import Mob from '@/game/components/mob';
import config from '@/config';
import { enemyGroup } from '@/game/collisions';
import game from '@/game/game';

export default class Smoke extends Actor {
	constructor(props: ActorArgs, private target: Mob) {
		super({
			...props,
			collisionGroup: CollisionGroup.collidesWith([enemyGroup]),
		});
	}

	onInitialize() {
		this.name = NAMES.SMOKE;
		this.collider.useCircleCollider(40);
		this.addTag(TAGS.Z_AXIS_SORT);
		this.initGraphics();
		this.registerEvents();

		this.vel = this.target.pos.clone().sub(this.pos).normalize().scale(config.objects.tombstones.smokeSpeed);
	}

	private registerEvents() {
		this.on('collisionstart', async ({ other }) => {
			if (other instanceof Mob) {
				this.off('collisionstart');
				other.damage(config.objects.tombstones.damage);

				await game.tween(progress => {
					this.graphics.opacity = 1 - progress;
				}, 100);

				this.kill();
			}
		});

		this.on('exitviewport', () => {
			this.kill();
		});
	}

	private initGraphics() {
		const anim = <Animation>res.animation.getAnimation(Animations.ANIMATIONS__A_TOMBSTONE__SMOKE);

		anim.play();

		this.graphics.use(anim, {
			offset: vec(0, -140),
		});
	}
}
