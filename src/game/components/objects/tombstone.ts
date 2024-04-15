import type { ActorArgs, Animation } from 'excalibur';
import { AnimationStrategy, CollisionGroup, vec, Vector } from 'excalibur';
import { NAMES, TAGS } from '@/enums';
import res from '@/res';
import { enemyGroup } from '@/game/collisions';
import type { CanBeDamaged, HasConstruction } from '@/types';
import type Construction from '@/game/components/construction';
import Stage from '@/game/scenes/Stage';
import game from '@/game/game';
import config from '@/config';
import { Animations } from '@/game/resources/animations';
import type Mob from '@/game/components/mob';
import Smoke from '@/game/components/smoke';
import Character from '@/game/components/character';
import { easeInOutSine } from '@/game/utils';
import { constructionsBuilt } from '@/stores';

export default class Tombstone extends Character implements HasConstruction, CanBeDamaged {
	constructionId!: number;
	declare scene: Stage;
	private animation!: Animation;
	private strength!: number;

	constructor(props: ActorArgs, private construction: Construction) {
		super({
			...props,
			collisionGroup: CollisionGroup.collidesWith([enemyGroup]),
		});
	}

	onInitialize() {
		this.name = NAMES.TOMBSTONE;
		this.strength = config.objects.tombstones.strength;
		this.constructionId = this.construction.id;
		this.collider.useCircleCollider(30);
		this.addTag(TAGS.Z_AXIS_SORT);
		this.addTag(TAGS.TARGET);
		this.addTag(TAGS.OBJECT);

		this.initGraphics();
		this.startAttacking();
	}

	onPostKill(scene: Stage) {
		constructionsBuilt.damage(this.constructionId, 1 / this.construction.objectAmount);

		const length = scene.world.entityManager.getByName(this.name).filter((obj) => {
			return (<Tombstone>obj).constructionId === this.constructionId;
		}).length;

		if (length === 1) scene.destroy(this.constructionId);
	}

	damage(val: number) {
		this.strength -= val;

		if (this.strength <= 0) return this.kill();

		game.tween(progress => {
			this.material.update(shader => {
				shader.trySetUniformFloat('hitAmount', Math.sin(Math.PI * easeInOutSine(progress)));
			});
		}, config.character.hitAnimationSpeed);
	}

	protected initGraphics() {
		super.initGraphics();

		this.animation = <Animation>res.animation.getAnimation(Animations.ANIMATIONS__A_TOMBSTONE__ATTACK, AnimationStrategy.Freeze)?.clone();
		this.animation.pause();

		this.graphics.use(this.animation, {
			anchor: this.animation.origin || Vector.Zero,
		});
	}

	private async startAttacking() {
		await game.clock.schedule(() => {
			if (this.isKilled()) return;

			this.attack();
			this.startAttacking();
		}, config.objects.tombstones.attackInterval);
	}

	private attack() {
		const sorted = this.scene.world.queryTags([TAGS.MOB]).entities.filter(value => !value.isKilled()).sort((a, b) => {
			return (<Mob>a).pos.distance(this.pos) < (<Mob>b).pos.distance(this.pos) ? -1 : 1;
		});

		const nearest = (<Mob>sorted[0]);

		if (nearest) {
			this.animation.reset();
			this.animation.play();

			this.animation.events.once('end', () => {
				this.scene.add(new Smoke({
					pos: this.pos.clone().add(vec(-40, 0)),
				}, nearest));
			});
		}
	}
}
