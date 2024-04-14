import { get, writable } from 'svelte/store';
import { SvelteComponent } from 'svelte';
import StartMenu from '@/ui/screens/StartMenu.svelte';
import Game from '@/ui/screens/Game.svelte';

export const screen = (() => {
	const { subscribe, set } = writable<typeof SvelteComponent>();

	return {
		subscribe,
		startMenu: () => set(StartMenu),
		game: () => set(Game),
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
	const { subscribe, update } = writable(0);

	return {
		subscribe,
		build: () => update(value => (value + 1)),
		available: () => get(constructionsBuilt) < get(constructionsPlaceAvailable),
	};
})();

export const constructionsPlaceAvailable = (() => {
	const { subscribe } = writable(3);

	return {
		subscribe,
	};
})();
