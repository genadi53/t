import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { games } from "@/server/db/schema";

export const gameRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ difficulty: z.enum(["easy", "intermediate", "hard"]) }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      const gameId = "";
      await ctx.db.insert(games).values({
        id: gameId,
        ...(userId && { userId }),
      });
      return gameId;
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
