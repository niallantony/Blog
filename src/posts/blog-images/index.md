---
title: Inserting Images into my Blog
date: "2025-09-13"
tags: ['blog','images','mdsvex']
---
<script>

import BlogImage from '$lib/BlogImage.svelte'
import FloatImage from '$lib/FloatImage.svelte'
</script>

## The Problem
Right now my blog has the ability to serve Markdown files through **mdsvex** and to generate cover images for my index. One feature I wanted to be able to implement however is posting images into the blog body and having them built along with the blog. When working with a database I was working on a way to extract images and upload them into a cloud based directory from where I could link them in my blog. With this static page I image the process being a lot simplet.

## Method

<BlogImage source='./cat.jpg' alt="Cat">
My first image rendered inside a blog. What a handsome boy!
</BlogImage>

Using `![Image](src)` markdown notation in my blog presented me with a few problems.

### Bundling Images

When I envisaged my blog, I imagined folders for each post in the directory of posts. Each directory would contain the blog post, and any additional assets it needed, such as a cover image and images. This worked well for cover images as I could keep the naming consistent and just match the blog `slug` property to find the absolute path of the image in my `posts.js` helper function. Images in the content had to be extracted via the **mdsvex** parser I am using however, and mdsvex works with absolute paths. 
Thankfully there is a handy library: `mdsvex-relative-images` which transforms any relative paths used in the markdown files to absolute paths. Problem solved, I simply include that library in my `svelte.config.js`:

```js
import { mdsvex } from "mdsvex";
import relativeImages from "mdsvex-relative-images";

const config = {
  extensions: [".svelte", ".md"],

  preprocess: [
    mdsvex({
      extensions: [".md"],
      layout: {
        blog: path.resolve("./src/lib/PostLayout.svelte"),
      },
      remarkPlugins: [relativeImages], // as a Remark Plugin
      rehypePlugins: [],
    }),
  ],

  // ...

};

export default config;
```

And that takes care of that problem.

### Styling 

<FloatImage source='./cat2.jpg' alt="Cat">
This image is rendered in a floating container, for text wrapping
</FloatImage>

The next issue was styling the images. Using markdown's image notation imports images as is, which means large images load large. I could apply a global style to images, very much like code highlighting, but I thought it would be nice to be able to customise how my images render when righting my blogs (between lines, next to, etc...) so this is where I make use of another great feature of **mdsvex**.

```svelte
// Svelte components right within the markdown!
<BlogImage source='./cat.jpg' alt="Cat">
    My first image rendered inside a blog. What a handsome boy!
</BlogImage>
``` 


I can then create a component `<BlogImage>` which handles all my styling and use this for any images I want to include. It is a little more verbose than using markdown's native notation - but it allows me finer control over the styling of images. I can include images in rows, grids, nestled in text and so on!

<BlogImage source='./cat3.jpg' alt="Cat">
Ok, I'll stop showing off my images/cats now.
</BlogImage>
