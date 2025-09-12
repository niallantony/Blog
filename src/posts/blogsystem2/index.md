---
title: Making My Blog Part 2
date: "2025-09-12"
tags: ['blog', 'static', 'migrate', 'front-end', 'back-end']
---
## The Problem

After making my blog using a database, a server with SvelteKit and a lightweight front-end, I couldn't help thinking that I was over-complicating things. I also developed a small node application on my local machine so that I could write my blog using markdown, bundle it with cover images and images that should be displayed in the blog post, and then post it to an endpoint on my server (with authentication!) to be inserted into my database.... phew!
All of this just for a personal blog. And, the kicker was, after making sure this very intricate machine ran as intended, I put it down and never posted again. The mechanism of writing, sending, and then checking my blog was just too convoluted. 
This isn't even to mention the fact that I was using a free tier hosting service, which took a while to connect to the database, so the blog posts loaded several seconds after being contacted. It was a good experience developing this, but I felt it was time to simplify the process.

## mdsvex

The [mdsvex](https://mdsvex.pngwn.io) library helped here. This is a fairly lightweight library for transforming Markdown files into Svelte pages, and while it sounds simple, it actually does a lot under the hood. After installing, we have to tweak our `svelte.config.js` file to let **mdsvex** handle preprocessing of `.md` pages:

```js
import { mdsvex } from "mdsvex"

const config = {
  extensions: [".svelte", ".md"],

  preprocess: [
    mdsvex({
      extensions: [".md"],
      layout: {
        blog: path.resolve("./src/lib/PostLayout.svelte"),
      },
      remarkPlugins: [],
      rehypePlugins: [],
    }),
  ],

  //... 
};
```

As you can see the configuration of **mdsvex** allows us to specify a layout file. Really handy!

```html
<script>
  export let metadata;
</script>

<article class="post">
  <header>
    <h1>{metadata.title}</h1>
    <p class="date">{metadata.date}</p>
    {#if metadata.tags?.length}
      <ul class="tags">
        {#each metadata.tags as tag}
          <li>{tag}</li>
        {/each}
      </ul>
    {/if}
  </header>
  <section class="content">
    <slot />
  </section>
</article>
```

The layout file can access metadata, which is data included in the frontmatter of any markdown files we include - written in YAML style. So for example:

```yaml
---
title: Making My Blog Part 2
date: "2025-09-12"
tags: ['blog', 'static', 'migrate', 'front-end', 'back-end']
---
```

This all works out of the box! In fact, even the code syntax highlighting you can see on this page is all handled by **mdsvex**! All thats left to do is to load the posts through a helper function and supply it to our `/blog/[post]/` 

## Serving it Up

Through the following module I can access the blog post files and serve them up to my Svelte site.

```js
// lib/posts.js

// I use this naming convention for any cover images bundled with posts
const covers = import.meta.glob("/src/posts/**/cover.jpg", {
  eager: true,
  as: "url",
});

export async function getPosts() {
  // I can keep my posts in a seperate directory
  const files = import.meta.glob("/src/posts/**/*.md");

  const postEntries = await Promise.all(
    Object.entries(files).map(async ([path, resolver]) => {
      const postModule = await resolver();

      // This allows me to have posts bundled with images in folders,
      // or as single markdown sheets
      let slug = path
        .replace("/src/posts/", "")
        .replace(/\/index\.md$/, "")
        .replace(/\.md$/, "");

      // Find the right cover,
      const cover = covers[`/src/posts/${slug}/cover.jpg`];

      // And return the posts!
      return {
        slug,
        url: `${base}/blog/${slug}`,
        metadata: postModule.metadata,
        Content: postModule.default,
        cover,
      };
    }),
  );

  // All sorted by chronological order
  postEntries.sort(
    (a, b) => new Date(b.metadata.date) - new Date(a.metadata.date),
  );

  // With a list of tags
  const tags = getTags(postEntries, { amount: 10 });

  return { postEntries, tags };
}

// My metadata includes tags, so this little function allows me
// to get an array of the most numerous tags amongst my posts
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
```

Now any of my pages can access the blog content after it is preprocessed by mdsvex. For example the following is my `/blog/[post]/+page.js` which not only provides the data for the template with the `load` function - but also uses the `entries` function to provide Svelte's `static-adapter` with a list of all possible param options by mapping the slugs returned from the `getPosts()` function. Now the full thing can be prerendered as a static site!

```js
import { getPosts } from "$lib/posts";

export const prerender = true;

// This ensures the prerenderer knows about all the possible options
// that can appear in the [post] parameter.
export async function entries() {
  const { postEntries: posts } = await getPosts();
  return posts.map((p) => ({ post: p.slug }));
}

export async function load({ params }) {
  const { postEntries: posts, tags } = await getPosts();

  const index = posts.findIndex((p) => p.slug === params.post);

  if (index === -1) {
    return {
      status: 404,
      error: new Error(`Post not found: ${params.post}`),
    };
  }

  const post = posts[index];

  return {
    post,
  };
}
```

## Some sacrifices

So some possible future features have been sacrificed - there will be no comments and likes, and page views also had to die - but all in all, the migration was a simple one and it serves up my site much faster and more efficiently. Even the search and filter functions work now with a little tweaking.

## Deployment

The best part about changing to a statically rendered site is the fact that I no longer need a server or database to hold my content - I can deploy the page much easier. In fact, this is deployed now on Github Pages. With the Github Action supplied in the [Svelte Documentation](https://svelte.dev/docs/kit/adapter-static#GitHub-Pages) it even means the site will be deployed on any push to the main branch, this means super easy posting for me, and hopefully that means more activity on my blog.

All in all this change took a morning of work and I am very happy with the result. 

*Cover image from Unsplash by [Ales Nesetril](https://unsplash.com/@alesnesetril?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)*
