<script lang='ts'>
	import res from '@/res';
	import Screen from '@/ui/components/Screen.svelte';
	import Sprite from '@/ui/components/Sprite.svelte';
	import { Assets } from '@/game/resources/assets';
	import Button from '@/ui/components/Button.svelte';
	import i18n from '@/i18n/i18n';
	import IntroText from '@/ui/components/IntroText.svelte';

	let started = false;
</script>

<Screen>
	<div class='bg' class:-started={started}>
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
	{#if !started}
		<Button class='_play-button' on:click={()=>(started=true)}>{$i18n.t('startMenu.play')}</Button>
	{/if}
	{#if started}
		<IntroText />
	{/if}
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

  :global(._play-button) {
    width: rem(330px);
    padding: rem(40px) !important;
    position: absolute;
    bottom: rem(220px);
    right: rem(265px);
    font-size: rem(54px);
    color: $black !important;
    transform: rotate(-3deg) translateX(-50%);
    text-transform: uppercase;
  }
</style>
