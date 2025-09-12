<script>
  export let metadata;
</script>

<article class="post">
  <header>
    <h1>{metadata.title}</h1>
    <p class="date">{metadata.date}</p>
    {#if metadata.tags?.length}
      <ul class="tags">
        {#each metadata.tags as tag}
          <li>{tag}</li>
        {/each}
      </ul>
    {/if}
  </header>
  <section class="content">
    <slot />
  </section>
</article>

<style>
  h1 {
    font-size: max(3rem, 2vw);
    margin: 2rem 2rem 0;
    padding-bottom: 1rem;
    border-bottom: solid 1px var(--accent);
    position: relative;
  }
  .date {
    background-color: var(--dark);
    width: fit-content;
    color: var(--mid1);
    margin: -1rem 2rem 0;
    align-self: flex-end;
    position: relative;
  }
  h1::before {
    content: "∎ ";
    color: var(--accent);
    position: absolute;
    left: -2rem;
    bottom: 1rem;
  }
  .post {
    max-width: 1024px;
    padding: 0 1rem;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-content: start;
  }
  :global(.post > p) {
    margin: 1rem 2rem;
  }
  :global(a) {
    color: var(--mid1);
    text-decoration: none;
  }
</style>
