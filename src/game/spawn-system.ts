import type Stage from '@/game/scenes/Stage';
import Mob from '@/game/components/mob';
import { vec } from 'excalibur';
import { lerp, random } from '@/game/utils';
import { TAGS } from '@/enums';
import config from '@/config';
import game from '@/game/game';

export default class SpawnSystem {
	currentWave = 0;

	constructor(private stage: Stage) {
		stage.on('activate', () => {
			setTimeout(() => {
				this.spawn();
				this.waveSchedule();
			}, 1000);
		});
	}

	private waveSchedule() {
		game.clock.schedule(() => {
			this.spawn();
			this.waveSchedule();
		}, config.stage.waveInterval);
	}

	private spawn() {
		const startWavesMultiplier = Math.min(this.currentWave / config.stage.startWavesAmount, 1);
		const maxMobInWave = Math.floor(lerp(config.stage.minStageMobAmount, config.stage.maxStageMobAmount, startWavesMultiplier));
		const mobLength = this.stage.world.queryTags([TAGS.MOB]).entities.length;
		const screenOffset = 500;
		const rangeOffset = (Math.PI * 2) / 16;
		const angles = new Array(16).fill(0).map((value, index) => rangeOffset * index);

		for (let angle of random.pickSet(angles, maxMobInWave - mobLength, false)) {
			const character = new Mob({
				pos: vec((screenOffset + 1920 / 2) * Math.sin(angle), (screenOffset * .5 + 1080 / 2) * Math.cos(angle)),
			});

			this.stage.add(character);
		}

		this.currentWave++;
	}
}
