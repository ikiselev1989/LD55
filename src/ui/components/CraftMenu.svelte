<script lang='ts'>
	import { fade } from 'svelte/transition';
	import CraftButton from '@/ui/components/ConstructionButton.svelte';
	import game from '@/game/game';
	import Stage from '@/game/scenes/Stage';
	import Sprite from '@/ui/components/Sprite.svelte';
	import res from '@/res';
	import { Assets } from '@/game/resources/assets';
	import { bones, constructionsBuilt } from '@/stores';
	import config from '@/config';

	const placeCircular = () => constructionsBuilt.available() && bones.canBuy(config.objects.saw.cost) && (<Stage>game.currentScene).placeCircular();
	const placeHellishHugs = () => constructionsBuilt.available() && bones.canBuy(config.objects.hands.cost) && (<Stage>game.currentScene).placeHellishHugs();
	const placeFireballs = () => constructionsBuilt.available() && bones.canBuy(config.objects.fireBall.cost) && (<Stage>game.currentScene).placeFireballs();
	const placeManaCandles = () => bones.canBuy(config.objects.candles.cost) && (<Stage>game.currentScene).placeManaCandles();
	const placeTombstone = () => constructionsBuilt.available() && bones.canBuy(config.objects.tombstones.cost) && (<Stage>game.currentScene).placeTombstone();
</script>

<div class='craft-menu' transition:fade={{duration: 150}}>
	<CraftButton cost='{config.objects.hands.cost}' on:click={placeHellishHugs}>
		<Sprite sprite='{res.assets.getFrameSprite(Assets.CRAFT_BUTTONS__HANDS)}' />
	</CraftButton>
	<CraftButton cost='{config.objects.saw.cost}' on:click={placeCircular}>
		<Sprite sprite='{res.assets.getFrameSprite(Assets.CRAFT_BUTTONS__CIRCULAR)}' />
	</CraftButton>
	<CraftButton cost='{config.objects.fireBall.cost}' on:click={placeFireballs}>
		<Sprite sprite='{res.assets.getFrameSprite(Assets.CRAFT_BUTTONS__FIRE)}' />
	</CraftButton>
	<CraftButton cost='{config.objects.tombstones.cost}' on:click={placeTombstone}>
		<Sprite sprite='{res.assets.getFrameSprite(Assets.CRAFT_BUTTONS__THOMBSTONE)}' />
	</CraftButton>
	<CraftButton cost='{config.objects.candles.cost}' on:click={placeManaCandles}>
		<Sprite sprite='{res.assets.getFrameSprite(Assets.CRAFT_BUTTONS__CANDLES)}' />
	</CraftButton>
</div>

<style lang='scss'>
  .craft-menu {
    position: absolute;
    bottom: rem(160px);
    right: rem(40px);
    display: flex;
    gap: rem(25px);
    transition: filter 0.15s ease;
  }
</style>
