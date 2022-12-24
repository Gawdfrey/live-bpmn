import { router, protectedProcedure } from "../trpc";

export const projectRouter = router({
  getAllProjects: protectedProcedure.query(() => {
    return [];
  }),
});
