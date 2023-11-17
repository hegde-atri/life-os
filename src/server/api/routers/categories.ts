import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const categoriesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.category.findMany();
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1).max(50) }))
    .mutation(async ({ input, ctx }) => {
      // First check if that category exists
      const existing = await ctx.db.category.findUnique({
        where: { name: input.name.toLowerCase() },
      });

      if (existing) {
        // then add user
        await ctx.db.userCategory.create({
          data: {
            userId: ctx.session.user.id,
            categoryId: existing.id,
          },
        });
      } else {
        // create it if it doesn't exist
        const category = await ctx.db.category.create({
          data: {
            name: input.name.toLowerCase(),
          },
        });

        await ctx.db.userCategory.create({
          data: {
            userId: ctx.session.user.id,
            categoryId: category.id,
          },
        });
      }
      return { ok: true };
    }),

  getUsersCategories: protectedProcedure.query(async ({ ctx }) => {
    const userCategories = await ctx.db.userCategory.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    const categoryIds = userCategories.map(
      (userCategory) => userCategory.categoryId,
    );
    return await ctx.db.category.findMany({
      where: { id: { in: categoryIds } },
    });
  }),

  delete: protectedProcedure
    .input(
      z.object({
        categoryId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.db.userCategory.findFirst({
        where: {
          userId: ctx.session.user.id,
          categoryId: input.categoryId,
        },
      });
      if (category) {
        await ctx.db.userCategory.delete({
          where: {
            id: category.id,
          },
        });
      }
    }),
});
