<script lang='ts'>
	import { constructionsBuilt, constructionsPlaceAvailable } from '@/stores';
	import Button from '@/ui/components/Button.svelte';
	import Sprite from '@/ui/components/Sprite.svelte';
	import res from '@/res';
	import { Assets } from '@/game/resources/assets';

	const cardsMapping = [
		[Assets.CARDS__EMPTY__1, Assets.CARDS__FILLED__1],
		[Assets.CARDS__EMPTY__2, Assets.CARDS__FILLED__2],
		[Assets.CARDS__EMPTY__3, Assets.CARDS__FILLED__3],
	];
</script>

<div class='constructions-menu'>
	{#key $constructionsBuilt}
		{#each new Array($constructionsPlaceAvailable) as item, index}
			{@const mapIndex = (index < $constructionsBuilt) ? 1 : 0}
			<Button class='_construction-card'>
				<Sprite sprite='{res.assets.getFrameSprite(cardsMapping[index%3][mapIndex])}' />
			</Button>
		{/each}
	{/key}
</div>

<style lang='scss'>
  .constructions-menu {
    padding: rem(40px);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    gap: rem(40px);
  }


  :global(._construction-card) {
    width: rem(76px);
    height: rem(127px);
  }
</style>

