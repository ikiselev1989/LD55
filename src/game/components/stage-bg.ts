import { Actor, Sprite } from 'excalibur';
import res from '@/res';
import { Assets } from '@/game/resources/assets';

export default class StageBg extends Actor {
	onInitialize() {
		this.pos.setTo(0, -25);
		this.initGraphics();
	}

	private initGraphics() {
		this.graphics.use(<Sprite>res.assets.getFrameSprite(Assets.BG));
	}
}
