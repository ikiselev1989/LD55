import Construction from '@/game/components/construction';
import type { Sprite } from 'excalibur';
import { toRadians, vec } from 'excalibur';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import Tombstone from '@/game/components/objects/tombstone';
import { STAGE_EVENTS } from '@/enums';

export default class Tombstones extends Construction {
	formSprite = <Sprite>res.assets.getFrameSprite(Assets.FORMS__RHOMBUS);
	iconAsset = Assets.CARDS__CONSTRUCTIONS__TOMBSTONE;
	objectAmount = 4;

	onInitialize() {
		super.onInitialize();

		// @ts-ignore
		this.events.on(STAGE_EVENTS.DESTROYED_CONSTRUCTION, (id: number) => {
			if (id === this.id) {
				this.scene.destroy(this.id);
			}
		});
	}

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

		for (let [, position] of positions.entries()) {
			this.scene.add(new Tombstone({
				pos: position.scale(this.scale).rotate(this.rotation % toRadians(90)),
			}, this));
		}
	}
}
