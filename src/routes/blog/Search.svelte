<script>
  import Icon from "@iconify/svelte";
  import { slide } from "svelte/transition";
  let { onsubmit } = $props();
  let value = "";

  function submit() {
    onsubmit(value);
  }
  function keypress(code) {
    if (code.key === "Enter") {
      submit();
    }
  }
</script>

<input
  bind:value
  onkeydown={keypress}
  in:slide={{ duration: 900, axis: "x" }}
  type="search"
/>
<button onclick={submit} aria-label="search">
  <Icon
    icon="material-symbols:search"
    style="font-size: 2rem;  margin: .5rem;"
  />
</button>

<style>
  input {
    background-color: var(--dark);
    border: solid 1px var(--accent);
    font-family: monospace;
    padding: 0.5rem 1rem;
    color: var(--accent);
    width: 100%;
  }
  input:focus {
    outline: none;
    border: solid 1px var(--light);
  }
</style>
