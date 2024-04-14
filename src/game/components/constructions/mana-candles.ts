import Construction from '@/game/components/construction';
import type { Sprite } from 'excalibur';
import { toRadians, vec } from 'excalibur';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import Candle from '@/game/components/objects/candle';
import { constructionsPlaceAvailable } from '@/stores';

export default class ManaCandles extends Construction {
	formSprite = <Sprite>res.assets.getFrameSprite(Assets.FORMS__TRIANGLE);
	iconAsset = Assets.CARDS__CONSTRUCTIONS__CANDLE;
	safePlace = true;

	protected rotate() {
		this.rotation += toRadians(180);
	}

	protected build() {
		super.build();

		constructionsPlaceAvailable.expand();
	}

	protected addObjects() {
		const positions = [
			vec(-365, 211),
			vec(365, 211),
			vec(0, -425),
		];

		for (let position of positions) {
			this.scene.add(new Candle({
				pos: this.pos.add(position).rotate(this.rotation).scale(this.scale),
			}));
		}
	}
}
