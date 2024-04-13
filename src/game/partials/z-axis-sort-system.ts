import { Actor, Scene, System, SystemType, TagQuery, World } from 'excalibur';
import { TAGS } from '@/enums';
import game from '@/game/game';

export default class ZAxisSortSystem extends System {
	readonly systemType: SystemType = SystemType.Draw;
	private query!: TagQuery<string>;
	private world!: World;
	private scene!: Scene;

	initialize(world: World, scene: Scene) {
		this.world = world;
		this.scene = scene;
		this.query = world.queryTags([TAGS.Z_AXIS_SORT]);
	}

	update(elapsedMs: number): void {
		for (let entity of this.query.entities) {
			const actor = (<Actor>entity);

			actor.z = game.screen.worldToScreenCoordinates(actor.pos).y;
		}
	}
}
