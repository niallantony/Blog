const covers = import.meta.glob("/src/posts/**/cover.jpg", {
  eager: true,
  as: "url",
});

export async function getPosts() {
  const files = import.meta.glob("/src/posts/**/*.md");

  const postEntries = await Promise.all(
    Object.entries(files).map(async ([path, resolver]) => {
      const postModule = await resolver();

      let slug = path
        .replace("/src/posts/", "")
        .replace(/\/index\.md$/, "")
        .replace(/\.md$/, "");

      const cover = covers[`/src/posts/${slug}/cover.jpg`];

      return {
        slug,
        metadata: postModule.metadata,
        Content: postModule.default,
        cover,
      };
    }),
  );

  postEntries.sort(
    (a, b) => new Date(b.metadata.date) - new Date(a.metadata.date),
  );

  const tags = getTags(postEntries, { amount: 10 });

  return { postEntries, tags };
}

const getTags = (posts, options = {}) => {
  const filterCount = {};
  posts.forEach((post) => {
    const tags = post.metadata.tags;
    tags.forEach((tag) => {
      if (Object.keys(filterCount).includes(tag)) {
        filterCount[tag] = filterCount[tag] + 1;
      } else {
        filterCount[tag] = 1;
      }
    });
  });
  const filters = Object.keys(filterCount);
  if (options.amount) {
    filters.sort((a, b) => {
      filterCount[b] - filterCount[a];
    });
    return filters.slice(0, options.amount);
  }
  return filters;
};
