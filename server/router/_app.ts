import { mergeRouters } from "../trpc";
import { projectRouter } from "./projects";
import { userRouter } from "./users";

export const appRouter = mergeRouters(projectRouter, userRouter);

export type AppRouter = typeof appRouter;
