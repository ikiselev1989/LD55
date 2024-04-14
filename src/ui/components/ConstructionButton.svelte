<script lang='ts'>
	import Button from '@/ui/components/Button.svelte';
</script>

<Button class='_construction-button' on:click>
	<slot />
</Button>

<style lang='scss'>
  :global(._construction-button) {
    width: rem(70px);
    height: rem(70px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
