<script>
  import Barcode from "$lib/Barcode.svelte";
  import Card from "./Card.svelte";
  import Filter from "./Filter.svelte";
  import Sort from "./Sort.svelte";

  let { data } = $props();

  const posts = data.posts;
  let filters = $state([]);
  let sortOptions = $state("newest");

  let filtered = $derived.by(() => {
    if (filters.length === 0) {
      return posts;
    }
    const filtered = data.posts.filter((post) => {
      return filters.every((term) => {
        const t = term.toLowerCase();
        const titleMatch = post.metadata.title.toLowerCase().includes(t);
        const tagsMatch = post.metadata.tags?.some((tag) =>
          tag.toLowerCase().includes(t),
        );
        return titleMatch || tagsMatch;
      });
    });
    if (sortOptions === "oldest") {
      filtered.reverse();
    }
    return filtered;
  });

  function changeFilters(searches) {
    filters = searches;
  }

  function changeSort(sort) {
    sortOptions = sort;
  }
</script>

<h1>Blog</h1>
<Filter onchange={changeFilters} onSort={changeSort} tags={data.tags} />
<div class="blog-layout">
  <div class="display">
    {#each filtered as post}
      {@render postCard(
        post.metadata.title,
        post.metadata.date,
        post.slug,
        post.cover,
      )}
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
