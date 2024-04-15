<script lang='ts'>
	import res from '@/res';
	import Screen from '@/ui/components/Screen.svelte';
	import Sprite from '@/ui/components/Sprite.svelte';
	import { Assets } from '@/game/resources/assets';

	let started = false;
</script>

<Screen>
	<div class='bg' class:-started={started} on:click={()=>{started=true}}>
		<Sprite sprite='{res.assets.getFrameSprite(Assets.MAIN__BG)}' />
	</div>
	<div class='car' class:-started={started}>
		<Sprite sprite='{res.assets.getFrameSprite(Assets.MAIN__CAR)}' />
	</div>
	<div class='grass' class:-started={started}>
		<Sprite sprite='{res.assets.getFrameSprite(Assets.MAIN__GREEN)}' />
	</div>
	<div class='fence' class:-started={started}>
		<Sprite sprite='{res.assets.getFrameSprite(Assets.MAIN__FENCE)}' />
	</div>
	<div class='field -top' class:-started={started}></div>
	<div class='field -bottom' class:-started={started}></div>
	<!--	<StartMenu />-->
</Screen>

<style lang='scss'>
  .bg, .car, .fence, .grass, .field {
    position: absolute;
    display: flex;
    transition: transform 1000ms;
    pointer-events: auto;
  }

  .field {
    width: 100%;
    height: rem(150px);
    background: $black;

    &.-top {
      top: 0;
      transform: translateY(-100%);

      &.-started {
        transform: translateY(0);
      }
    }

    &.-bottom {
      bottom: 0;
      transform: translateY(100%);

      &.-started {
        transform: translateY(0);
      }
    }
  }

  .bg {
    &.-started {
      transform: translateX(#{rem(-200px)}) scale(1.2);
    }
  }

  .car {
    bottom: rem(-20px);

    &.-started {
      transform: translateX(#{rem(-300px)}) scale(1.2);
    }
  }

  .grass {
    left: rem(100px);
    bottom: 0;

    &.-started {
      transform: translateX(#{rem(-500px)}) scale(1.2);
    }
  }

  .fence {
    right: 0;
    bottom: rem(-20px);

    &.-started {
      transform: translateX(#{rem(500px)}) scale(1.2);
    }
  }
</style>
