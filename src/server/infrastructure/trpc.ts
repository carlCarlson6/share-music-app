import "server-only";
import { TRPCError, initTRPC } from "@trpc/server";
import { experimental_nextAppDirCaller } from "@trpc/server/adapters/next-app-dir";
import { getDb } from "./db";

export const serverActionProcedure = initTRPC.create().procedure
  .experimental_caller(experimental_nextAppDirCaller({}))
  .use(async (opts) => opts.next({
    ctx: {
      user: undefined,
      db: await getDb()
    },
  }));


export const protectedAction = serverActionProcedure.use((opts) => {
  if (!opts.ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return opts.next({
    ctx: {
      ...opts.ctx,
      user: opts.ctx.user
    }
  });
});

export const iAmAlive = serverActionProcedure
  .query(() => "i'm alive");