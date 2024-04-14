import type { ActorArgs } from 'excalibur';
import { Actor, CollisionGroup, CollisionStartEvent } from 'excalibur';
import { enemyGroup } from '@/game/collisions';
import Character from '@/game/components/character';

export default class DamageObject extends Actor {
	protected damageValue!: number;

	constructor(props: ActorArgs) {
		super({
			...props,
			collisionGroup: CollisionGroup.collidesWith([enemyGroup]),
		});
	}

	onInitialize() {
		this.on('collisionstart', this.damage.bind(this));
	}

	damage(e: CollisionStartEvent) {
		if (e.other instanceof Character) {
			e.other.damage(this.damageValue);
		}
	}
}
