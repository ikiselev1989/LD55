<script lang='ts'>
	import { fade } from 'svelte/transition';
	import Sprite from '@/ui/components/Sprite.svelte';
	import res from '@/res';
	import { Assets } from '@/game/resources/assets';
	import Button from '@/ui/components/Button.svelte';
	import i18n from '@/i18n/i18n';
	import { bones, popup } from '@/stores';
	import game from '@/game/game';

	const restart = () => {
		popup.hide();
		game.restore();
		game.play();
	};
</script>

<div class='game-over' transition:fade>
	<div class='content'>
		<div class='bg'>
			<Sprite sprite='{res.assets.getFrameSprite(Assets.GAME_OVER_CARD)}' />
		</div>
		<div class='title'>{$i18n.t('gameOver.title')}</div>
		<div class='cover'>
			<Sprite sprite='{res.assets.getFrameSprite(Assets.GAME_OVER_COVER)}' />
		</div>
		<div class='bone-result'>
			<div class='text'>{$i18n.t('gameOver.result')}</div>
			<div class='bones'>{bones.total()}
				<Sprite sprite='{res.assets.getFrameSprite(Assets.RESULT_BONES)}' />
			</div>
		</div>
		<div class='restart'>
			<Button class='_restart-button' on:click={restart}>&#x276F; {$i18n.t('gameOver.restart')} &#x276E;</Button>
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
      font-size: rem(32px);

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
