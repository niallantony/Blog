<script>
  import Icon from "@iconify/svelte";
  import Search from "./Search.svelte";
  let { tags, onchange } = $props();

  let selected = $state([]);
  let searchVisible = $state(false);
  let searchValue = $state();

  let deselected = $derived.by(() => {
    const notSelected = [];
    if (!tags) {
      return [];
    }
    tags.forEach((tag) => {
      if (!selected.includes(tag)) {
        notSelected.push(tag);
      }
    });
    return notSelected;
  });

  function selectTag(tag) {
    selected.push(tag);
    onchange(selected);
  }
  function deselectTag(tag) {
    selected.splice(selected.indexOf(tag), 1);
    onchange(selected);
  }
  function toggleSearch() {
    searchVisible = searchVisible ? false : true;
  }
  function searchSubmit(value) {
    if (value.length > 0) {
      selectTag(value);
    }
    toggleSearch();
  }
</script>

<div class="filter-bar">
  {#if searchVisible}
    <Search onsubmit={searchSubmit} />
  {:else}
    <button onclick={toggleSearch} aria-label="search">
      <Icon
        icon="material-symbols:search"
        style="font-size: 2rem;  margin: .5rem;"
      />
    </button>
    <div class="filters">
      {#each deselected as tag}
        <button class="tag" onclick={() => selectTag(tag)}>{tag}</button>
      {/each}
    </div>
  {/if}
</div>

<div class="selected-bar">
  {#each selected as tag}
    <button class="tag selected" onclick={() => deselectTag(tag)}
      ><Icon icon="material-symbols:close" /><span> {tag}</span></button
    >
  {/each}
</div>

<style>
  :global(svg:hover) {
    color: var(--light);
  }
  .filter-bar {
    margin: 1rem;
    display: flex;
  }
  .filters {
    max-width: 100%;
    display: flex;
    overflow-y: scroll;
  }
  .filters::-webkit-scrollbar {
    display: none;
  }
  .filters {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  :global(svg) {
    align-self: center;
    margin-right: 0.5rem;
  }
  .selected > span {
    align-self: center;
  }
  .tag.selected {
    background-color: var(--accent);
    color: var(--dark);
    display: flex;
  }
  .selected-bar {
    display: flex;
  }
  .tag {
    font-family: monospace;
    padding: 0.5rem 1rem;
    border-bottom: solid 1px var(--accent);
    margin: 0 1rem;
    height: 3rem;
  }
</style>
