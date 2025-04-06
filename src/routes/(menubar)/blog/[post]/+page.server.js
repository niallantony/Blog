import { getPost, updateViews } from "$lib/server/database";

export async function load({ params }) {
  const post = await getPost(params.post);
  const { views } = await updateViews(params.post);
  return {
    post,
    views,
  };
}
