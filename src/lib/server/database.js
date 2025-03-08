import { MongoClient } from "mongodb";
import { env } from "$env/dynamic/private";

const uri = env.DBSTRING;
const client = new MongoClient(uri);

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
    await client.connect();
    const database = client.db("myBlogDB");
    const postCollection = database.collection("posts");
    const tagCollection = database.collection("tags");
    const postResponse = await postCollection.insertOne({
      title,
      tags,
      body,
      url,
    });
    const tagEntries = tags.map((tag) => {
      return { tag, post: postResponse.insertedId };
    });
    const tagResponse = await tagCollection.insertMany(tagEntries, {});
    return { postResponse, tagResponse };
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}
