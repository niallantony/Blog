import {
  findFilteredPostTitles,
  findPostTitles,
  getTopTags,
} from "$lib/server/database";

export async function load({ params, url }) {
  let topTags = await getTopTags(10);
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
