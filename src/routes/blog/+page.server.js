import { findAllPosts } from "$lib/server/database";

export async function load() {
  const posts = await findAllPosts();
  const months = getMonths(posts);

  return {
    posts,
    months,
  };
}

function getMonths(array) {
  return array.reduce((prev, curr) => {
    const month = new Intl.DateTimeFormat("en-UK", { month: "long" }).format(
      curr.added,
    );
    if (prev.includes(month)) {
      return prev;
    } else {
      prev.push(month);
    }
    return prev;
  }, []);
}
