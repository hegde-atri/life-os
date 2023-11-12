import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { input } from "@nextui-org/react";

export const profilesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.profile.findMany();
  }),

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
});
