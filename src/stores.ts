import { get, writable } from 'svelte/store';
import { SvelteComponent } from 'svelte';
import StartMenu from '@/ui/screens/StartMenu.svelte';

export const screen = (() => {
	const { subscribe, set } = writable<typeof SvelteComponent>();

	return {
		subscribe,
		startMenu: () => set(StartMenu),
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
