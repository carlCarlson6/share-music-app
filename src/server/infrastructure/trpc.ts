import { TRPCError, initTRPC } from "@trpc/server";
import { experimental_nextAppDirCaller } from "@trpc/server/adapters/next-app-dir";
import "server-only";
import { z } from "zod";
import { getServerAuthSession } from "./auth";
"use server";

interface Meta {
  span: string;
}

const t = initTRPC.meta<Meta>().create();

const serverActionProcedure = t.procedure
  .experimental_caller(
    experimental_nextAppDirCaller({
      pathExtractor: ({ meta }) => (meta as Meta).span
    }),
  )
  .use(async (opts) => {
    const user = await getServerAuthSession();
    return opts.next({
      ctx: { user },
    });
  });

const protectedAction = serverActionProcedure.use((opts) => {
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

export const userSaysAction = protectedAction
  .input(z.object({
    phrase: z.string(),
  }))
  .mutation(({ ctx, input }) => `${ctx.user.user.name} says ${input.phrase}`);

export const iAmAliveAction = serverActionProcedure
  .query(() => "i'm alive");