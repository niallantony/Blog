import { getPosts } from "$lib/posts";

export const prerender = true;

export async function load({ params }) {
  const { postEntries: posts, tags } = await getPosts();

  return {
    posts,
    tags,
  };
}
