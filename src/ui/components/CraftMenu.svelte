<script lang='ts'>

	import CraftButton from '@/ui/components/CraftButton.svelte';
	import game from '@/game/game';
	import Stage from '@/game/scenes/Stage';

	const placeRectangle = () => (<Stage>game.currentScene).placeCircular();
	const placeHellishHugs = () => (<Stage>game.currentScene).placeHellishHugs();
	const placeManaCandles = () => (<Stage>game.currentScene).placeManaCandles();
	const placeTombstone = () => (<Stage>game.currentScene).placeTombstone();
</script>

<div class='craft-menu'>
	<CraftButton on:click={placeRectangle}>&#9632;</CraftButton>
	<CraftButton on:click={placeHellishHugs}>&#9679;</CraftButton>
	<CraftButton on:click={placeManaCandles}>&#9650;</CraftButton>
	<CraftButton on:click={placeTombstone}>&#9670;</CraftButton>
</div>

<style lang='scss'>
  .craft-menu {
    display: flex;
  }
</style>
