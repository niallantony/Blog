<script>
  import Barcode from "$lib/Barcode.svelte";
  import Card from "./Card.svelte";
  import Month from "./Month.svelte";
  import Post from "./Post.svelte";
  import PostList from "./PostList.svelte";

  let { data } = $props();
  let active = $state([]);

  console.log(data.titles);
  function closePost(index) {
    if (active.includes(index)) {
      const arrayIndex = active.indexOf(index);
      active.splice(arrayIndex, 1);
    } else {
      active.push(index);
    }
  }
</script>

<h1>Blog</h1>
<div class="blog-layout">
  <div class="display">
    {#each data.titles as post}
      {@render postCard(post.title, post.added)}
    {/each}
  </div>
</div>

{#snippet postCard(title, added)}
  <Card {title} {added} />
{/snippet}

<style>
  h1 {
    font-size: max(3rem, 6vw);
    margin: 2rem 4rem 0;
    text-transform: lowercase;
  }
  h1::before {
    content: "∎ ";
    color: var(--accent);
  }
  .display {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
</style>
