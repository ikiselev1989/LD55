<script lang='ts'>
	import { fade } from 'svelte/transition';

	let className = '';

	export { className as class };
</script>

<section class='screen {className}' transition:fade>
	<slot />
</section>

<style>
    .screen {
        max-height: 100%;
        margin: auto;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        aspect-ratio: 16 / 9;
        pointer-events: none;
        user-select: none;
        overflow: hidden;
    }
</style>
