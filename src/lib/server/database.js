import pg from "pg";
import { env } from "$env/dynamic/private";
import { sql } from "./sql";

const { Pool } = pg;
const pool = new Pool({
  connectionString: env.PSQL_URL,
});

export async function getTopTags(number) {
  try {
    let { rows } = await pool.query(sql.getTags, [number]);
    const tags = rows.map((row) => row.tag);
    return tags;
  } catch (err) {
    console.error(err);
  }
}

export async function getPostTitles(sort) {
  const orderString =
    sort === "most viewed"
      ? sql.orderByViews
      : sort === "oldest"
        ? sql.orderByOldest
        : sql.orderByNewest;
  const query = sql.getPosts + orderString;
  try {
    let { rows } = await pool.query(query);
    const data = rows.map((row) => {
      return {
        title: row.title,
        url: `/blog/${row.url}`,
        date: row.posted_at.toLocaleDateString("en-GB"),
        image: row.imagepath,
      };
    });
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getFilteredPostTitles(filters, sort) {
  const orderString =
    sort === "most viewed"
      ? sql.orderByViews
      : sort === "oldest"
        ? sql.orderByOldest
        : sql.orderByNewest;
  const query = sql.getTaggedPosts + orderString;
  try {
    let { rows } = await pool.query(query, [filters]);
    const data = rows.map((row) => {
      return {
        title: row.title,
        url: `/blog/${row.url}`,
        date: row.posted_at.toLocaleDateString("en-GB"),
        image: row.imagepath,
      };
    });
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getPost(url) {
  try {
    const { rows } = await pool.query(sql.getPost, [url]);
    const data = rows.map((row) => {
      return {
        title: row.title,
        date: row.posted_at.toLocaleDateString("en-GB"),
        body: row.body,
      };
    });
    return data[0];
  } catch (err) {
    console.error(err);
  }
}

export async function updateViews(url) {
  try {
    const { rows } = await pool.query(sql.updateViews, [url]);
    return rows[0];
  } catch (err) {
    console.error(err);
  }
}

export async function postPost(post) {
  const { title, tags, body, imagePath } = post;
  const url = title
    .split(" ")
    .join("")
    .replaceAll(/[^a-zA-Z0-9]/g, "");
  try {
    await pool.query("BEGIN;");

    const insertPost = await pool.query(sql.insertBody, [
      title,
      url,
      body,
      imagePath,
    ]);
    const { blog_id } = insertPost.rows[0];

    const tagPosts = [];

    for (const tag of tags) {
      if (tag.trim().length) {
        const { rows } = await pool.query(sql.getTag, [tag]);
        if (!rows.length) {
          const newTag = await pool.query(sql.insertTag, [tag]);
          rows.push(newTag.rows[0]);
        }
        await pool.query(sql.insertPostTag, [rows[0].tag_id, blog_id]);
        tagPosts.push(rows[0].tag_id);
      }
    }

    await pool.query("COMMIT;");

    return { blog_id, tagPosts, error: null };
  } catch (err) {
    await pool.query("ROLLBACK;");
    return { blog_id: null, tagPosts: null, error: err };
  }
}
