<script lang='ts'>
	import Sprite from '@/ui/components/Sprite.svelte';
	import res from '@/res';
	import { Assets } from '@/game/resources/assets';
	import Button from '@/ui/components/Button.svelte';
	import game from '@/game/game';
	import type Stage from '@/game/scenes/Stage';
	import config from '@/config';
	import { boilerRushAvailable, bones } from '@/stores';

	const aim = () => {
		const canBuy = bones.canBuy(config.objects.boiler.cost);
		$boilerRushAvailable && canBuy && (<Stage>game.currentScene).boilerRushAim();
	};
</script>

<div class='boiler-rush'>
	<div class='cost'>
		{config.objects.boiler.cost}
		<Sprite sprite='{res.assets.getFrameSprite(Assets.BONES_COST)}' />
	</div>
	<div style:filter='grayscale({$boilerRushAvailable ? 0 : 1})'>
		<Button class='_boiler-rush-button' on:click={()=>aim()}>
			<Sprite sprite='{res.assets.getFrameSprite(Assets.CARDS__FILLED__3)}' />
			<div class='img'>
				<Sprite sprite='{res.assets.getFrameSprite(Assets.CARDS__CONSTRUCTIONS__BOILER)}' />
			</div>
		</Button>
	</div>
</div>

<style lang='scss'>
  .boiler-rush {
    position: absolute;
    top: 50%;
    right: rem(40px);
  }

  :global(._boiler-rush-button) {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cost {
    position: absolute;
    top: rem(-10px);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: rem(10px);
    font-size: rem(24px);
    transform: translateY(-100%);;
  }

  .img {
    position: absolute;
  }
</style>
