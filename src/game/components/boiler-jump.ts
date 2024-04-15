import { Actor, Animation, Vector } from 'excalibur';
import res from '@/res';
import { Animations } from '@/game/resources/animations';
import { Z_INDEX } from '@/enums';

export default class BoilerJump extends Actor {
	onInitialize() {
		this.pos.setTo(-70, -100);
		this.z = Z_INDEX.JUMP;
		this.initGraphics();
		this.move();
		this.on('exitviewport', this.kill.bind(this));
	}

	private move() {
		this.vel.setTo(0, -2000);
	}

	private initGraphics() {
		const anim = <Animation>res.animation.getAnimation(Animations.ANIMATIONS__A_BOILER_RUSH__JUMP);

		anim.play();

		this.graphics.use(anim, {
			anchor: anim.origin || Vector.Zero,
		});
	}
}
