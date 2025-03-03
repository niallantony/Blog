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

export async function findDistinctDates() {
  try {
    await client.connect();

    const database = client.db("myBlogDB");

    const collection = database.collection("posts");

    const response = await collection
      .aggregate([
        {
          $group: {
            _id: {
              date: {
                $dateToString: {
                  format: "%Y-%m",
                  date: "$added",
                },
              },
            },
          },
        },
      ])
      .toArray();
    const dates = response.map((date) => date._id.date);
    console.log(dates);
    return dates;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}
