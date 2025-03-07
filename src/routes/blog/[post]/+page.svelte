<script>
  import { marked } from "marked";
  const { data } = $props();
  const { title, tags, date } = data.post;

  const body = marked.parse(data.post.body);
</script>

<h1>{title}</h1>
<p class="date">{date}</p>
<article class="post">
  {@html body}
</article>

<style>
  h1 {
    font-size: max(3rem, 2vw);
    margin: 2rem 4rem 0;
    padding-bottom: 1rem;
    border-bottom: solid 1px var(--accent);
    position: relative;
  }
  .date {
    background-color: var(--dark);
    width: fit-content;
    color: var(--mid1);
    margin: -1rem 4rem 0;
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
    width: min(100%, 1024px);
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
