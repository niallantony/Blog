<script>
  let { children } = $props();
</script>

<div class="body">
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/portfolio">Portfolio</a>
    <a href="/blog">Blog</a>
  </nav>
  <div class="content">
    {@render children()}
  </div>
  <footer><a href="https://www.github.com/niallantony">github</a></footer>
</div>

<style>
  .body {
    display: flex;
    flex-direction: column;
    height: 100svh;
  }
  .content {
    flex: 1;
  }
  nav {
    justify-self: start;
  }
  footer {
    justify-self: end;
  }
</style>
