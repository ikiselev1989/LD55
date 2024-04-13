import Construction from '@/game/components/construction';
import type { Sprite } from 'excalibur';
import { toDegrees, toRadians, vec } from 'excalibur';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import Tombstone from '@/game/components/objects/tombstone';

export default class Tombstones extends Construction {
	formSprite = <Sprite>res.assets.getFrameSprite(Assets.FORMS__RHOMBUS);

	protected rotate() {
		this.rotation += toRadians(45);
	}

	protected addObjects() {
		const positions = [
			vec(430, 0),
			vec(-430, 0),
			vec(0, -430),
			vec(0, 430),
		];

		for (let [index, position] of positions.entries()) {
			this.scene.add(new Tombstone({
				pos: position.scale(this.scale).rotate(this.rotation % toRadians(90)),
			}, index, toDegrees(this.rotation) % 90 !== 0));
		}
	}
}
