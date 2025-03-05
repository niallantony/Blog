<script>
  import Barcode from "$lib/Barcode.svelte";
  import Card from "./Card.svelte";

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
      {@render postCard(post.title, post.date, post.url)}
    {/each}
  </div>
</div>

{#snippet postCard(title, date, url)}
  <Card {title} {date} {url} />
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
    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  }

  @media (max-width: 420px) {
    .display {
      grid-template-columns: 1fr;
    }
  }
</style>
