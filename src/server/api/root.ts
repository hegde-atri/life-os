import { tasksRouter } from "~/server/api/routers/tasks";
import { createTRPCRouter } from "~/server/api/trpc";
import { categoriesRouter } from "./routers/categories";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  tasks: tasksRouter,
  category: categoriesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
