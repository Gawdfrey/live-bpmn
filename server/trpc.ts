import { initTRPC, TRPCError } from "@trpc/server";
import { isAfter } from "date-fns";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(({ next, ctx }) => {
  const { session } = ctx;
  const isUser = session?.user;
  const sessionHasExpired = isAfter(new Date(), new Date(session?.expires!));
  if (!isUser && !sessionHasExpired) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
export const middleware = t.middleware;
export const router = t.router;
export const mergeRouters = t.mergeRouters;
