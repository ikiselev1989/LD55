import { Actor, Material, PointerEvent, Sprite } from 'excalibur';
import game from '@/game/game';
import type Stage from '@/game/scenes/Stage';
import { GLOBAL_KEYS_EVENTS, INPUT_EVENT, STAGE_EVENTS, Z_INDEX } from '@/enums';
import constructionShader from '@//game/materials/construction.glsl';
import res from '@/res';

export default abstract class Construction extends Actor {
	abstract formSprite: Sprite;
	declare scene: Stage;
	private material!: Material;

	onInitialize() {
		this.z = Z_INDEX.FLOOR;

		this.initGraphics();
		this.registerEvents();

		game.input.pointers.events.pipe(this.events);
		game.events.pipe(this.events);
		this.scene.events.pipe(this.events);
	}

	protected rotate() {

	}

	private unregisterEvents() {
		game.input.pointers.events.unpipe(this.events);
		game.events.unpipe(this.events);
		this.scene.events.unpipe(this.events);
	}

	private initGraphics() {
		this.graphics.use(this.formSprite);

		this.material = this.graphics.material = game.graphicsContext.createMaterial({
			name: 'construction',
			fragmentSource: constructionShader,
			images: {
				u_noise: res.noise,
			},
		});
	}

	private registerEvents() {
		this.events.on(STAGE_EVENTS.CANCEL_CONSTRUCTION, () => {
			this.unregisterEvents();
			this.kill();
		});

		const scaleForm = (e: PointerEvent) => this.scaleForm(e);

		// @ts-ignore
		this.events.on('move', scaleForm);
		this.events.on('down', () => {
				this.unregisterEvents();
			},
		);

		this.events.on(GLOBAL_KEYS_EVENTS.wasPressed, event => {
			if (event === INPUT_EVENT.CONSTRUCTION_ROTATE) this.rotate();
		});
	}

	private scaleForm = (event: PointerEvent) => {
		const { x, y } = event.worldPos;
		const centerOffset = Math.max(Math.abs(x), Math.abs(y));

		const minScale = 400 / this.formSprite.width;

		let scale = Math.max(Math.min(centerOffset * 2 / this.formSprite.width, 1), minScale);
		scale = Math.floor(scale / 0.1) * 0.1;

		this.scale.setTo(scale, scale);
	};
}
