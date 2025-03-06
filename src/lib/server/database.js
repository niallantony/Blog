import { MongoClient } from "mongodb";
import { env } from "$env/dynamic/private";

const uri = env.DBSTRING;
const client = new MongoClient(uri);

export async function findAllPosts() {
  try {
    await client.connect();

    const database = client.db("myBlogDB");

    const collection = database.collection("posts");

    const cursor = await collection.find().toArray();

    const posts = cursor.map((post) => {
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
    console.log(data);
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
  const url = title.split(" ").join("");
  try {
    await client.connect();
    const database = client.db("myBlogDB");
    const collection = database.collection("posts");
    const response = await collection.insertOne({ title, tags, body, url });
    return response;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

export async function findDistinctDates() {
  try {
    await client.connect();

    const database = client.db("myBlogDB");

    const collection = database.collection("posts");

    const cursor = await collection
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
    const dates = cursor.map((date) => date._id.date);
    console.log(dates);
    return dates;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}
