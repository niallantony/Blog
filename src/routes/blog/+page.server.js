import { findPostTitles, findTopTags } from "$lib/server/database";

export async function load() {
  const titles = await findPostTitles();
  let topTags = await findTopTags(10);
  topTags = topTags.map((tag) => tag._id);
  console.log(topTags);

  return {
    titles,
    topTags,
  };
}
