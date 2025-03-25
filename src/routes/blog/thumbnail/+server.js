import { Dropbox } from "dropbox";
import { env } from "$env/dynamic/private";
import { Buffer } from "buffer";

export async function GET({ request, url }) {
  const path = url.searchParams.get("path");

  const refreshToken = env.DROPBOX_REFRESH_TOKEN;
  const appKey = env.DROPBOX_APP_KEY;
  const appSecret = env.DROPBOX_APP_SECRET;
  const encodedAuth = Buffer.from(`${appKey}:${appSecret}`).toString("base64");

  const response = await fetch("https://api.dropbox.com/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + encodedAuth,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  const data = await response.json();
  const dbx = new Dropbox({ accessToken: data.access_token });

  try {
    const res = await dbx.filesGetThumbnailV2({
      format: "jpeg",
      mode: "fitone_bestfit",
      size: "w256h256",
      resource: {
        ".tag": "path",
        path: path,
      },
    });
    if (res.status !== 200) {
      return new Response(res.result, { status: 500 });
    }
    return new Response(res.result.fileBinary, {
      status: 200,
      headers: {
        "content-type": "application/octet-stream",
      },
    });
  } catch (err) {
    console.log(err);
    return new Response(err, { status: 500 });
  }
}
