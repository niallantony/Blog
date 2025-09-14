<script>
  let { source, alt, children, size } = $props();
</script>

<figure>
  <img src={source} {alt} class={size ? size : `medium`} />
  <figcaption>
    {@render children?.()}
  </figcaption>
</figure>

<style>
  figcaption {
    font-family: "new-science", sans-serif;
    text-align: center;
  }
  figure {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    border-radius: 4px;
  }

  @media only screen and (min-width: 601px) {
    .large {
      max-width: 100%;
    }
    .medium {
      max-width: 60%;
    }
    .small {
      max-width: 40%;
    }
  }
</style>
