import { prismaClient } from "utils/prismadb";
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const userRouter = router({
  getAllUsers: protectedProcedure.query(() => {
    return [];
  }),
  getUserById: protectedProcedure.input(z.string()).query(async ({ input }) => {
    return await prismaClient.user.findUnique({
      where: {
        id: input,
      },
    });
  }),
});
