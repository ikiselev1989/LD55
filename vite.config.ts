import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import glsl from 'vite-plugin-glsl';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte(), glsl()],
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
				@import '@/ui/style/variables.scss';
				@import '@/ui/style/functions.scss';
				@import '@/ui/style/mixins.scss';
				`,
			},
		},
	},
});
