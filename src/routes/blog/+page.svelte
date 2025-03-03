<script>
  import Post from "./Post.svelte";

  let { data } = $props();
  console.log(data);
</script>

<h1>Blog</h1>
<div class="blog-layout">
  <div class="navigator">
    <ul>
      {#each data.months as month}
        <li><button>{month}</button></li>
      {/each}
    </ul>
  </div>
  <div class="display"></div>
</div>

<style>
  h1 {
    font-size: max(3rem, 6vw);
    margin: 2rem 4rem 0;
    text-transform: lowercase;
  }
  h1::before,
  h2::before {
    content: "∎ ";
    color: var(--accent);
  }
  .blog-layout {
    display: grid;
    grid-template-columns: 1fr 6fr;
    height: 100%;
  }
  .navigator {
    border-right: solid 1px var(--accent);
  }
  button {
    text-transform: lowercase;
  }
  li {
    font-family: "new-science", sans-serif;
    list-style: none;
  }
</style>
