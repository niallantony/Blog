<script>
  import Layout from "$lib/PostLayout.svelte";

  export let data;
  const { metadata, Content } = data.post;
</script>

<Layout {metadata}>
  <Content />
</Layout>
