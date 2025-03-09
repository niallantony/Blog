import { MongoClient } from "mongodb";
import pg from "pg";
import { env } from "$env/dynamic/private";
import { sql } from "./sql";

const { Pool } = pg;
const pool = new Pool({
  connectionString: env.PSQL_URL,
});
const uri = env.DBSTRING;
const client = new MongoClient(uri);

export async function getTopTags(number) {
  try {
    let { rows } = await pool.query(sql.getTags);
    const tags = rows.map((row) => row.tag);
    return tags;
  } catch (err) {
    console.error(err);
  }
}

export async function findTopTags(number) {
  try {
    await client.connect();
    const database = client.db("myBlogDB");
    const collection = database.collection("tags");
    const pipeline = [
      { $group: { _id: "$tag", count: { $count: {} } } },
      { $sort: { count: -1 } },
      { $limit: number },
    ];
    const cursor = await collection.aggregate(pipeline);
    const data = await cursor.toArray();
    return data;
  } catch (err) {
    client.log(err);
  } finally {
    await client.close();
  }
}
export async function findPostTitles() {
  try {
    await client.connect();
    const database = client.db("myBlogDB");
    const collection = database.collection("posts");

    const cursor = await collection.find().project({
      title: 1,
      _id: 1,
      url: 1,
    });
    const data = await cursor
      .map((p) => {
        const date = p._id.getTimestamp().toLocaleDateString("en-GB");
        const id = p._id.toString();
        return {
          title: p.title,
          id,
          date,
          url: `/blog/${p.url}`,
        };
      })
      .toArray();
    return data;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

export async function findFilteredPostTitles(filters) {
  try {
    await client.connect();
    const database = client.db("myBlogDB");
    const collection = database.collection("posts");

    const cursor = await collection.find({ tags: { $all: filters } }).project({
      title: 1,
      _id: 1,
      url: 1,
    });
    const data = await cursor
      .map((p) => {
        const date = p._id.getTimestamp().toLocaleDateString("en-GB");
        const id = p._id.toString();
        return {
          title: p.title,
          id,
          date,
          url: `/blog/${p.url}`,
        };
      })
      .toArray();
    return data;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

export async function getPost(post) {
  try {
    await client.connect();

    const database = client.db("myBlogDB");
    const collection = database.collection("posts");
    const cursor = await collection.find({
      url: post,
    });
    const data = await cursor
      .map((p) => {
        const date = p._id.getTimestamp().toLocaleDateString("en-GB");
        return {
          title: p.title,
          date,
          body: p.body,
          tags: p.tags,
        };
      })
      .next();
    return data;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

export async function postPost(post) {
  const { title, tags, body } = post;
  const url = title
    .split(" ")
    .join("")
    .replaceAll(/[^a-zA-Z0-9]/g, "");
  try {
    await pool.query("BEGIN;");

    const insertPost = await pool.query(sql.postBody, [title, tags, body]);
    const { blog_id } = insertPost.rows[0];

    const tagPosts = [];

    for (const tag of tags) {
      const { rows } = await pool.query(sql.getTag, [tag]);
      if (!rows.length) {
        const newTag = await pool.query(sql.insertTag, [tag]);
        rows.push(newTag.rows[0]);
      }
      await pool.query(sql.insertPostTag, [rows[0].tag_id, blog_id]);
      tagPosts.push(rows[0].tag_id);
    }

    await pool.query("COMMIT;");

    return { blog_id, tagPosts, error: null };
  } catch (err) {
    await pool.query("ROLLBACK;");
    return { blog_id: null, tagPosts: null, error: err };
  }
}
