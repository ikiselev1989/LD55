import { Actor, randomInRange, Sprite } from 'excalibur';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import { TAGS } from '@/enums';
import game from '@/game/game';
import { easeInOutSine, lerp } from '@/game/utils';
import type Statue from '@/game/components/statue';
import type Stage from '@/game/scenes/Stage';
import { bones } from '@/stores';

export default class Bone extends Actor {
	declare scene: Stage;

	onInitialize() {
		this.addTag(TAGS.Z_AXIS_SORT);
		this.initGraphics();
		this.moveToStatue();
	}

	private async moveToStatue() {
		const startPos = this.pos.clone();
		const sorted = this.scene.world.queryTags([TAGS.STATUE]).entities.sort((a, b) => {
			return (<Actor>a).pos.distance(this.pos) < (<Actor>b).pos.distance(this.pos) ? -1 : 1;
		});
		const statue = <Statue>(sorted[0]);

		if (!statue) return;

		await game.tween(progress => {
			this.pos.x = lerp(startPos.x, statue.pos.x, easeInOutSine(progress));
			this.pos.y = lerp(startPos.y, statue.pos.y, easeInOutSine(progress));
		}, 500);

		await game.tween(progress => {
			this.graphics.opacity = 1 - easeInOutSine(progress);
		}, 100);

		bones.boneCollect();
		this.kill();
	}

	private initGraphics() {
		this.graphics.use(<Sprite>res.assets.getFrameSprite(Assets.BONE));
		this.rotation = randomInRange(0, Math.PI * 2);
	}
}
