import Construction from '@/game/components/construction';
import type { Sprite } from 'excalibur';
import { toRadians } from 'excalibur';
import res from '@/res';
import { Assets } from '@/game/resources/assets';

export default class ManaCandles extends Construction {
	formSprite = <Sprite>res.assets.getFrameSprite(Assets.FORMS__TRIANGLE);

	protected rotate() {
		this.rotation += toRadians(180);
	}
}
