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
  @media only screen and (min-width: 601px) {
    figure {
      float: left;
      margin: 0 20px 20px 0;
      max-width: 50%;
      shape-outside: inset(0 0 0 0);
    }
    figure + p {
      text-align: justify;
    }
  }
  @media only screen and (max-width: 600px) {
    figure {
      max-width: 100%;
    }
  }
  img {
    width: 100%;
  }
  figcaption {
    font-family: "new-science", sans-serif;
    text-align: center;
  }
</style>
