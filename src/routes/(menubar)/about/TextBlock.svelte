<script>
  import { text } from "@sveltejs/kit";
  import { innerWidth } from "svelte/reactivity/window";

  let { textContent } = $props();
  function randomRem() {
    return innerWidth.current < 960 ? 0 : Math.floor(Math.random() * 7);
  }
  const randomMargin = randomRem();
</script>

<div style:transform={`translateX(${randomMargin}rem)`} class="block">
  <h2>{Object.keys(textContent)[0]}</h2>
  <p>{Object.values(textContent)[0]}</p>
</div>

<style>
  h2::before {
    content: "∎ ";
    color: var(--accent);
  }
  .block {
    margin: 1rem;
  }
  .block > h2::after {
    content: " \{";
    color: var(--accent);
  }
  .block::after {
    font-family: "new-science";
    content: "\}";
    color: var(--accent);
    margin-left: 2rem;
    font-size: x-large;
    font-weight: 300;
  }
  .block > h2 {
    margin: 0 1rem;
    text-transform: lowercase;
  }
  .block > p {
    text-align: justify;
    padding-left: 2rem;
    margin-left: 2rem;
    text-indent: -1rem;
    border-left: solid 1px var(--accent);
  }
</style>
