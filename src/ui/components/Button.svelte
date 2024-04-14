<script>
	let className = '';

	export { className as class };
</script>

<button class='{className}' on:click>
	<slot />
</button>

<style lang='scss'>
  button {
    @include reset-button;
    box-sizing: border-box;
    pointer-events: auto;
  }
</style>
