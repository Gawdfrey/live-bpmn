import { logsnag } from "utils/logsnag";
import { prismaClient } from "utils/prismadb";
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

const { NEXT_PUBLIC_LIVEBLOCKS_BASE_URL, LIVEBLOCKS_PRIVATE_KEY } = process.env;

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
      await fetch(`${NEXT_PUBLIC_LIVEBLOCKS_BASE_URL}/rooms/${input}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LIVEBLOCKS_PRIVATE_KEY}`,
        },
      });

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

      await logsnag.publish({
        channel: "create-project",
        event: "Project created",
        icon: "✅",
        description: `Project ${name} created by ${user}`,
      });

      return await prismaClient.project.create({
        data: {
          name,
          users: {
            connect: { id: user },
          },
        },
      });
    }),
  updateProjectById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, name } = input;

      return await prismaClient.project.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name,
        },
      });
    }),
});
