import type { ActorArgs } from 'excalibur';
import { Actor, CollisionGroup, CollisionStartEvent } from 'excalibur';
import { enemyGroup } from '@/game/collisions';
import Mob from '@/game/components/mob';
import type { HasConstruction } from '@/types';
import { constructionsBuilt } from '@/stores';
import type Construction from '@/game/components/construction';
import type Stage from '@/game/scenes/Stage';

export default class DamageObject extends Actor implements HasConstruction {
	constructionId!: number;
	declare scene: Stage;
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

	private damage(e: CollisionStartEvent) {
		if (e.other instanceof Mob) {
			this.decreaseStrength();
			e.other.damage(this.damageValue);
		}
	}

	private die() {
		constructionsBuilt.damage(this.constructionId, 1 / this.construction.objectAmount);

		const length = this.scene.world.entityManager.getByName(this.name).filter((obj) => {
			return (<DamageObject>obj).constructionId === this.constructionId;
		}).length;

		if (length === 1) this.scene.destroy(this.constructionId);

		this.kill();
	}

	private decreaseStrength() {
		this.strengthValue -= 1;

		if (this.strengthValue <= 0) this.die();
	}
}
