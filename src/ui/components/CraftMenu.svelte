<script lang='ts'>
	import { fade } from 'svelte/transition';
	import CraftButton from '@/ui/components/ConstructionButton.svelte';
	import game from '@/game/game';
	import Stage from '@/game/scenes/Stage';
	import Sprite from '@/ui/components/Sprite.svelte';
	import res from '@/res';
	import { Assets } from '@/game/resources/assets';
	import { constructionsBuilt } from '@/stores';
	import { onDestroy, onMount } from 'svelte';

	const placeCircular = () => constructionsBuilt.available() && (<Stage>game.currentScene).placeCircular();
	const placeHellishHugs = () => constructionsBuilt.available() && (<Stage>game.currentScene).placeHellishHugs();
	const placeFireballs = () => constructionsBuilt.available() && (<Stage>game.currentScene).placeFireballs();
	const placeManaCandles = () => constructionsBuilt.available() && (<Stage>game.currentScene).placeManaCandles();
	const placeTombstone = () => constructionsBuilt.available() && (<Stage>game.currentScene).placeTombstone();

	let unSubscriber;
	let available = true;

	onMount(() => {
		unSubscriber = constructionsBuilt.subscribe(() => (available = constructionsBuilt.available()));
	});

	onDestroy(() => {
		unSubscriber && unSubscriber();
	});
</script>

<div class='craft-menu' class:-available={available} transition:fade={{duration: 150}}>
	<CraftButton on:click={placeCircular}>
		<Sprite sprite='{res.assets.getFrameSprite(Assets.CRAFT_BUTTONS__CIRCULAR)}' />
	</CraftButton>
	<CraftButton on:click={placeHellishHugs}>
		<Sprite sprite='{res.assets.getFrameSprite(Assets.CRAFT_BUTTONS__HANDS)}' />
	</CraftButton>
	<CraftButton on:click={placeManaCandles}>
		<Sprite sprite='{res.assets.getFrameSprite(Assets.CRAFT_BUTTONS__CANDLES)}' />
	</CraftButton>
	<CraftButton on:click={placeFireballs}>
		<Sprite sprite='{res.assets.getFrameSprite(Assets.CRAFT_BUTTONS__FIRE)}' />
	</CraftButton>
	<CraftButton on:click={placeTombstone}>
		<Sprite sprite='{res.assets.getFrameSprite(Assets.CRAFT_BUTTONS__THOMBSTONE)}' />
	</CraftButton>
</div>

<style lang='scss'>
  .craft-menu {
    position: absolute;
    bottom: rem(160px);
    right: rem(40px);
    display: flex;
    gap: rem(25px);
    filter: brightness(0.5);
    transition: filter 0.15s ease;

    &.-available {
      filter: brightness(1);
    }
  }
</style>
