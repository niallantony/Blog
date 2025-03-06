import { postPost } from "$lib/server/database";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
  const req = await request.json();
  const { title, tags, body } = req;

  const dbResponse = await postPost({ title, tags, body });
  console.log(dbResponse);
  if (dbResponse.acknowledged) {
    return new Response("Posted OK!", { status: 200 });
  }
  return new Response("Unsuccessful", { status: 500 });
}
