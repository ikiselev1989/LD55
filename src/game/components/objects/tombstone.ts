import type { ActorArgs, Animation } from 'excalibur';
import { Actor, AnimationStrategy, CollisionGroup, vec, Vector } from 'excalibur';
import { NAMES, TAGS } from '@/enums';
import res from '@/res';
import { enemyGroup } from '@/game/collisions';
import type { HasConstruction } from '@/types';
import type Construction from '@/game/components/construction';
import Stage from '@/game/scenes/Stage';
import game from '@/game/game';
import config from '@/config';
import { Animations } from '@/game/resources/animations';
import type Character from '@/game/components/character';
import Smoke from '@/game/components/smoke';

export default class Tombstone extends Actor implements HasConstruction {
	constructionId!: number;
	declare scene: Stage;
	private animation!: Animation;

	constructor(props: ActorArgs, private construction: Construction) {
		super({
			...props,
			collisionGroup: CollisionGroup.collidesWith([enemyGroup]),
		});
	}

	onInitialize() {
		this.name = NAMES.TOMBSTONE;
		this.constructionId = this.construction.id;
		this.collider.useCircleCollider(30);
		this.addTag(TAGS.Z_AXIS_SORT);
		this.addTag(TAGS.TARGET);

		this.initGraphics();
		this.startAttacking();
	}

	onPostKill(scene: Stage) {
		const length = scene.world.entityManager.getByName(this.name).filter((obj) => {
			return (<Tombstone>obj).constructionId === this.constructionId;
		}).length;

		if (length === 1) scene.destroy(this.constructionId);
	}

	private async startAttacking() {
		await game.clock.schedule(() => {
			this.attack();
			!this.isKilled() && this.startAttacking();
		}, config.objects.tombstones.attackInterval);
	}

	private attack() {
		const sorted = this.scene.world.queryTags([TAGS.MOB]).entities.sort((a, b) => {
			return (<Character>a).pos.distance(this.pos) < (<Character>b).pos.distance(this.pos) ? -1 : 1;
		});

		const nearest = (<Character>sorted[0]);

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

	private initGraphics() {
		this.animation = <Animation>res.animation.getAnimation(Animations.ANIMATIONS__A_TOMBSTONE__ATTACK, AnimationStrategy.Freeze)?.clone();
		this.animation.pause();

		this.graphics.use(this.animation, {
			anchor: this.animation.origin || Vector.Zero,
		});
	}
}
