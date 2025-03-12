import {
  getFilteredPostTitles,
  getPostTitles,
  getTopTags,
} from "$lib/server/database";

export async function load({ params, url }) {
  let topTags = await getTopTags(10);
  const filterString = url.searchParams.get("filter");
  const sortString = url.searchParams.get("sort")
    ? url.searchParams.get("sort")
    : null;
  let titles;
  if (filterString) {
    const filters = filterString.split(",");
    titles = await getFilteredPostTitles(filters, sortString);
  } else {
    titles = await getPostTitles(sortString);
  }

  return {
    titles,
    topTags,
  };
}
