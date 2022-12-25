import { prismaClient } from "utils/prismadb";
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const projectRouter = router({
  getAllProjects: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await prismaClient.project.findMany({
        where: {
          users: {
            some: {
              id: input,
            },
          },
        },
      });
    }),
  getProjectById: protectedProcedure
    .input(z.string().transform((id) => parseInt(id)))
    .query(async ({ input }) => {
      return await prismaClient.project.findUnique({
        where: {
          id: input,
        },
      });
    }),
  deleteProjectById: protectedProcedure
    .input(z.string().transform((id) => parseInt(id)))
    .mutation(async ({ input }) => {
      return await prismaClient.project.delete({
        where: {
          id: input,
        },
      });
    }),
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        user: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, user } = input;
      return await prismaClient.project.create({
        data: {
          name,
          users: {
            connect: { id: user },
          },
        },
      });
    }),
});
