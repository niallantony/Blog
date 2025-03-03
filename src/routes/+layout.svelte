<script>
  let { children } = $props();
</script>

<div class="body">
  <nav>
    <a href="/">home</a>
    <a href="/about">about</a>
    <a href="/portfolio">portfolio</a>
    <a href="/blog">blog</a>
  </nav>
  <div class="content">
    {@render children()}
  </div>
  <footer><a href="https://www.github.com/niallantony">github</a></footer>
</div>

<style>
  :root {
    --light: #fffcf2;
    --mid1: #ccc5b9;
    --mid2: #403d39;
    --accent: #eb5e28;
    --dark: #252422;
  }
  .body {
    display: flex;
    flex-direction: column;
    height: 100svh;
    background-color: var(--dark);
  }
  .content {
    flex: 1;
    overflow: scroll;
    display: flex;
    flex-direction: column;
  }
  :global(h1, h2) {
    font-family: "new-science", sans-serif;
    font-weight: 300;
    font-style: normal;
    color: var(--light);
  }
  :global(p, a) {
    color: var(--light);
    font-family: "new-science", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  nav,
  footer {
    justify-self: start;
    display: flex;
    justify-content: space-evenly;
    background-color: var(--dark);
    padding: 1rem 0;
    margin: 0;
  }

  nav {
    border-bottom: 1px solid var(--accent);
  }

  nav > a,
  footer > a {
    color: var(--accent);
    text-decoration: none;
  }

  nav > a:hover,
  footer > a:hover {
    filter: brightness(400%);
  }

  footer {
    justify-self: end;
  }
</style>
