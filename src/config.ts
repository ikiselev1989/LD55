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
	},
	character: {
		minSpeed: 50,
		speedOffset: 50,
		minHealth: 1,
		maxHealth: 5,
	},
	objects: {
		sawDamage: 1,
		fireBallDamage: 2,
	},
};
