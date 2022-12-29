import { logsnag } from "utils/logsnag";
import { prismaClient } from "utils/prismadb";
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

const { NEXT_PUBLIC_LIVEBLOCKS_BASE_URL, LIVEBLOCKS_PRIVATE_KEY } = process.env;

export const projectRouter = router({
  getAllProjects: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const projectUser = await prismaClient.projectUser.findMany({
        where: {
          userId: input,
        },
        include: {
          project: true,
        },
      });
      return projectUser.map(({ project }) => project);
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

      await prismaClient.projectUser.deleteMany({
        where: {
          projectId: input,
        },
      });

      await logsnag.publish({
        channel: "project",
        event: "Project deleted",
        icon: "❌",
        description: `Project with id ${input} deleted`,
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
        channel: "project",
        event: "Project created",
        icon: "✅",
        description: `Project ${name} created by ${user}`,
      });

      return await prismaClient.projectUser.create({
        data: {
          user: {
            connect: { id: user },
          },
          role: "OWNER",
          project: {
            create: {
              name,
            },
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
