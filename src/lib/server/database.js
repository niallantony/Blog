import { MongoClient } from "mongodb";
import { env } from "$env/dynamic/private";

const uri = env.DBSTRING;
const client = new MongoClient(uri);

export async function findAllPosts() {
  try {
    await client.connect();

    const database = client.db("myBlogDB");

    const collection = database.collection("posts");

    const response = await collection.find().toArray();

    const posts = response.map((post) => {
      return {
        title: post.title,
        tags: post.tags,
        body: post.body,
        added: post.added,
      };
    });
    return posts;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}
