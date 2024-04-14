import type { INPUT_EVENT } from '@/enums';
import type { Buttons, Keys } from 'excalibur';
import { PointerButton } from 'excalibur';
import type { Assets } from '@/game/resources/assets';

export interface ISpriteSheetJSON {
	frames: {
		[key: string]: {
			frame: {
				w: number;
				h: number;
				x: number;
				y: number;
			};
		};
	};
	meta: {
		image: string;
	};
}

export type GlobalInputMapping = {
	[key in INPUT_EVENT]: {
		gamepad?: Buttons[];
		keys?: Keys[];
		pointer?: PointerButton[];
	};
};

export interface ConstructionBuild {
	id: number;
	iconAsset: Assets;
}

export interface HasConstruction {
	constructionId: number;
}

export interface CanBeDamaged {
	damage: (val: number) => void;
}
