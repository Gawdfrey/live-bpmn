import { NextApiRequest, NextApiResponse } from "next";
import { logsnag } from "utils/logsnag";
import { prismaClient } from "utils/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.INSIGHT_SECRET}`) {
        const userCount = await prismaClient.user.count();
        const projectCount = await prismaClient.project.count();

        await logsnag.insight({
          icon: "🧑",
          title: "Users",
          value: userCount,
        });

        await logsnag.insight({
          icon: "‘📄",
          title: "Projects",
          value: projectCount,
        });

        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false });
      }
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err?.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
