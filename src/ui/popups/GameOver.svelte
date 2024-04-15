<script lang='ts'>
	import { fade } from 'svelte/transition';
	import Sprite from '@/ui/components/Sprite.svelte';
	import res from '@/res';
	import { Assets } from '@/game/resources/assets';
	import Button from '@/ui/components/Button.svelte';
</script>

<div class='game-over' transition:fade>
	<div class='content'>
		<div class='bg'>
			<Sprite sprite='{res.assets.getFrameSprite(Assets.GAME_OVER_CARD)}' />
		</div>
		<div class='title'>Помер</div>
		<div class='cover'>
			<Sprite sprite='{res.assets.getFrameSprite(Assets.GAME_OVER_COVER)}' />
		</div>
		<div class='bone-result'>
			<div class='text'>Ваш результат</div>
			<div class='bones'>1230
				<Sprite sprite='{res.assets.getFrameSprite(Assets.RESULT_BONES)}' />
			</div>
		</div>
		<div class='time-result'>
			<div class='text'>Ваше время</div>
			<div class='time'>1м 20с</div>
		</div>
		<div class='restart'>
			<Button class='_restart-button'>&#x276F; Рестарт &#x276E;</Button>
		</div>
	</div>
</div>

<style lang='scss'>
  .game-over {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba($black, 0.5);
    pointer-events: auto;
  }

  .content {
    margin: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .bg {
      position: absolute;
    }

    .title {
      margin-bottom: rem(29px);
      position: relative;
      font-size: rem(64px);
      color: $black;
      text-transform: uppercase;
    }

    .bone-result {
      margin-top: rem(82px);
      position: relative;
      font-size: rem(24px);

      .text {
        color: $black;
        text-transform: uppercase;
      }

      .bones {
        margin-top: rem(21px);
        display: flex;
        justify-content: center;
        gap: rem(10px);
        font-size: rem(40px);
      }
    }

    .time-result {
      margin-top: rem(49px);
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: rem(30px);
      font-size: rem(20px);

      .text {
        color: $black;
        text-transform: uppercase;
      }
    }

    .restart {
      margin-top: rem(91px);
      position: relative;

      :global(._restart-button) {
        font-size: rem(48px);
        text-transform: uppercase;
      }
    }
  }
</style>
