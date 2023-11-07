"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { type GameDifficulty } from "@/utils/types";

export const Rules: React.FC = () => {
  const difficulties: GameDifficulty[] = ["easy", "intermediate", "hard"];
  const router = useRouter();

  const createGame = api.game.create.useMutation({
    onSuccess: (id) => {
      console.log("======");
      console.log(id);
      if (id) {
        router.push(`/game/${id}`);
      }
    },
  });

  return (
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
  );
};
