import type { ActorArgs } from 'excalibur';
import { Actor, CollisionGroup, CollisionStartEvent } from 'excalibur';
import { enemyGroup } from '@/game/collisions';
import Character from '@/game/components/character';

export default class DamageObject extends Actor {
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
		if (e.other instanceof Character) {
			this.decreaseStrength();
			e.other.damage(this.damageValue);
		}
	}

	private decreaseStrength() {
		this.strengthValue -= 1;

		if (this.strengthValue <= 0) this.kill();
	}
}
