<script>
  import Post from "./Post.svelte";

  let { data } = $props();
</script>

<h1>Blog</h1>
{#each data.posts as post}
  <Post title={post.title} body={post.body} />
{/each}
