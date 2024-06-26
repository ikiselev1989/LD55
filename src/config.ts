export default {
	sceneFadeDuration: 200,
	debug: import.meta.env.VITE_DEBUG === 'true',
	showFps: import.meta.env.VITE_DEBUG === 'true',
	bugTracking: import.meta.env.VITE_BUG_TRACKING === 'true',
	stage: {
		startBones: 30,
		minStageMobAmount: 3,
		maxStageMobAmount: 16,
		waveInterval: 3000,
		bonusBone: 0.05,
		bonusBoneCost: 10,
		boneCost: 1,
		startWavesAmount: 20,
	},
	character: {
		damage: 1,
		minSpeed: 50,
		speedOffset: 50,
		minHealth: 1,
		maxHealth: 7,
		hitAnimationSpeed: 300,
		attackInterval: 2000,
	},
	objects: {
		boiler: {
			damage: 10,
			cost: 50,
			coolDown: 15000,
		},
		statue: {
			strength: 30,
			attackInterval: 5000,
			aimTime: 2000,
			damage: 4,
		},
		hands: {
			damage: 1,
			cost: 10,
			strength: 2,
			repairCost: 10,
			maxAmount: 16,
		},
		saw: {
			damage: 2,
			strength: 4,
			cost: 12,
			repairCost: 5,
			speed: 1500,
			interval: 500,
			fadeSpeed: 100,
		},
		fireBall: {
			damage: 3,
			strength: 5,
			cost: 15,
			repairCost: 8,
			maxAmount: 8,
		},
		tombstones: {
			damage: 4,
			strength: 6,
			cost: 20,
			repairCost: 15,
			attackInterval: 5000,
			smokeSpeed: 500,
		},
		candles: {
			cost: 50,
		},
	},
};
