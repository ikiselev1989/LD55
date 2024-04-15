import type Stage from '@/game/scenes/Stage';
import Mob from '@/game/components/mob';
import { Timer, vec } from 'excalibur';
import { lerp, random } from '@/game/utils';
import { TAGS } from '@/enums';
import config from '@/config';

export default class SpawnSystem {
	currentWave = 0;
	private timer = new Timer({
		fcn: () => this.spawn(),
		interval: config.stage.waveInterval,
		repeats: true,
	});

	constructor(private stage: Stage) {
		stage.add(this.timer);
		this.timer.start();
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
