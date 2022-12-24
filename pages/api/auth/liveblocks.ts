import { authorize } from "@liveblocks/node";
import type { NextApiRequest, NextApiResponse } from "next";

const { LIVEBLOCKS_PRIVATE_KEY } = process.env;

const secret = LIVEBLOCKS_PRIVATE_KEY!;

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const room = req.body.room;
  const result = await authorize({
    room,
    secret,
    userId: "123", // Optional
    userInfo: {
      // Optional
      name: "Ada Lovelace",
    },
  });
  return res.status(result.status).end(result.body);
}
