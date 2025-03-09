import { getPost } from "$lib/server/database";

export async function load({ params }) {
  const post = await getPost(params.post);
  return {
    post,
  };
}
