import Construction from '@/game/components/construction';
import type { Sprite } from 'excalibur';
import res from '@/res';
import { Assets } from '@/game/resources/assets';

export default class Circular extends Construction {
	formSprite = <Sprite>res.assets.getFrameSprite(Assets.FORMS__RECTANGLE);
}
