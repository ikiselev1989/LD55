<script>
	import Button from '@/ui/components/Button.svelte';
</script>

<Button class='craft-button' on:click>
	<slot />
</Button>

<style lang='scss'>
  :global(.craft-button) {
    width: rem(52px);
    height: rem(52px);
    padding: 0 !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
