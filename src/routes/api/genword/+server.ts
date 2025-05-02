import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

const bannedwords = ["joseph", "a", "the"];

export const GET: RequestHandler = async () => {
  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?number=1000"
  );
  const body = await response.json();
  let startList = body as Array<string>;
  startList = startList.filter((term)=>{
    return !bannedwords.includes(term.toLowerCase());
  })
  startList = startList.filter((term)=>{
    return term.length < 8;
  })
  console.log(startList);
  let ret = startList[Math.floor(Math.random() * startList.length)];
  return json(ret);
};
