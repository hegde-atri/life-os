import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { categoriesRouter } from "./routers/categories";
import { profilesRouter } from "./routers/profiles";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  category: categoriesRouter,
  profile: profilesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
