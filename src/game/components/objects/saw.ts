import type { ActorArgs, Sprite } from 'excalibur';
import { Actor, vec, Vector } from 'excalibur';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import { TAGS } from '@/enums';

export default class Saw extends Actor {
	constructor(props: ActorArgs, private constructionIndex: number) {
		super(props);
	}

	onInitialize() {
		this.addTag(TAGS.Z_AXIS_SORT);
		this.initGraphics();
	}

	private initGraphics() {
		const assetName = [
			Assets.SAW__HOR,
			Assets.SAW__HOR,
			Assets.SAW__VERT,
			Assets.SAW__VERT,
		][this.constructionIndex];
		const sprite = <Sprite>res.assets.getFrameSprite(assetName);

		sprite.flipHorizontal = this.constructionIndex === 3;

		this.graphics.use(sprite, {
			anchor: sprite.origin || Vector.Zero,
			offset: sprite.flipHorizontal ? vec(20, 0) : Vector.Zero,
		});
	}
}
