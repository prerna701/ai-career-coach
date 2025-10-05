import { getUserIdFromReq } from "@/lib/auth";
import { get } from "react-hook-form";
export default async function handler(req,res){
  const userId = getUserIdFromReq(req);
  if(!userId){
    return res.status(401).json({ error: "Unauthorized"});
  }
  return res.json({ ok: true,userId});
}