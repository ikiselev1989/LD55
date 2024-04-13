import type { Loadable } from 'excalibur';
import { Animation, AnimationStrategy, range, Sprite, Vector } from 'excalibur';
import type { ISpriteSheetJSON } from '@/types';
import JSONSpriteSheet from '@/game/partials/json-spritesheet';

export default class JSONSpriteSheetAnimation implements Loadable<JSONSpriteSheet[]> {
	data: JSONSpriteSheet[];
	private animationMap = new Map<string, Animation>();
	private frames!: ISpriteSheetJSON['frames'];
	private framesName!: string[];
	private sprites: Sprite[] = [];

	constructor(
		private readonly path: string[],
		private readonly frameRate = 1000 / 24,
	) {
		this.data = this.path.map(path => new JSONSpriteSheet(path));
	}

	private static parseKeyName(key: string) {
		const keys = key.split('/');
		return key.replace(`/${keys[keys.length - 1]}`, '');
	}

	isLoaded(): boolean {
		return !this.data?.some(spritesheet => !spritesheet.isLoaded());
	}

	async load(): Promise<JSONSpriteSheet[]> {
		await Promise.all([...this.data.map(spritesheet => spritesheet.load())]);

		this.compileSpriteSheets();

		return this.data;
	}

	getAnimation(name: string, strategy?: AnimationStrategy): Animation | null {
		if (this.animationMap.has(name)) {
			const anim = <Animation>this.animationMap.get(name);

			if (strategy) anim.strategy = strategy;

			return anim;
		}

		return null;
	}

	private compileSpriteSheets() {
		this.frames = {
			...this.data.reduce(
				(acc, { data }) => ({
					...acc,
					...data.frames,
				}),
				{},
			),
		};
		this.framesName = Object.keys(this.frames).sort((a, b) =>
			a.localeCompare(b, undefined, {
				numeric: true,
				sensitivity: 'base',
			}),
		);

		this.makeFrameSprites();
		this.parseAnimations();
	}

	private makeFrameSprites() {
		let spritesByFrames: { [key: string]: any } = {};

		for (let jsonSpriteSheet of this.data) {
			const framesKeys = Object.keys(jsonSpriteSheet.data.frames);
			const spritesList = jsonSpriteSheet.spritesheet.sprites;

			for (let [ind, sprite] of spritesList.entries()) {
				spritesByFrames = {
					...spritesByFrames,
					[framesKeys[ind]]: sprite,
				};
			}
		}

		this.sprites = Object.keys(spritesByFrames)
			.sort((a, b) =>
				a.localeCompare(b, undefined, {
					numeric: true,
					sensitivity: 'base',
				}),
			)
			.map(key => spritesByFrames[key]);
	}

	private parseAnimations() {
		const animationKeys = new Set([
			...this.framesName.map(key => {
				return JSONSpriteSheetAnimation.parseKeyName(key);
			}),
		]);

		for (let key of animationKeys) {
			const startIndex = this.framesName.findIndex(
				frameKey => JSONSpriteSheetAnimation.parseKeyName(frameKey) === key,
			);
			const endIndex =
				startIndex +
				this.framesName.filter(frameKey => JSONSpriteSheetAnimation.parseKeyName(frameKey) === key)
					.length -
				1;
			const frameIndices = range(startIndex, endIndex);
			const frames = this.sprites
				.filter((val, index) => frameIndices.indexOf(index) > -1)
				.map(val => ({
					graphic: val,
					duration: this.frameRate,
				}));

			const anim = new Animation({
				frames,
				strategy: AnimationStrategy.Loop,
				origin: [...frames].pop()?.graphic.origin ?? Vector.Half,
			});

			anim.pause();
			this.animationMap.set(key, anim);
		}
	}
}
