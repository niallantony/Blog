<script>
  import { Marked } from "marked";
  import { markedHighlight } from "marked-highlight";
  const { data } = $props();
  const { title, body, date } = data.post;
  import hljs from "highlight.js";

  const marked = new Marked(
    markedHighlight({
      emptyLanClass: "hljs",
      langPrefix: "hljs language-",
      highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
    }),
  );
  const html = marked.parse(body);
</script>

<h1>{title}</h1>
<p class="date">{date}</p>
<article class="post">
  {@html html}
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
  :global(pre code.hljs) {
    display: block;
    overflow-x: auto;
    padding: 1em;
  }
  :global(code.hljs) {
    padding: 3px 5px;
  }
  :global(.hljs) {
    background: #f3f3f3;
    color: #444;
  }
  :global(.hljs-comment) {
    color: #697070;
  }
  :global(.hljs-punctuation, .hljs-tag) {
    color: #444a;
  }
  :global(.hljs-tag .hljs-attr, .hljs-tag .hljs-name) {
    color: #444;
  }
  :global(
      .hljs-attribute,
      .hljs-doctag,
      .hljs-keyword,
      .hljs-meta .hljs-keyword,
      .hljs-name,
      .hljs-selector-tag
    ) {
    font-weight: 700;
  }
  :global(
      .hljs-deletion,
      .hljs-number,
      .hljs-quote,
      .hljs-selector-class,
      .hljs-selector-id,
      .hljs-string,
      .hljs-template-tag,
      .hljs-type
    ) {
    color: #800;
  }
  :global(.hljs-section, .hljs-title) {
    color: #800;
    font-weight: 700;
  }
  :global(
      .hljs-link,
      .hljs-operator,
      .hljs-regexp,
      .hljs-selector-attr,
      .hljs-selector-pseudo,
      .hljs-symbol,
      .hljs-template-variable,
      .hljs-variable
    ) {
    color: #ab5656;
  }
  :global(.hljs-literal) {
    color: #695;
  }
  :global(.hljs-addition, .hljs-built_in, .hljs-bullet, .hljs-code) {
    color: #397300;
  }
  :global(.hljs-meta) {
    color: #1f7199;
  }
  :global(.hljs-meta .hljs-string) {
    color: #38a;
  }
  :global(.hljs-emphasis) {
    font-style: italic;
  }
  :global(.hljs-strong) {
    font-weight: 700;
  }
</style>
