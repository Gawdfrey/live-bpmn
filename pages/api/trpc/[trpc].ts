import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "server/context";
import { appRouter as router } from "server/router/_app";

export default trpcNext.createNextApiHandler({
  router,
  createContext,
});
