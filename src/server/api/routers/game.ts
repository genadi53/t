import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { games } from "@/server/db/schema";
import { mapDifficulty } from "@/utils/mapDifficulty";
import { v4 as uuidv4 } from "uuid";

export const gameRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ difficulty: z.enum(["easy", "intermediate", "hard"]) }))
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session?.user.id;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const gameId: string = uuidv4();

        const { hintsLeft, lifes, timeToAnswerSeconds } = mapDifficulty(
          input.difficulty,
        );

        await ctx.db.insert(games).values({
          id: gameId,
          hintsLeft,
          lifes,
          timeToAnswerSeconds,
          ...(userId && { userId }),
        });

        return gameId;
      } catch (error) {
        console.error(error);
        return null;
      }
    }),

  getGameById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.query.games.findFirst({
        where: (games, { eq }) => eq(games.id, input.id),
        with: {
          questions: true,
        },
      });
    }),
});
