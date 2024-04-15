import { Howl, Howler } from 'howler';
import game from '@/game/game';
import { get } from 'svelte/store';
import { sound } from '@/stores';

class Sound<T extends Record<string, string>> {
	private source = <Record<keyof T, Howl>>{};

	constructor(config: T) {
		for (let key of Object.keys(config)) {
			this.addSound(key, config[key]);
		}

		document.addEventListener('visibilitychange', () => {
			if (document.visibilityState === 'hidden') {
				this.mute(true);
			} else if (document.visibilityState === 'visible') {
				get(sound) && this.mute(false);
			}
		});
	}

	play(key: keyof T, loop = false) {
		const sound = this.source[key];

		return new Promise(resolve => {
			sound.on('end', resolve);
			sound.volume(1);
			sound.loop(loop);
			sound.play();
		});
	}

	volume(key: keyof T, vol: number) {
		const sound = this.source[key];

		sound.volume(vol);
	}

	getSound(key: keyof T) {
		return this.source[key];
	}

	async fadeAll() {
		for (let key of Object.keys(this.source)) {
			this.source[key].fade(this.source[key].volume(), 0, 200);
		}

		await game.waitFor(200);
		this.stopAll();
	}

	stopAll() {
		Howler.stop();
	}

	mute(val: boolean) {
		Howler.mute(val);
	}

	private addSound(key: keyof T, src: string) {
		this.source[key] = new Howl({
			src,
		});
	}
}

const soundController = new Sound({
	bg: 'sound/bg.mp3',
	build: 'sound/build.mp3',
	coin: 'sound/coin.mp3',
	expl: 'sound/expl.mp3',
	hurt: 'sound/hurt.mp3',
	loose: 'sound/loose.mp3',
});

export default soundController;
