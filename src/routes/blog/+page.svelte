<script>
  import Post from "./Post.svelte";

  let { data } = $props();
</script>

<h1>Blog</h1>
<div class="blog-layout">
  <div class="navigator">
    <ul>
      {#each data.months as month}
        <li>{month}</li>
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
    display: flex;
  }
  li {
    font-family: "new-science", sans-serif;
    text-transform: lowercase;
    list-style: none;
  }
</style>
