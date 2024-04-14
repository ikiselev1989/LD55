import { Actor, Entity, randomInRange, Sprite } from 'excalibur';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import { TAGS } from '@/enums';
import game from '@/game/game';
import { easeInOutSine, lerp, random } from '@/game/utils';
import type Statue from '@/game/components/statue';
import type Stage from '@/game/scenes/Stage';
import { bones } from '@/stores';

export default class Bone extends Actor {
	declare scene: Stage;

	onInitialize() {
		this.addTag(TAGS.Z_AXIS_SORT);
		this.initGraphics();
		this.moveToCaster();
	}

	private async moveToCaster() {
		const startPos = this.pos.clone();
		const caster = <Statue>(random.pickOne(<Entity[]>this.scene.world.queryTags([TAGS.STATUE]).entities));

		await game.tween(progress => {
			this.pos.x = lerp(startPos.x, caster.pos.x, easeInOutSine(progress));
			this.pos.y = lerp(startPos.y, caster.pos.y, easeInOutSine(progress));
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
