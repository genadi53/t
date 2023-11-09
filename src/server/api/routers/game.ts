import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { answers, games, questions } from "@/server/db/schema";
import { mapDifficulty } from "@/utils/mapDifficulty";
import { v4 as uuidv4 } from "uuid";
import { mockQuestions } from "@/utils/mock";
import { type QuestionDifficulty } from "@/utils/types";
import { eq } from "drizzle-orm";
import { CONSTANTS } from "@/utils/constants";

type a = { text: string; isCorrect: boolean };
const mapToDbAnswers = (answers: a[], questionId: number) => {
  return answers.map((answer) => ({
    answerText: answer.text,
    questionId,
    isCorrect: answer.isCorrect,
  }));
};

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

  generateNextQuestion: publicProcedure
    .input(
      z.object({
        gameId: z.string(),
        previousNumber: z.number().nonnegative(),
        category: z.string().nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const question = mockQuestions[input.previousNumber + 1];

        if (!question) {
          throw new Error("Invalid question");
        }
        await ctx.db.transaction(async (tx) => {
          const [{ insertId }, _FieldPacketArray] = await tx
            .insert(questions)
            .values({
              gameId: input.gameId,
              questionText: question.question,
              difficulty: question.difficulty as QuestionDifficulty,
              explanation: question.explanation,
              number: question.number,
            });

          const questionAnswers = mapToDbAnswers(question.answers, insertId);
          await tx.insert(answers).values(questionAnswers);
        });

        return question;
      } catch (error) {
        console.error(error);
        return null;
      }
    }),

  endTheGame: publicProcedure
    .input(
      z.object({
        gameId: z.string(),
        score: z.number().nonnegative(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const game = await ctx.db.query.games.findFirst({
          where: (games, { eq }) => eq(games.id, input.gameId),
        });

        if (!game) {
          throw new Error("No such game!");
        }

        const isGameWon = game.totalQuestions === input.score ? true : false;
        await ctx.db
          .update(games)
          .set({ isGameOver: true, score: input.score, isGameWon })
          .where(eq(games.id, input.gameId));

        return {
          ...game,
          score: input.score,
          isGameOver: false,
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    }),
});
