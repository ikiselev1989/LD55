<script lang='ts'>
	import { screen } from '@/stores';
</script>

{#key $screen}
	<svelte:component this={$screen} />
{/key}
