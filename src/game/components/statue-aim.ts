import { Actor, Animation } from 'excalibur';
import res from '@/res';
import { Animations } from '@/game/resources/animations';
import { TAGS } from '@/enums';
import type Mob from '@/game/components/mob';
import game from '@/game/game';
import config from '@/config';

export default class StatueAim extends Actor {
	constructor(private target: Mob) {
		super();
	}

	onInitialize() {
		this.addTag(TAGS.Z_AXIS_SORT);
		this.scale.setTo(1, 0.9);
		this.initGraphics();
		this.damage();
		game.clock.schedule(async () => {
			await game.tween(progress => {
				this.graphics.opacity = 1 - progress;
			}, 300);
			this.kill();
		}, config.objects.statue.aimTime);
	}

	onPreUpdate() {
		this.pos = this.target.pos;
	}

	private damage() {
		!this.target.isKilled() && this.target.damage(config.objects.statue.damage);
	}

	private initGraphics() {
		const anim = <Animation>res.animation.getAnimation(Animations.ANIMATIONS__A_STATUE_AIM);
		anim.play();

		this.graphics.use(anim);
	}
}
