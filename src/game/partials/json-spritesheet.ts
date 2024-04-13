import type { GetSpriteOptions, Loadable } from 'excalibur';
import { ImageSource, Resource, Sprite, SpriteSheet, vec } from 'excalibur';
import type { ISpriteSheetJSON } from '@/types';
import { canUseWebP } from '@/game/utils';

export default class JSONSpriteSheet implements Loadable<ISpriteSheetJSON> {
	data!: ISpriteSheetJSON;
	private _json: Resource<ISpriteSheetJSON>;
	private _img: ImageSource;
	private _spriteSheet!: SpriteSheet;

	constructor(private readonly path: string) {
		const actualPath = this.path;

		this._json = new Resource(actualPath, 'json');
		this._img = new ImageSource(actualPath.replace('.json', canUseWebP() ? '.webp' : '.png'));
	}

	get imageSource() {
		return this._img;
	}

	get spritesheet() {
		if (!!this._spriteSheet) return this._spriteSheet;

		return this.makeSpriteSheet();
	}

	isLoaded(): boolean {
		return !!this.data;
	}

	async load(): Promise<ISpriteSheetJSON> {
		if (this.isLoaded()) return this.data;

		await this._img.load();

		this.data = await this._json.load();

		return this.data;
	}

	getFrame(name: string) {
		if (Object.keys(this.data.frames).includes(name)) {
			return this.data.frames[name];
		}

		return null;
	}

	getFrameSprite(name: string, conf?: GetSpriteOptions): Sprite | null {
		if (Object.keys(this.data.frames).includes(name)) {
			return <Sprite>(
				this.spritesheet.getSprite(Object.keys(this.data.frames).indexOf(name), 0, conf)?.clone()
			);
		}

		return null;
	}

	private makeSpriteSheet() {
		this._spriteSheet = new SpriteSheet({
			// @ts-ignore
			sprites: Object.values(this.data.frames).map(({ frame, pivot }) => {
				return new Sprite({
					image: this.imageSource,
					sourceView: {
						width: frame.w,
						height: frame.h,
						x: frame.x,
						y: frame.y,
					},
					origin: vec(pivot.x, pivot.y),
				});
			}),
		});

		return this._spriteSheet;
	}
}
