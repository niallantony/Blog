<script>
  import { goto } from "$app/navigation";
  import Barcode from "$lib/Barcode.svelte";
  import Card from "./Card.svelte";
  import Filter from "./Filter.svelte";
  import Sort from "./Sort.svelte";

  let { data } = $props();

  let filters = $state([]);

  function changeFilters(string) {
    goto(`?${string}`);
  }
</script>

<h1>Blog</h1>
<Filter onchange={changeFilters} tags={data.topTags} />
<div class="blog-layout">
  <div class="display">
    {#each data.titles as post}
      {@render postCard(post.title, post.date, post.url, post.image)}
    {/each}
  </div>
</div>

{#snippet postCard(title, date, url, image)}
  <Card {title} {date} {url} {image} />
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
