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
import { Assets } from '@/game/resources/assets';
import { STAGE_EVENTS } from '@/enums';
import { bones } from '@/stores';
import config from '@/config';

export default class Stage extends Scene {
	private spawnSystem!: SpawnSystem;

	onInitialize() {
		this.camera.pos.setTo(0, -25);

		this.spawnSystem = new SpawnSystem(this);
		this.world.add(new ZAxisSortSystem());
	}

	onActivate() {
		this.addBg();
		this.addCaster();
		this.addStatues();
	}

	placeFireballs() {
		bones.buy(config.objects.fireBall.cost);
		this.placeConstruction(new Fireballs());
	}

	placeCircular() {
		bones.buy(config.objects.saw.cost);
		this.placeConstruction(new Circular());
	}

	placeHellishHugs() {
		bones.buy(config.objects.hands.cost);
		this.placeConstruction(new HellishHugs());
	}

	placeManaCandles() {
		bones.buy(config.objects.candles.cost);
		this.placeConstruction(new ManaCandles());
	}

	placeTombstone() {
		bones.buy(config.objects.tombstones.cost);
		this.placeConstruction(new Tombstones());
	}

	cancelConstruction() {
		this.emit(STAGE_EVENTS.CANCEL_CONSTRUCTION);
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

		const assets = [
			Assets.STATUES__1,
			Assets.STATUES__3,
			Assets.STATUES__2,
		];

		for (let [index, position] of positions.entries()) {
			this.add(new Statue({
				pos: position,
			}, assets[index]));
		}
	}
}
