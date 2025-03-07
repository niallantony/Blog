import { postPost } from "$lib/server/database";
import { json } from "@sveltejs/kit";
import zlib from "node:zlib";
import { env } from "$env/dynamic/private";
import crypto from "crypto";
import { promisify } from "node:util";

const secret = env.SECRET;

export async function POST({ request }) {
  const req = await request.json();
  const { compressed, timeStamp, encrypted } = req;
  if (!compareHash(compressed, encrypted, timeStamp)) {
    return new Response("Unauthorised post", { status: 401 });
  }
  const content = await getContent(compressed);
  const { title, tags, body } = splitContent(content.toString());
  const dbResponse = await postPost({ title, tags, body });

  if (dbResponse.acknowledged) {
    return new Response("Posted OK!", { status: 200 });
  }
  return new Response("Unsuccessful", { status: 500 });
}

function compareHash(compressed, encrypted, timeStamp) {
  const expected = crypto
    .createHmac("sha256", secret)
    .update(timeStamp)
    .digest("hex");
  return encrypted === expected;
}

async function getContent(compressed) {
  const gunzip = promisify(zlib.gunzip);
  const buffer = Buffer.from(compressed);
  const content = await gunzip(buffer);
  return content;
}

function splitContent(content) {
  let [title, tags, ...body] = content.split("\n");
  title = title.substring(1).trim();
  tags = tags.split(",").map((tag) => tag.trim());
  body = body.join("\n");
  return {
    title,
    tags,
    body,
  };
}
