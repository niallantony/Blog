import { Dropbox } from "dropbox";
import { env } from "$env/dynamic/private";

export async function GET({ request, url }) {
  const path = url.searchParams.get("path");
  const dbx = new Dropbox({ accessToken: env.DROPBOX_API_TOKEN });

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
      console.log(res);
      console.log("Not OK!");
      return new Response(res.result, { status: 500 });
    }
    console.log(res.result);
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
