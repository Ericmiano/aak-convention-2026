import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getLiveAakEvent } from "./services/aakEvent";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  liveEvent: router({
    get: publicProcedure.input(z.object({ simulateFailure: z.boolean().optional() }).optional()).query(async ({ input }) => {
      try {
        if (input?.simulateFailure && process.env.NODE_ENV !== "production") {
          throw new Error("Development-only source failure simulation");
        }
        return await getLiveAakEvent();
      } catch (error) {
        console.error("[AAK live event] Source refresh failed", error);
        throw new Error("The official AAK event information is temporarily unavailable.");
      }
    }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
