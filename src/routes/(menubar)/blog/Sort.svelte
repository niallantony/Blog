<script>
  import { slide } from "svelte/transition";
  let { changeSort } = $props();
</script>

<div in:slide={{ duration: 500 }} out:slide class="options">
  Sort by:
  <button onclick={() => changeSort("oldest")}>oldest</button>
  <button onclick={() => changeSort("newest")}>newest</button>
  <button onclick={() => changeSort("most viewed")}>most viewed</button>
</div>

<style>
  .options {
    display: flex;
    padding: 0 2rem;
    align-content: center;
    flex-wrap: nowrap;
    font-family: monospace;
    margin-bottom: 1rem;
  }
  button {
    font-family: monospace;
  }
</style>
