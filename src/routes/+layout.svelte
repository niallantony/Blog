<script>
  let { children } = $props();
  let lightMode = $state(true);
  function changeMode() {
    console.log("Yes");
    lightMode = lightMode ? false : true;
  }
</script>

<div class={lightMode ? "body light" : "body dark"}>
  <nav>
    <a href="/">home</a>
    <a href="/about">about</a>
    <a href="/portfolio">portfolio</a>
    <a href="/blog">blog</a>
  </nav>
  <div class="content">
    {@render children()}
  </div>
  <footer>
    <a href="https://www.github.com/niallantony">github</a>
    <button class="mode" onclick={changeMode}
      >{lightMode ? "dark mode" : "light mode"}</button
    >
  </footer>
</div>

<style>
  :global(button) {
    background-color: var(--dark);
    color: var(--accent);
    border: 0;
    justify-self: flex-end;
    font-family: "new-science", sans-serif;
  }
  :global(button:hover) {
    color: var(--hover);
  }
  .dark {
    --light: #fffcf2;
    --mid1: #ccc5b9;
    --mid2: #403d39;
    --accent: #eb5e28;
    --dark: #252422;
    --hover: #fffcf2;
  }
  .light {
    --hover: #252422;
    --dark: #fffcf2;
    --mid1: #ccc5b9;
    --mid2: #403d39;
    --accent: #eb5e28;
    --light: #252422;
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
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .content::-webkit-scrollbar {
    display: none;
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
    background-color: var(--dark);
    padding: 1rem 0;
    margin: 0;
  }
  footer {
    justify-content: space-between;
    padding: 1rem;
  }

  nav {
    justify-content: space-evenly;
    border-bottom: 1px solid var(--accent);
  }

  nav > a,
  footer > a {
    color: var(--accent);
    text-decoration: none;
  }

  nav > a:hover,
  footer > a:hover {
    color: var(--hover);
  }

  footer {
    justify-self: end;
  }
</style>
