<script lang='ts'>
	import Button from '@/ui/components/Button.svelte';
	import Sprite from '@/ui/components/Sprite.svelte';
	import res from '@/res';
	import { Assets } from '@/game/resources/assets';
	import CraftMenu from '@/ui/components/CraftMenu.svelte';

	let open = false;
</script>

<div class='craft'>
	<Button class='_craft-button' on:click={()=>open=!open}>
		<Sprite sprite='{res.assets.getFrameSprite(Assets.BONES)}' />
	</Button>
</div>

{#if open}
	<CraftMenu />
{/if}

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
