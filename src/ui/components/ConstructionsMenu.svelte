<script lang='ts'>
	import { fade } from 'svelte/transition';
	import { constructionsBuilt, constructionsPlaceAvailable } from '@/stores';
	import Button from '@/ui/components/Button.svelte';
	import Sprite from '@/ui/components/Sprite.svelte';
	import res from '@/res';
	import { Assets } from '@/game/resources/assets';
	import game from '@/game/game';
	import type Stage from '@/game/scenes/Stage';

	const cardsMapping = [
		[Assets.CARDS__EMPTY__1, Assets.CARDS__FILLED__1],
		[Assets.CARDS__EMPTY__2, Assets.CARDS__FILLED__2],
		[Assets.CARDS__EMPTY__3, Assets.CARDS__FILLED__3],
	];

	const destroy = (id: number) => (<Stage>game.currentScene).destroy(id);
</script>

<div class='constructions-menu'>
	{#key $constructionsBuilt}
		{#each new Array($constructionsPlaceAvailable) as item, index}
			{@const filled = (index < $constructionsBuilt.length)}

			{#if filled}
				<div class='button' transition:fade={{duration: 150}}
						 on:contextmenu={()=>destroy($constructionsBuilt[index].id)}
						 style='filter: grayscale({1 - $constructionsBuilt[index].strength})'>
					<Button class='_construction-card'>
						<Sprite sprite='{res.assets.getFrameSprite(cardsMapping[index%3][1])}' />
						<div class='icon'>
							<Sprite sprite='{res.assets.getFrameSprite($constructionsBuilt[index].iconAsset)}' />
						</div>
					</Button>
				</div>
			{:else}
				<div class='button' transition:fade={{duration: 150}}>
					<Button class='_construction-card'>
						<Sprite sprite='{res.assets.getFrameSprite(cardsMapping[index%3][0])}' />
					</Button>
				</div>
			{/if}
		{/each}
	{/key}
</div>

<style lang='scss'>
  .constructions-menu {
    position: absolute;
    left: 0;
    right: 0;
    bottom: rem(20px);
    display: flex;
    justify-content: center;
    gap: rem(30px);
  }

  .icon {
    position: absolute;
  }

  :global(._construction-card) {
    width: rem(76px);
    height: rem(127px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

