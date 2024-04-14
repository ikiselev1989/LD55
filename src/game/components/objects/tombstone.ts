import type { ActorArgs, Sprite } from 'excalibur';
import { Actor, Vector } from 'excalibur';
import { Assets } from '@/game/resources/assets';
import { TAGS } from '@/enums';
import res from '@/res';

export default class Tombstone extends Actor {
	constructor(props: ActorArgs, private inConstructIndex: number, private constructionRotated: boolean) {
		super(props);
	}

	onInitialize() {
		this.collider.useCircleCollider(30);
		this.addTag(TAGS.Z_AXIS_SORT);

		this.initGraphics();
	}

	private initGraphics() {
		const assetName = ([
			[Assets.TOMBSTONES__3, Assets.TOMBSTONES__2],
			[Assets.TOMBSTONES__3, Assets.TOMBSTONES__1],
			[Assets.TOMBSTONES__1, Assets.TOMBSTONES__1],
			[Assets.TOMBSTONES__2, Assets.TOMBSTONES__2],
		][this.inConstructIndex][this.constructionRotated ? 1 : 0]);

		const sprite = <Sprite>res.assets.getFrameSprite(assetName);

		sprite.flipHorizontal = !this.constructionRotated && this.inConstructIndex === 1;

		this.graphics.use(sprite, {
			anchor: sprite.origin || Vector.Zero,
		});
	}
}
