import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
export const prerender = true;


const bannedwords: string[] = [];

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
    return term.length < 8 && term.length > 3;
  })
  let ret = startList[Math.floor(Math.random() * startList.length)];
  return json(ret);
};
