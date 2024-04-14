export default {
	sceneFadeDuration: 200,
	debug: import.meta.env.VITE_DEBUG === 'true',
	showFps: import.meta.env.VITE_DEBUG === 'true',
	bugTracking: import.meta.env.VITE_BUG_TRACKING === 'true',
	stage: {
		startMobAmount: 3,
		maxStageMobAmount: 16,
		waveInterval: 1000,
		bonusBone: 0.05,
		bonusBoneCost: 10,
		boneCost: 1,
	},
	character: {
		minSpeed: 50,
		speedOffset: 50,
		minHealth: 1,
		maxHealth: 5,
	},
	objects: {
		saw: {
			damage: 1,
			strength: 3,
			cost: 10,
			repairCost: 5,
			speed: 1500,
			interval: 1000,
			fadeSpeed: 100,
		},
		fireBall: {
			damage: 2,
			strength: 4,
			cost: 15,
			repairCost: 8,
		},
		hands: {
			cost: 12,
			repairCost: 10,
		},
		candles: {
			cost: 5,
		},
		tombstones: {
			damage: 3,
			strength: 5,
			cost: 20,
			repairCost: 15,
			attackInterval: 5000,
			smokeSpeed: 500,
		},
	},
};
