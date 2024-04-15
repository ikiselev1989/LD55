<script lang='ts'>
	import { fly } from 'svelte/transition';
	import i18n from '@/i18n/i18n';
	import { get } from 'svelte/store';
	import { screen } from '@/stores';

	let i = -1;
	let text = get(i18n).t(`intro.${i}`);
	let playing = false;

	function next() {
		if (playing) return;
		if (i === 3) {
			playing = true;
			return screen.game();
		}

		text = get(i18n).t(`intro.${++i}`);
	}
</script>

<div class='intro-text' transition:fly={{delay: 1000}}>
	{text}
</div>

<svelte:window on:click={next} />

<style lang='scss'>
  .intro-text {
    width: 50%;
    height: rem(100px);
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    bottom: rem(25px);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: rem(28px);
    line-height: 1.5;
  }
</style>
