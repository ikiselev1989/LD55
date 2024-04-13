import { Scene } from 'excalibur';
import Circular from '@/game/components/constructions/circular';
import HellishHugs from '@/game/components/constructions/hellish-hugs';
import ManaCandles from '@/game/components/constructions/mana-candles';
import Tombstones from '@/game/components/constructions/tombstones';
import type Construction from '@/game/components/construction';
import { STAGE_EVENTS } from '@/enums';
import StageBg from '@/game/components/stage-bg';
import Caster from '@/game/components/caster';
import ZAxisSortSystem from '@/game/partials/z-axis-sort-system';
import Fireballs from '@/game/components/constructions/fireballs';

export default class Stage extends Scene {
	onInitialize() {
		this.camera.pos.setTo(0, -25);

		this.world.add(new ZAxisSortSystem());
	}

	onActivate() {
		this.addBg();
		this.addCaster();
	}

	placeFireballs() {
		this.placeConstruction(new Fireballs());
	}

	placeCircular() {
		this.placeConstruction(new Circular());
	}

	placeHellishHugs() {
		this.placeConstruction(new HellishHugs());
	}

	placeManaCandles() {
		this.placeConstruction(new ManaCandles());
	}

	placeTombstone() {
		this.placeConstruction(new Tombstones());
	}

	private addBg() {
		this.add(new StageBg());
	}

	private addCaster() {
		this.add(new Caster());
	}

	private placeConstruction(construction: Construction) {
		this.emit(STAGE_EVENTS.CANCEL_CONSTRUCTION);

		this.add(construction);
	}
}
