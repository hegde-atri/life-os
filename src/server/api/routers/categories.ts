import { categories, userCategories } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { eq } from "drizzle-orm";

export const categoriesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(categories);
  }),

  getUsersCategories: protectedProcedure.query(async ({ ctx }) => {
    const userCategoryIds = await ctx.db
      .select(userCategories.categoryId)
      .from(userCategories)
      .where(eq(userCategories.userId, currentUserId));
  }),
});
