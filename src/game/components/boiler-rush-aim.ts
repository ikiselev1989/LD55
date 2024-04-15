import { Actor, PointerButton, PointerEvent, Sprite } from 'excalibur';
import res from '@/res';
import { Assets } from '@/game/resources/assets';
import game from '@/game/game';
import { NAMES, STAGE_EVENTS, TAGS } from '@/enums';
import BoilerRushExplosion from '@/game/components/boiler-rush-explosion';
import type Stage from '@/game/scenes/Stage';

export default class BoilerRushAim extends Actor {
	declare scene: Stage;

	onInitialize() {
		this.name = NAMES.BOILER_RUSH_AIM;
		this.pos = game.input.pointers.at(0).lastWorldPos;
		this.addTag(TAGS.Z_AXIS_SORT);
		this.initGraphics();
		this.registerEvents();
	}

	onPreKill() {
		this.unregisterEvents();
	}

	private registerEvents() {
		game.input.pointers.events.pipe(this.events);
		this.scene.events.pipe(this.events);

		// @ts-ignore
		this.events.on('move', (e: PointerEvent) => {
			this.pos = e.worldPos;
		});

		// @ts-ignore
		this.events.on('down', (e: PointerEvent) => {
			this.kill();

			e.button === PointerButton.Left && this.scene.add(new BoilerRushExplosion({
				pos: e.worldPos,
			}));
		});

		this.events.on(STAGE_EVENTS.CANCEL_CONSTRUCTION, () => {
			this.kill();
		});
	}

	private unregisterEvents() {
		game.input.pointers.events.unpipe(this.events);
		this.scene.events.unpipe(this.events);
	}

	private initGraphics() {
		this.graphics.use(<Sprite>res.assets.getFrameSprite(Assets.BOILER_RUSH__AIM));
	}
}
