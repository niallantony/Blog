import {
  findFilteredPostTitles,
  findPostTitles,
  findTopTags,
} from "$lib/server/database";

export async function load({ params, url }) {
  let topTags = await findTopTags(10);
  topTags = topTags.map((tag) => tag._id);
  const filterString = url.searchParams.get("filter");
  let titles;
  if (filterString) {
    const filters = filterString.split(",");
    titles = await findFilteredPostTitles(filters);
  } else {
    titles = await findPostTitles();
  }

  return {
    titles,
    topTags,
  };
}
