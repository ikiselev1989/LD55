<script>
	import Button from '@/ui/components/Button.svelte';
</script>

<Button class='craft-button' on:click>
	<slot />
</Button>

<style lang='scss'>
  :global(.craft-button) {
    width: 50px;
    height: 50px;
    font-size: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $green-b !important;
  }
</style>
