import { MongoClient } from "mongodb";
import { env } from "$env/dynamic/private";

const uri = env.DBSTRING;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("myBlogDB");
    const collections = await database.listCollections().toArray();
    console.log(
      "📂 Collections in database:",
      collections.map((c) => c.name),
    );

    const collection = database.collection("posts");

    const posts = await collection.find().toArray();
    console.log("Blog posts:", posts);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
