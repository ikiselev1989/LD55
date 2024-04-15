<script lang='ts'>
	import Screen from '@/ui/components/Screen.svelte';
	import ConstructionsMenu from '@/ui/components/ConstructionsMenu.svelte';
	import Bones from '@/ui/components/Bones.svelte';
	import CraftMenu from '@/ui/components/CraftMenu.svelte';
	import { popup } from '@/stores';
	import BoilerRushButton from '@/ui/components/BoilerRushButton.svelte';
	import { onMount } from 'svelte';
	import soundController from '@/sound';

	onMount(() => {
		soundController.play('bg', true);
	});
</script>

<Screen>
	<ConstructionsMenu />
	<Bones />
	<CraftMenu />
	<BoilerRushButton />

	{#key $popup}
		<svelte:component this={$popup} />
	{/key}
</Screen>
