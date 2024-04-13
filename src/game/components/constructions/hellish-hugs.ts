import Construction from '@/game/components/construction';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import type { Sprite } from 'excalibur';

export default class HellishHugs extends Construction {
	formSprite = <Sprite>res.assets.getFrameSprite(Assets.FORMS__ELLIPSE);
}
