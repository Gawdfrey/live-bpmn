import { mergeRouters } from "../trpc";
import { projectRouter } from "./projects";

export const appRouter = mergeRouters(projectRouter);

export type AppRouter = typeof appRouter;
