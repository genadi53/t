"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { type GameDifficulty } from "@/utils/types";
import { useGameStore } from "@/store/store";

export default function Home() {
  const difficulties: GameDifficulty[] = ["easy", "intermediate", "hard"];
  const router = useRouter();
  const state = useGameStore();

  const createGame = api.game.create.useMutation();
  const createNextQuestion = api.game.generateNextQuestion.useMutation();

  return (
    <main className="">
      <section className="p-8">
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:justify-evenly">
          {difficulties.map((difficultyStr) => {
            return (
              <Button
                className="w-1/4 uppercase"
                onClick={async () => {
                  const id = await createGame.mutateAsync({
                    difficulty: difficultyStr,
                  });
                  if (id) {
                    router.push(`/game/${id}`);
                    state.createNewGame(id, difficultyStr);
                    const question = await createNextQuestion.mutateAsync({
                      gameId: id,
                      previousNumber: 0,
                    });
                    console.log(question);
                    state.changeQuestion(question);
                  }
                  console.log(id);
                }}
                key={`${difficultyStr}-btn`}
              >
                {difficultyStr}
              </Button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
