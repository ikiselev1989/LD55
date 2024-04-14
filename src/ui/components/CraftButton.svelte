<script lang='ts'>
	import Sprite from '@/ui/components/Sprite.svelte';
	import res from '@/res';
	import { Assets } from '@/game/resources/assets';
</script>

<div class='craft'>
	<Sprite sprite='{res.assets.getFrameSprite(Assets.BONES)}' />
</div>

<style lang='scss'>
  .craft {
    position: absolute;
    right: rem(40px);
    bottom: rem(40px);
  }

  ._craft-button {
    width: rem(84px);
    height: rem(84px);
  }
</style>
