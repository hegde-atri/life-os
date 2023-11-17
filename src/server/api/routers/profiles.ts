import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const profilesRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.profile.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  addCoins: protectedProcedure
    .input(z.object({ coinIncrease: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.db.profile.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
      });
      if (user) {
        await ctx.db.profile.update({
          where: {
            userId: ctx.session.user.id,
          },
          data: {
            points: user.points + input.coinIncrease,
          },
        });
      }
    }),

  getPoints: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.profile.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return {points: user?.points};
  }),
});
