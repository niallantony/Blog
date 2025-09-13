<script>
  let { source, alt, children } = $props();
</script>

<figure>
  <img src={source} {alt} />
  <figcaption>
    {@render children?.()}
  </figcaption>
</figure>

<style>
  img {
    max-width: 100%;
  }
  figcaption {
    font-family: "new-science", sans-serif;
    text-align: center;
  }
</style>
