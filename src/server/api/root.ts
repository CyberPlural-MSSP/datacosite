import { adminRouter } from "~/server/api/routers/admin";
import { dataTypesRouter } from "~/server/api/routers/data-types";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  admin: adminRouter,
  dataTypes: dataTypesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.admin.getLatest();
 *       ^? Admin[]
 */
export const createCaller = createCallerFactory(appRouter);
