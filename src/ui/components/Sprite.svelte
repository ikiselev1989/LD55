<script lang='ts'>
	import type { Sprite } from 'excalibur';

	export let sprite: Sprite;

	const makeClipPath = (sprite: Sprite) => {
		const { x, y, width, height } = sprite.sourceView;

		return `polygon(${x / 16}rem ${y / 16}rem, ${(x + width) / 16}rem ${y / 16}rem, ${(x + width) / 16}rem ${(y + height) / 16}rem, ${x / 16}rem ${(y + height) / 16}rem)`;
	};
</script>

<div class='sprite'
		 style:height='{sprite.sourceView.height/16}rem'
		 style:width='{sprite.sourceView.width/16}rem'
>
	<img alt='game-sprite'
			 class='sprite' src='{sprite.image.path}'
			 style:clip-path='{makeClipPath(sprite)}'
			 style:height='{sprite.image.height/16}rem'
			 style:left='-{sprite.sourceView.x/16}rem'
			 style:top='-{sprite.sourceView.y/16}rem'
			 style:width='{sprite.image.width/16}rem'
	>
</div>

<style lang='scss'>
  .sprite {
    display: flex;
    position: relative;

    img {
      position: absolute;
      object-fit: scale-down;
    }
  }
</style>
