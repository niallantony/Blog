import { findAllPosts, findDistinctDates } from "$lib/server/database";

export async function load() {
  const posts = await findAllPosts();
  const months = await findDistinctDates();

  return {
    posts,
    months,
  };
}
