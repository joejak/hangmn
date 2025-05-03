import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

const bannedwords: string[] = [];

export const GET: RequestHandler = async () => {
  const response = fetch(
    "https://random-word-api.herokuapp.com/word?number=100"
  );
  const response2 = fetch("https://random-word-api.vercel.app/api?words=25");
  const response3 = fetch(
    "https://random-word.ryanrk.com/api/en/word/random/?minlength=4&maxlength=7"
  );

  let winner = await Promise.any([response, response2, response3]);
  const body = await winner.json();
  console.log(body);
  let startList = body as unknown as Array<string>;
  startList = startList.map((term) => {
    return term.toLowerCase();
  });
  startList = startList.filter((term) => {
    return !bannedwords.includes(term);
  });
  startList = startList.filter((term) => {
    return term.length < 8 && term.length > 3;
  });
  let ret = startList[Math.floor(Math.random() * startList.length)];
  return json(ret);
};
