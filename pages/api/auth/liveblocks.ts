import { authorize } from "@liveblocks/node";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]";

const { LIVEBLOCKS_PRIVATE_KEY } = process.env;

const secret = LIVEBLOCKS_PRIVATE_KEY!;

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).end("Unauthorized");
  }
  const { user } = session;
  const room = req.body.room;
  const result = await authorize({
    room,
    secret,
    userInfo: {
      name: user?.name,
      image: user?.image,
    },
  });
  return res.status(result.status).end(result.body);
}
