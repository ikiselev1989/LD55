import { get, writable } from 'svelte/store';
import { SvelteComponent } from 'svelte';
import StartMenu from '@/ui/screens/StartMenu.svelte';
import Game from '@/ui/screens/Game.svelte';
import config from '@/config';
import type { ConstructionBuild } from '@/types';
import GameOver from '@/ui/popups/GameOver.svelte';

export const sound = writable(true);

export const screen = (() => {
	const { subscribe, set } = writable<typeof SvelteComponent>();

	return {
		subscribe,
		startMenu: () => set(StartMenu),
		game: () => set(Game),
	};
})();

export const popup = (() => {
	const { subscribe, set } = writable<typeof SvelteComponent | null>();

	return {
		subscribe,
		gameOver: () => set(GameOver),
		hide: () => set(null),
	};
})();

export const input = (() => {
	const { subscribe, update } = writable({
		available: false,
		gamepad: false,
	});

	return {
		subscribe,
		available: () => get(input).available,
		enable: () =>
			update(v =>
				Object.assign(v, {
					available: true,
				}),
			),
		disable: () =>
			update(v =>
				Object.assign(v, {
					available: false,
				}),
			),
		connectGamepad: () =>
			update(v =>
				Object.assign(v, {
					gamepad: true,
				}),
			),
		disconnectGamepad: () =>
			update(v =>
				Object.assign(v, {
					gamepad: false,
				}),
			),
	};
})();

export const constructionsBuilt = (() => {
	const { subscribe, update } = writable<ConstructionBuild[]>([]);

	return {
		subscribe,
		build: (construction: ConstructionBuild) => update(value => [...value, construction]),
		damage: (id: number, value: number) =>
			update(constructionBuilds => {
				const build = constructionBuilds.find((build) => build.id === id);
				build && (build.strength = Math.max(build.strength - value, 0));

				return constructionBuilds;
			}),
		destroy: (id: number) =>
			update(constructionBuilds => constructionBuilds.filter((build) => {
				return build.id !== id;
			})),
		available: () => get(constructionsBuilt).length < get(constructionsPlaceAvailable),
	};
})();

export const constructionsPlaceAvailable = (() => {
	const { subscribe, update } = writable(3);

	return {
		subscribe,
		expand: () => update(value => (value + 1)),
	};
})();

export const bones = (() => {
	const { subscribe, update } = writable(config.stage.startBones);

	let reserve = 0;
	let total = 0;

	return {
		subscribe,
		bonusBoneCollect: () => {
			total += config.stage.bonusBoneCost;
			update(value => (value + config.stage.bonusBoneCost));
		},
		boneCollect: () => {
			total += config.stage.boneCost;
			update(value => (value + config.stage.boneCost));
		},
		canBuy: (cost: number = 0) => get(bones) >= cost,
		buy: () => update(value => (value - reserve)),
		reserve: (cost: number) => (reserve = cost),
		total: () => total,
		reset: () => (total = 0),
	};
})();

export const boilerRushAvailable = writable(true);
