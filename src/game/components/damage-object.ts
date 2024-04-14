import type { ActorArgs } from 'excalibur';
import { Actor, CollisionGroup, CollisionStartEvent } from 'excalibur';
import { enemyGroup } from '@/game/collisions';
import Mob from '@/game/components/mob';
import type { HasConstruction } from '@/types';
import type Stage from '@/game/scenes/Stage';
import { constructionsBuilt } from '@/stores';
import type Construction from '@/game/components/construction';

export default class DamageObject extends Actor implements HasConstruction {
	constructionId!: number;
	protected construction!: Construction;
	protected damageValue!: number;
	protected strengthValue!: number;

	constructor(props: ActorArgs) {
		super({
			...props,
			collisionGroup: CollisionGroup.collidesWith([enemyGroup]),
		});
	}

	onInitialize() {
		this.on('collisionstart', this.damage.bind(this));
	}

	onPostKill(scene: Stage) {
		constructionsBuilt.damage(this.constructionId, 1 / this.construction.objectAmount);

		const length = scene.world.entityManager.getByName(this.name).filter((obj) => {
			return (<DamageObject>obj).constructionId === this.constructionId;
		}).length;

		if (length === 1) scene.destroy(this.constructionId);
	}

	private damage(e: CollisionStartEvent) {
		if (e.other instanceof Mob) {
			this.decreaseStrength();
			e.other.damage(this.damageValue);
		}
	}

	private decreaseStrength() {
		this.strengthValue -= 1;

		if (this.strengthValue <= 0) this.kill();
	}
}
