import Construction from '@/game/components/construction';
import type { Sprite } from 'excalibur';
import { vec } from 'excalibur';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import Saw from '@/game/components/objects/saw';

export default class Circular extends Construction {
	formSprite = <Sprite>res.assets.getFrameSprite(Assets.FORMS__RECTANGLE);

	protected addObjects() {
		const positions = [
			vec(410, 440),
			vec(-410, -440),
			vec(-440, 410),
			vec(440, -410),
		];

		for (let [index, position] of positions.entries()) {
			this.scene.add(new Saw({
				pos: position.scale(this.scale),
			}, index));
		}
	}
}
