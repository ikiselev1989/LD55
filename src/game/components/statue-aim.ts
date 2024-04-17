import { Actor, Animation } from 'excalibur';
import res from '@/res';
import { Animations } from '@/game/resources/animations';
import { Z_INDEX } from '@/enums';
import type Mob from '@/game/components/mob';
import game from '@/game/game';
import config from '@/config';

export default class StatueAim extends Actor {
	constructor(private target: Mob) {
		super();
	}

	async onInitialize() {
		this.z = Z_INDEX.ON_FLOOR;
		this.scale.setTo(1, 0.9);
		this.initGraphics();

		await game.waitFor(config.objects.statue.aimTime / 2);
		this.damage();
		game.clock.schedule(async () => {
			await game.tween(progress => {
				this.graphics.opacity = 1 - progress;
			}, 300);
			this.kill();
		}, config.objects.statue.aimTime / 2);
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
