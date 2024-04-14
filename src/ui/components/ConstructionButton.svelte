<script lang='ts'>
	import Button from '@/ui/components/Button.svelte';
	import Sprite from '@/ui/components/Sprite.svelte';
	import res from '@/res';
	import { Assets } from '@/game/resources/assets';

	export let cost = 0;
</script>

<Button class='_construction-button' on:click>
	<div class='cost'>
		{cost}
		<Sprite sprite='{res.assets.getFrameSprite(Assets.BONES_COST)}' />
	</div>
	<slot />
</Button>

<style lang='scss'>
  :global(._construction-button) {
    width: rem(70px);
    height: rem(70px);
    display: flex;
    justify-content: center;
    align-items: center;

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
  }
</style>
