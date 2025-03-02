import { findAllPosts } from "$lib/server/database";

export async function load() {
  return {
    posts: await findAllPosts(),
  };
}
