import Construction from '@/game/components/construction';
import type { Sprite } from 'excalibur';
import { toRadians, vec } from 'excalibur';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import Fireball from '@/game/components/objects/fireball';
import config from '@/config';

export default class Fireballs extends Construction {
	formSprite = <Sprite>res.assets.getFrameSprite(Assets.FORMS__ELLIPSE);
	iconAsset = Assets.CARDS__CONSTRUCTIONS__FIRE;

	protected addObjects() {
		const length = Math.floor(config.objects.fireBall.maxAmount * this.scale.x);
		this.objectAmount = length;
		let startAngle = toRadians(0);
		const offset = 440;

		for (let i = 0; i < length; i++) {
			const fb = new Fireball({
				pos: this.pos.add(vec(offset * Math.sin(startAngle), offset * Math.cos(startAngle))).scale(this.scale),
			}, this);

			this.scene.add(fb);

			startAngle += (Math.PI * 2) / length;
		}
	}
}
