import { Scene, vec } from 'excalibur';
import Circular from '@/game/components/constructions/circular';
import HellishHugs from '@/game/components/constructions/hellish-hugs';
import ManaCandles from '@/game/components/constructions/mana-candles';
import Tombstones from '@/game/components/constructions/tombstones';
import type Construction from '@/game/components/construction';
import StageBg from '@/game/components/stage-bg';
import Caster from '@/game/components/caster';
import ZAxisSortSystem from '@/game/partials/z-axis-sort-system';
import Fireballs from '@/game/components/constructions/fireballs';
import SpawnSystem from '@/game/spawn-system';
import Statue from '@/game/components/statue';
import { STAGE_EVENTS } from '@/enums';
import { bones, constructionsBuilt, popup } from '@/stores';
import config from '@/config';
import game from '@/game/game';

export default class Stage extends Scene {
	private spawnSystem!: SpawnSystem;

	onInitialize() {
		this.camera.pos.setTo(0, -25);

		this.spawnSystem = new SpawnSystem(this);
		this.world.add(new ZAxisSortSystem());

		this.registerEvents();
	}

	onActivate() {
		this.addBg();
		this.addCaster();
		this.addStatues();
	}

	placeFireballs() {
		bones.reserve(config.objects.fireBall.cost);
		this.placeConstruction(new Fireballs());
	}

	placeCircular() {
		bones.reserve(config.objects.saw.cost);
		this.placeConstruction(new Circular());
	}

	placeHellishHugs() {
		bones.reserve(config.objects.hands.cost);
		this.placeConstruction(new HellishHugs());
	}

	placeManaCandles() {
		bones.reserve(config.objects.candles.cost);
		this.placeConstruction(new ManaCandles());
	}

	placeTombstone() {
		bones.reserve(config.objects.tombstones.cost);
		this.placeConstruction(new Tombstones());
	}

	cancelConstruction() {
		this.emit(STAGE_EVENTS.CANCEL_CONSTRUCTION);
	}

	destroy(constructionId: number) {
		constructionsBuilt.destroy(constructionId);
		this.world.entityManager.getById(constructionId)?.kill();
	}

	private registerEvents() {
		this.events.on(STAGE_EVENTS.GAME_OVER, () => {
			game.stop();
			popup.gameOver();
		});
	}

	private addBg() {
		this.add(new StageBg());
	}

	private addCaster() {
		this.add(new Caster());
	}

	private placeConstruction(construction: Construction) {
		this.cancelConstruction();
		this.add(construction);
	}

	private addStatues() {
		const positions = [
			vec(-120, 70),
			vec(120, 70),
			vec(0, -120),
		];

		for (let [index, position] of positions.entries()) {
			this.add(new Statue({
				pos: position,
			}, index));
		}
	}
}
