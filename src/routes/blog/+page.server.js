import { findDistinctDates, findPostTitles } from "$lib/server/database";

export async function load() {
  const titles = await findPostTitles();

  return {
    titles,
  };
}
