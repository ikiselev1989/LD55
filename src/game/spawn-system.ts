import type Stage from '@/game/scenes/Stage';
import Character from '@/game/components/character';
import { vec } from 'excalibur';
import { random } from '@/game/utils';
import { TAGS } from '@/enums';

export default class SpawnSystem {
	constructor(private stage: Stage) {
		setTimeout(() => this.spawn(), 5000);
	}

	spawn() {
		const mobLength = this.stage.world.queryTags([TAGS.MOB]).entities.length;
		const maxMobInWave = 16;
		const screenOffset = 500;
		const rangeOffset = (Math.PI * 2) / 16;
		const angles = new Array(16).fill(0).map((value, index) => rangeOffset * index);

		for (let angle of random.pickSet(angles, maxMobInWave - mobLength, false)) {
			const character = new Character({
				pos: vec((screenOffset + 1920 / 2) * Math.sin(angle), (screenOffset * .5 + 1080 / 2) * Math.cos(angle)),
			});

			this.stage.add(character);
		}
	}
}
