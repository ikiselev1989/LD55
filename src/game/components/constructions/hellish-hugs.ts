import Construction from '@/game/components/construction';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import type { Sprite } from 'excalibur';
import { vec } from 'excalibur';
import Hand from '@/game/components/objects/hand';
import { random } from '@/game/utils';
import config from '@/config';

export default class HellishHugs extends Construction {
	formSprite = <Sprite>res.assets.getFrameSprite(Assets.FORMS__ELLIPSE);
	iconAsset = Assets.CARDS__CONSTRUCTIONS__HAND;

	protected addObjects() {
		const length = Math.floor(config.objects.hands.maxAmount * this.scale.x);
		let starAngle = 0;
		const offset = 450;

		for (let i = 0; i < length; i++) {
			const customOffset = offset - 10 + random.pickOne([15, -15]);

			this.scene.add(
				new Hand({
					pos: this.pos.add(vec(customOffset * Math.sin(starAngle), customOffset * Math.cos(starAngle))).scale(this.scale),
				}),
			);

			starAngle += (Math.PI * 2) / length;
		}
	}
}
