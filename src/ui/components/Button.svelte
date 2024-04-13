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

    padding: 15px 20px;
    box-sizing: border-box;
    pointer-events: auto;
  }
</style>
