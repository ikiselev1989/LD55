import { Scene } from 'excalibur';
import Circular from '@/game/components/constructions/circular';
import HellishHugs from '@/game/components/constructions/hellish-hugs';
import ManaCandles from '@/game/components/constructions/mana-candles';
import Tombstone from '@/game/components/constructions/tombstone';
import type Construction from '@/game/components/construction';
import { STAGE_EVENTS } from '@/enums';
import StageBg from '@/game/components/stage-bg';

export default class Stage extends Scene {
	onInitialize() {
		this.camera.pos.setTo(0, 0);
	}

	onActivate() {
		this.addBg();
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
		this.placeConstruction(new Tombstone());
	}

	private addBg() {
		this.add(new StageBg());
	}

	private placeConstruction(construction: Construction) {
		this.emit(STAGE_EVENTS.CANCEL_CONSTRUCTION);

		this.add(construction);
	}
}
