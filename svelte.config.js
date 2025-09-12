import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-static";
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
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

  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter({
      pages: "build",
      assets: "build",
    }),
    paths: {
      base: process.argv.includes("dev") ? "" : process.env.BASE_PATH,
    },
  },
};

export default config;
