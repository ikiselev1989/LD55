<script lang='ts'>
	import Screen from '@/ui/components/Screen.svelte';
	import ConstructionsMenu from '@/ui/components/ConstructionsMenu.svelte';
	import Bones from '@/ui/components/Bones.svelte';
	import CraftMenu from '@/ui/components/CraftMenu.svelte';
	import { popup } from '@/stores';
</script>

<Screen>
	<ConstructionsMenu />
	<Bones />
	<CraftMenu />

	{#key $popup}
		<svelte:component this={$popup} />
	{/key}
</Screen>
