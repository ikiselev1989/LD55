import { Actor, Material, PointerButton, PointerEvent, Sprite, Vector } from 'excalibur';
import game from '@/game/game';
import type Stage from '@/game/scenes/Stage';
import { GLOBAL_KEYS_EVENTS, INPUT_EVENT, STAGE_EVENTS, Z_INDEX } from '@/enums';
import constructionShader from '@//game/materials/construction.glsl';
import res from '@/res';
import { bones, constructionsBuilt } from '@/stores';
import type { Assets } from '@/game/resources/assets';

export default abstract class Construction extends Actor {
	abstract formSprite: Sprite;
	abstract iconAsset: Assets;
	declare scene: Stage;
	objectAmount!: number;
	protected safePlace = false;
	private material!: Material;

	onInitialize() {
		this.z = Z_INDEX.FLOOR;

		this.initGraphics();
		this.registerEvents();
		this.scaleForm(game.input.pointers.at(0).lastWorldPos);

		game.input.pointers.events.pipe(this.events);
		game.events.pipe(this.events);
		this.scene.events.pipe(this.events);
	}

	protected rotate() {

	}

	protected addObjects() {
	}

	protected build() {
		!this.safePlace && constructionsBuilt.build({
			id: this.id,
			iconAsset: this.iconAsset,
			strength: 1,
		});
		bones.buy();
		this.addObjects();
		this.unregisterEvents();
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

		// @ts-ignore
		this.events.on('move', (e: PointerEvent) => this.scaleForm(e.worldPos));
		this.events.on('down', ({ button }) => {
				button === PointerButton.Left && this.build();
				button === PointerButton.Right && this.scene.cancelConstruction();
			},
		);

		this.events.on(GLOBAL_KEYS_EVENTS.wasPressed, event => {
			if (event === INPUT_EVENT.CONSTRUCTION_ROTATE) this.rotate();
		});
	}

	private scaleForm = (worldPos: Vector) => {
		const { x, y } = worldPos;
		const centerOffset = Math.max(Math.abs(x), Math.abs(y));
		const step = 0.15;

		const minScale = 500 / this.formSprite.width;

		let scale = Math.max(Math.min(centerOffset * 2 / this.formSprite.width, 1), minScale);
		scale = Math.floor(scale / step) * step;

		this.material.update(shader => {
			shader.trySetUniformFloat('scale', scale);
		});

		this.scale.setTo(scale, scale);
	};
}
