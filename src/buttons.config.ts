import { Buttons, Keys } from 'excalibur';
import type { GlobalInputMapping } from '@/types';
import { INPUT_EVENT } from '@/enums';

const xBoxGamepadMapping = {
	UP: Buttons.DpadUp,
	DOWN: Buttons.DpadDown,
	LEFT: Buttons.DpadLeft,
	RIGHT: Buttons.DpadRight,
	A: Buttons.Face1,
	B: Buttons.Face2,
	X: Buttons.Face3,
	Y: Buttons.Face4,
};

export const globalInputMapping: GlobalInputMapping = {
	[INPUT_EVENT.ACCEPT]: {
		keys: [Keys.Space, Keys.Enter, Keys.NumpadEnter],
		gamepad: [xBoxGamepadMapping.A],
	},
	[INPUT_EVENT.DECLINE]: {
		keys: [Keys.Esc, Keys.Escape],
		gamepad: [xBoxGamepadMapping.B],
	},
	[INPUT_EVENT.UP]: {
		keys: [Keys.Up],
		gamepad: [xBoxGamepadMapping.UP],
	},
	[INPUT_EVENT.DOWN]: {
		keys: [Keys.Down],
		gamepad: [xBoxGamepadMapping.DOWN],
	},
	[INPUT_EVENT.LEFT]: {
		keys: [Keys.Left],
		gamepad: [xBoxGamepadMapping.LEFT],
	},
	[INPUT_EVENT.RIGHT]: {
		keys: [Keys.Right],
		gamepad: [xBoxGamepadMapping.RIGHT],
	},
	[INPUT_EVENT.USE]: {
		keys: [Keys.E],
		gamepad: [xBoxGamepadMapping.A],
	},
};
