<script lang='ts'>
	import Sprite from '@/ui/components/Sprite.svelte';
	import res from '@/res';
	import { Assets } from '@/game/resources/assets';
	import { bones } from '@/stores';
</script>

<div class='bones'>
	<div class='counter'>{$bones}</div>
	<Sprite sprite='{res.assets.getFrameSprite(Assets.BONES)}' />
</div>

<style lang='scss'>
  .bones {
    position: absolute;
    right: rem(40px);
    bottom: rem(40px);
    display: flex;
    align-items: center;
    gap: rem(24px);
  }

  .counter {
    font-size: rem(40px);
  }
</style>
