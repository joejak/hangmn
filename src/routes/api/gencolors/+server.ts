import { json, text } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
export const prerender = true;

export const GET: RequestHandler = async () => {
  const res = await fetch("http://colormind.io/api/", {
    method: "Post",
    body: JSON.stringify({
      model: "default",
    }),
  });

  const body = await res.json()

  return json(body);
};
