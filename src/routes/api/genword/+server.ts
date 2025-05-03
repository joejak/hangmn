import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

const bannedwords: string[] = [];

export const GET: RequestHandler = async () => {
  const response = fetch(
    "https://random-word-api.herokuapp.com/word?number=100"
  );
  const response2 = fetch("https://random-word-api.vercel.app/api?words=100");

  let winner = await Promise.race([response, response2]);
  const body = await winner.json();

  let startList = body as unknown as Array<string>;
  startList = startList.filter((term) => {
    return !bannedwords.includes(term.toLowerCase());
  });
  startList = startList.filter((term) => {
    return term.length < 8 && term.length > 3;
  });
  let ret = startList[Math.floor(Math.random() * startList.length)];
  return json(ret);
};
