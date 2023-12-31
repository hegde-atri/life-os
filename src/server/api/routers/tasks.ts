import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import OpenAI from "openai";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const tasksRouter = createTRPCRouter({
  generateTasks: protectedProcedure
    .output(
      z.array(
        z.object({
          category: z.string(),
          task: z.string(),
          points: z.number(),
        }),
      ),
    )
    .query(async ({ ctx }) => {
      // Fetch user categories
      // Copied from categories.ts (idk how to call from within)
      const userCategories = await ctx.db.userCategory.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      });
      const categoryIds = userCategories.map(
        (userCategory) => userCategory.categoryId,
      );
      const categories = await ctx.db.category.findMany({
        where: { id: { in: categoryIds } },
      });

      // Temporary funciton while the db is full of crap.
      // Ideally would remove in prod, however max length enforcment is a must.
      function cleanCategories(
        dirtyCategories: { id: string; name: string }[],
      ) {
        let validCategories: string[] = [];
        for (let category of dirtyCategories) {
          if (category.name.length <= 16) {
            validCategories.push(category.name);
          }
        }
        return validCategories;
      }

      interface Task {
        category: string;
        task: string;
        points: number;
      }

      let tasks: Task[] = [];

      const validCategories = cleanCategories(categories);
      console.log("validCategories", validCategories);

      // Handle case where user has no selected categories and prevent api call
      if (validCategories.length == 0) {
        tasks.push({
          category: "Error",
          task: "No valid categories selected!",
          points: 0,
        });
        console.log(tasks);
        return { tasks: tasks };
      }

      const count = 2;

      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Generate ${count} *self-enclosing* personal development tasks that someone could do for each category provided, assign each a corresponding difficulty value (0-40). Format json: {category: {task: value, task: value...},}. Don't add markdown. Eg. {"Swimming": {"Swim 500m non-stop": 15,...},}`,
          },
          {
            role: "user",
            content: validCategories.toString(),
          },
        ],
        model: "gpt-3.5-turbo-1106",
      });

    try {
      const GPTObj = JSON.parse(chatCompletion.choices[0]?.message.content!);
      console.log(GPTObj);

      for (let category in GPTObj) {
        for (let task in GPTObj[category]) {
          tasks.push({
            category: category,
            task: task,
            points: GPTObj[category][task],
          });
        }
      }
    } catch (error) { // If the response is unable to be parsed correctly
      tasks.push({
        category: "Error",
        task: "Potential JSON Parse Error - See console for further info.",
        points: 0,
      });
      console.log("The following input caused an error:");
      console.log(validCategories.toString());
    }

    // console.log(tasks);

    return { tasks: tasks };
  }),

  createTask: protectedProcedure
    .input(
      z.object({
        category: z.string().min(1),
        task: z.string(),
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
        categoryId = categoryFromName?.id!;
      }

      await ctx.db.task.create({
        data: {
          userId: ctx.session.user.id,
          categoryId: categoryId,
          task: input.task,
          points: input.points,
        },
      });
      return { ok: true };
    }),

  createTasks: protectedProcedure
    .input(
      z.array(
        z.object({
          category: z.string(),
          task: z.string(),
          points: z.number(),
        }),
      ),
    )
    .mutation(async ({ input, ctx }) => {
      const tasksWithUserId = input.map((taskData) => ({
        userId: ctx.session.user.id,
        categoryId: "",
        task: "",
        points: taskData.points,
      }));
      await ctx.db.task.createMany({
        data: tasksWithUserId,
      });
    }),

  getUserTasks: protectedProcedure
    .output(
      z.array(
        z.object({
          id: z.string(),
          categoryName: z.string(),
          task: z.string(),
          points: z.number(),
        }),
      ),
    )
    .query(async ({ ctx }) => {
      return await ctx.db.task
        .findMany({
          where: {
            userId: ctx.session.user.id,
          },
          include: {
            category: {
              select: {
                name: true,
              },
            },
          },
        })
        .then((tasks) => {
          return tasks.map((task) => ({
            id: task.id,
            categoryName: task.category.name,
            task: task.task,
            points: task.points,
          }));
        });
    }),

  editTask: protectedProcedure
    .input(
      z.object({
        taskId: z.string().min(1),
        task: z.string().min(1),
        points: z.number().min(0),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        let oldTask = await ctx.db.task.findFirst({
          where: {
            id: input.taskId,
          },
        });

        if (oldTask != null && oldTask.userId == ctx.session.user.id) {
          await ctx.db.task.update({
            where: {
              id: input.taskId,
            },
            data: {
              task: input.task,
              points: input.points,
            },
          });
          return { ok: true };
        } else {
          throw new TRPCError({
            code: "UNAUTHORIZED",
          });
        }
      } catch (error) {
        console.log("Error updating task: ", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }
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
