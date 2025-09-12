import { getPosts } from "$lib/posts";

export const prerender = true;

export async function entries() {
  const { postEntries: posts } = await getPosts();
  return posts.map((p) => ({ post: p.slug }));
}

export async function load({ params }) {
  const { postEntries: posts, tags } = await getPosts();

  const index = posts.findIndex((p) => p.slug === params.post);

  if (index === -1) {
    return {
      status: 404,
      error: new Error(`Post not found: ${params.post}`),
    };
  }

  const post = posts[index];

  return {
    post,
  };
}
