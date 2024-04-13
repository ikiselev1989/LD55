import type { INPUT_EVENT } from '@/enums';
import type { Buttons, Keys } from 'excalibur';
import { PointerButton } from 'excalibur';

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
