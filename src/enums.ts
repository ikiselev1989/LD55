export enum GLOBAL_KEYS_EVENTS {
	isHeld = 'isHeld',
	wasPressed = 'wasPressed',
	wasReleased = 'wasReleased',
}

export enum INPUT_EVENT {
	ACCEPT = 'ACCEPT',
	DECLINE = 'DECLINE',
	UP = 'UP',
	DOWN = 'DOWN',
	LEFT = 'LEFT',
	RIGHT = 'RIGHT',
	USE = 'USE',
	CONSTRUCTION_ROTATE = 'CONSTRUCTION_ROTATE',
}

export enum STAGE_EVENTS {
	CANCEL_CONSTRUCTION = 'cancelConstruction',
	DESTROYED_CONSTRUCTION = 'destroyedConstruction',
	GAME_OVER = 'gameOver',
}

export enum Z_INDEX {
	BG,
	FLOOR,
	ON_FLOOR,
	OBJECT,
	JUMP = 1000,
}

export enum TAGS {
	MOB = 'mob',
	Z_AXIS_SORT = 'zAxisSort',
	TARGET = 'target',
	STATUE = 'statue',
	OBJECT = 'object',
}

export enum NAMES {
	FIREBALL = 'fireball',
	SAW = 'saw',
	TOMBSTONE = 'tombstone',
	SMOKE = 'smoke',
	STATUE = 'statue',
	HAND = 'hand',
	BOILER_RUSH_AIM = 'boilerRushAim',
}
