import { router, protectedProcedure } from "../trpc";

export const projectRouter = router({
  getAll: protectedProcedure.query(() => {
    return [];
  }),
});
