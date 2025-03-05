import { findDistinctDates, findPostTitles } from "$lib/server/database";

export async function load() {
  const titles = await findPostTitles();
  const months = await findDistinctDates();

  console.log(months);

  return {
    titles,
    months,
  };
}
