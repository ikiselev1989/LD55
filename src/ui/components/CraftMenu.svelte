<script lang='ts'>

	import CraftButton from '@/ui/components/CraftButton.svelte';
	import game from '@/game/game';
	import Stage from '@/game/scenes/Stage';
	import Sprite from '@/ui/components/Sprite.svelte';
	import res from '@/res';
	import { Assets } from '@/game/resources/assets';

	const placeCircular = () => (<Stage>game.currentScene).placeCircular();
	const placeHellishHugs = () => (<Stage>game.currentScene).placeHellishHugs();
	const placeFireballs = () => (<Stage>game.currentScene).placeFireballs();
	const placeManaCandles = () => (<Stage>game.currentScene).placeManaCandles();
	const placeTombstone = () => (<Stage>game.currentScene).placeTombstone();
</script>

<div class='craft-menu'>
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
    padding: rem(40px);
    display: flex;
    gap: rem(30px);
  }
</style>
