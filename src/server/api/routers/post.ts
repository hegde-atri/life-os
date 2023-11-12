import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const postRouter = createTRPCRouter({
  hello: protectedProcedure.query(async () => {
    const count = 2;

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            `Generate ${count} *self-enclosing* personal development tasks that someone could do for each category provided, assign each a corresponding difficulty value (0-40). Format json: {category: {task: value, task: value...},}. Don't add markdown. Eg. {"Swimming": {"Swim 500m non-stop": 15,...},}`,
        },
        {
          role: "user",
          content: "Uni Work, Programming, Swimming, over sleeping",
        },
      ],
      model: "gpt-3.5-turbo-1106",
    });

    console.log(chatCompletion.choices[0]?.message.content);

    return {
      // data: "message",
      data: JSON.parse(chatCompletion.choices[0]?.message.content!),
    };
  }),

  createTask: protectedProcedure
    .input(
      z.object({
        category: z.string().min(1),
        name: z.string(),
        points: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      let categoryFromName = await ctx.db.category.findFirst({
        where: { name: input.category },
      });

      let categoryId;
      if (categoryFromName) {
        categoryId = categoryFromName.id;
      } else {
        categoryFromName = await ctx.db.category.findFirst();
        categoryId = categoryFromName?.id!
      }

      await ctx.db.task.create({
        data: {
          userId: ctx.session.user.id,
          categoryId: categoryId,
          name: input.name,
          points: input.points,
        },
      });
      return { ok: true };
    }),
});

// const example_data = `{
//   "Uni Work": {
//     "Read one academic paper from your field of study": 20,
//     "Create a study schedule for the week and stick to it": 30
//   },
//   "Programming": {
//     "Complete an online coding challenge": 25,
//     "Create a simple application that solves a real-world problem": 35
//   },
//   "Swimming": {
//     "Swim 500m non-stop": 15,
//     "Practice bilateral breathing for 10 minutes": 20
//   },
//   "Over Sleeping": {
//     "Set and stick to a consistent bedtime for a week": 20,
//     "Create a calming bedtime routine and follow it for a week": 25
//   }
// }`
