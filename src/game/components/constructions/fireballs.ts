import Construction from '@/game/components/construction';
import type { Sprite } from 'excalibur';
import { toRadians, vec } from 'excalibur';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import Fireball from '@/game/components/objects/fireball';

export default class Fireballs extends Construction {
	formSprite = <Sprite>res.assets.getFrameSprite(Assets.FORMS__ELLIPSE);

	protected addObjects() {
		const length = 4;
		let startAngle = toRadians(0);
		const offset = 440;

		for (let i = 0; i < length; i++) {
			const fb = new Fireball({
				pos: this.pos.add(vec(offset * Math.sin(startAngle), offset * Math.cos(startAngle))).scale(this.scale),
				rotation: toRadians(180) - toRadians(90) * i,
			});

			this.scene.add(fb);

			startAngle += (Math.PI * 2) / length;
		}
	}
}
