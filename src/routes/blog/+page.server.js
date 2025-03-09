import {
  getFilteredPostTitles,
  getPostTitles,
  getTopTags,
} from "$lib/server/database";

export async function load({ params, url }) {
  let topTags = await getTopTags(10);
  const filterString = url.searchParams.get("filter");
  let titles;
  if (filterString) {
    const filters = filterString.split(",");
    console.log(filters);
    titles = await getFilteredPostTitles(filters);
  } else {
    titles = await getPostTitles();
  }

  return {
    titles,
    topTags,
  };
}
