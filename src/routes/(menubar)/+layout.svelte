<script>
  import { base } from "$app/paths";
  let { children } = $props();
  let lightMode = $state(true);
  function changeMode() {
    lightMode = lightMode ? false : true;
  }
</script>

<div class={lightMode ? "body light" : "body dark"}>
  <nav>
    <a href={`${base}/`}>home</a>
    <a href={`${base}/portfolio`}>portfolio</a>
    <a href={`${base}/blog`}>blog</a>
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
    --mid1: #7a9cc6;
    --mid2: #403d39;
    --accent: #eb5e28;
    --light-accent: #403d39;
    --dark: #252422;
    --hover: #fffcf2;
  }
  .light {
    --hover: #252422;
    --light-accent: #fff2e0;
    --dark: #fffcf2;
    --mid1: #7a9cc6;
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
  :global(li) {
    color: var(--light);
    font-family: "new-science", sans-serif;
  }
  :global(h2::before) {
    content: "_ ";
    color: var(--accent);
    margin-left: 2rem;
  }
  :global(h2::after) {
    content: ":";
    color: var(--accent);
    margin-left: 5px;
  }
  :global(h3::before) {
    content: ". ";
    color: var(--accent);
    margin-left: 3rem;
  }

  :global(blockquote) {
    margin: 1rem 2rem;
    background-color: var(--light-accent);
    padding: 0 1rem;
    border-left: solid 5px var(--accent);
  }
  :global(ul) {
    list-style-type: none;
  }
  :global(ul > li::before) {
    content: "- ";
    color: var(--accent);
    list-style-type: none;
  }
  :global(ul, ol) {
    margin-left: 2rem;
    margin-right: 2rem;
  }
  :global(strong) {
    color: var(--accent);
  }
  :global(ol > li::marker) {
    color: var(--accent);
    font-family: monospace;
  }
  :global(pre) {
    color: var(--light);
  }
  :global(li > p) {
    display: inline;
  }
  :global(blockquote > h2) {
    margin-top: 1rem;
  }
  :global(h1, h2, h3, h4, h5) {
    font-family: "new-science", sans-serif;
    font-weight: 300;
    font-style: normal;
    color: var(--light);
    margin-top: 1rem;
  }
  :global(h4, h5) {
    margin-left: 3rem;
  }
  :global(hr) {
    border-color: var(--accent);
    width: 50%;
    margin-top: 3rem;
  }
  :global(code) {
    background-color: var(--light-accent);
  }
  :global(pre > code) {
    display: block;
    padding: 1rem;
    color: rgb(0, 0, 0);
    background-color: rgb(243, 243, 243);
    border-left: solid 1px var(--mid1);
    overflow: scroll;
  }
  :global(h2) {
    margin-top: 3rem;
  }
  :global(p, li) {
    color: var(--light);
    font-family: "new-science", sans-serif;
    font-weight: 300;
    font-style: normal;
  }
  :global(tbody) {
    font-family: monospace;
    background-color: var(--light-accent);
  }
  :global(thead) {
    font-family: monospace;
    color: var(--dark);
    background-color: var(--accent);
  }
  :global(td, th) {
    padding: 0.5rem;
    border: solid 1px var(--accent);
  }
  :global(td) {
    color: var(--light);
  }
  :global(table) {
    border-collapse: collapse;
    margin: 1rem 3rem;
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
    font-family: monospace;
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
